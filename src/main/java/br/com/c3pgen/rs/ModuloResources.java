package br.com.c3pgen.rs;

import java.util.List;

import javax.inject.Inject;
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

import br.com.c3pgen.base.ValidationException;
import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.json.JsonModulo;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.model.Modulo;
import br.com.c3pgen.model.filter.FilterModulo;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.security.SpringSecurityUserContext;
import br.com.c3pgen.service.ModuloService;
import br.com.c3pgen.utils.Parser;
/**
*  generated: 05/08/2016 15:23:44
**/

@Path("/crud/modulos")
public class ModuloResources {

	@Inject
	ModuloService moduloService;
	
	@Inject
	private SpringSecurityUserContext context;
	
	public static final Logger LOGGER = Logger.getLogger(ModuloResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterModulo> paginationParams = new PaginationParams<FilterModulo>(uriInfo, FilterModulo.class);

			List<JsonModulo> jsonModulos = Parser.toListJsonModulos(moduloService.filter(paginationParams));
			response = Response.ok(jsonModulos).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e,message, null)).build();
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
			List<JsonModulo> jsonModulos = Parser.toListJsonModulos(moduloService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonModulos).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e, message, null)).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response all(@Context UriInfo uriInfo) {
		Response response = null;
		Pager<Modulo> modulos = null;

		try {
			PaginationParams<FilterModulo> paginationParams = new PaginationParams<FilterModulo>(uriInfo, FilterModulo.class);
			modulos = moduloService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonModulo> paginator = new JsonPaginator<JsonModulo>(Parser.toListJsonModulos(modulos.getItens()), modulos.getActualPage(), modulos.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar modulos para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e, message, uriInfo.getQueryParameters().toString())).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response get(@PathParam("id") Integer id) {
		try {

			Modulo modulo = moduloService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(modulo)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonModulo jsonModulo) {
		try {

			Modulo modulo = Parser.toEntity(jsonModulo);
			modulo.setOwner(context.getCurrentUser().getOwner());
			modulo = moduloService.save(modulo);
			return Response.ok().entity(Parser.toJson(modulo)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonModulo.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonModulo, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  modulo [ %s ] parametros [ %s ]", e.getMessage(), jsonModulo.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonModulo)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonModulo jsonModulo) {
		try {
			Modulo modulo = Parser.toEntity(jsonModulo);

			modulo.setOwner(context.getCurrentUser().getOwner());
			modulo = moduloService.save(modulo);
			return Response.ok().entity(Parser.toJson(modulo)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonModulo.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonModulo, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonModulo.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonModulo)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(moduloService.delete(id)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), id);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}
}
