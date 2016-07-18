package br.com.c3pgen.rs;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;

import br.com.c3pgen.base.ApplicationValidatorMessages;
import br.com.c3pgen.base.GenService;
import br.com.c3pgen.base.GenerateFileInfo;
import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.json.JsonApplication;
import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.json.JsonOk;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.filter.FilterApplication;
import br.com.c3pgen.model.filter.FilterExtrationTools;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.security.SpringSecurityUserContext;
import br.com.c3pgen.service.ApplicationService;
import br.com.c3pgen.utils.Parser;

/**
 * generated: 03/09/2015 14:51:47
 **/

@Path("/crud/applications")
public class ApplicationResources {

	@Inject
	ApplicationService applicationService;

	@Inject
	private SpringSecurityUserContext context;

	private GenService genService = new GenService();

	public static final Logger LOGGER = Logger.getLogger(ApplicationResources.class);

	@GET
	@Path("extraction/extract")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response generate(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterExtrationTools> paginationParams = new PaginationParams<FilterExtrationTools>(uriInfo, FilterExtrationTools.class);
			FilterExtrationTools filter = paginationParams.getFilter();
			Application generateAppFromDataBase = applicationService.generateAppFromDataBase(filter.getUrl(), filter.getUsername(), filter.getPassword(), filter.getDatabaseType(), filter.getSupressPrefix(), filter.getTableRegex(), filter.getColumnRegex());

			JsonApplication jsonApplication = Parser.toJson(generateAppFromDataBase);
			response = Response.ok(jsonApplication).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, null)).build();
		}
		return response;
	}

	@GET
	@Path("extraction/ping")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response ping(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterExtrationTools> paginationParams = new PaginationParams<FilterExtrationTools>(uriInfo, FilterExtrationTools.class);

			FilterExtrationTools filter = paginationParams.getFilter();
			Boolean ping = applicationService.ping(filter.getUrl(), filter.getUsername(), filter.getPassword(), filter.getDatabaseType());

			response = Response.ok(new JsonOk(ping)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e, "Problemas ao efetuar o ping!")).build();
		}
		return response;
	}

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterApplication> paginationParams = new PaginationParams<FilterApplication>(uriInfo, FilterApplication.class);

			List<JsonApplication> jsonApplications = Parser.toListJsonApplications(applicationService.filter(paginationParams));
			response = Response.ok(jsonApplications).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, null)).build();
		}
		return response;
	}

	@GET
	@Path("generator/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response gera(@PathParam("id") Integer id, @Context HttpServletRequest httpServletRequest) {
		Response response = null;
		try {
			String uploadFolder = httpServletRequest.getServletContext().getRealPath("/");
			Util.setCurrentDir(uploadFolder);

			Application application = applicationService.get(id);

			GenerateFileInfo pathFile = genService.generate(application);

			if (pathFile.getGenerateSuccess()) {
				response = Response.ok(new JsonOk(pathFile.getStaticFilePath())).build();
			} else {
				response = Response.serverError().entity(new JsonError(pathFile.getApplicationValidatorMessages().toString(), null, pathFile.getApplicationValidatorMessages().toString())).build();
			}
		} catch (Exception e) {
			String message = String.format("Não foi possivel gerar a aplicação [%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, null)).build();
		}
		return response;
	}

	@GET
	@Path("validator/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response valida(@PathParam("id") Integer id, @Context HttpServletRequest httpServletRequest) {
		Response response = null;
		try {
			String uploadFolder = httpServletRequest.getServletContext().getRealPath("/");
			Util.setCurrentDir(uploadFolder);

			Application application = applicationService.get(id);

			ApplicationValidatorMessages validate = genService.Validate(application);

			if (validate.isEmpty()) {
				response = Response.ok(new JsonOk("Aplicação Ok")).build();
			} else {
				response = Response.serverError().entity(new JsonError(validate.toString(), null, validate.toString())).build();
			}
		} catch (Exception e) {
			String message = String.format("Não foi possivel gerar a aplicação [%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, null)).build();
		}
		return response;
	}

	@GET
	@Path("all")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response all() {
		Response response = null;
		try {
			List<JsonApplication> jsonApplications = Parser.toListJsonApplications(applicationService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonApplications).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, null)).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response all(@Context UriInfo uriInfo) {
		Response response = null;
		Pager<Application> applications = null;

		try {
			PaginationParams<FilterApplication> paginationParams = new PaginationParams<FilterApplication>(uriInfo, FilterApplication.class);
			applications = applicationService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonApplication> paginator = new JsonPaginator<JsonApplication>(Parser.toListJsonApplications(applications.getItens()), applications.getActualPage(), applications.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar applications para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, uriInfo.getQueryParameters().toString())).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response get(@PathParam("id") Integer id) {
		try {

			Application application = applicationService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(application)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonApplication jsonApplication) {
		try {

			Application application = Parser.toEntity(jsonApplication);
			application.setOwner(context.getCurrentUser().getOwner());
			application = applicationService.save(application);
			return Response.ok().entity(Parser.toJson(application)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonApplication.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonApplication, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  application [ %s ] parametros [ %s ]", e.getMessage(), jsonApplication.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonApplication)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonApplication jsonApplication) {
		try {
			Application application = Parser.toEntity(jsonApplication);

			application.setOwner(context.getCurrentUser().getOwner());

			application = applicationService.save(application);

			return Response.ok().entity(Parser.toJson(application)).build();

		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonApplication.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonApplication, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonApplication.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonApplication)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(applicationService.delete(id)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), id);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, id, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}
}
// Ao criar um relacionamento, será criado um model que guarda tudo aquilo necessário para construir um relacionamento.
//
// origem, destino, informacoes da origem e informacoes do destino
//
//
// usar o evento change/ refazer essa parte para evitar chamadas de redesenho. diminuir o acoplamento e
// deixar o observer fazer seu papel
//
// O nosso model só será instanciado uma vez .

