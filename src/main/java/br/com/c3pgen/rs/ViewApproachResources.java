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

import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.json.JsonViewApproach;
import br.com.c3pgen.model.ViewApproach;
import br.com.c3pgen.model.filter.FilterViewApproach;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.security.SpringSecurityUserContext;
import br.com.c3pgen.service.ViewApproachService;
import br.com.c3pgen.utils.Parser;
/**
*  generated: 03/09/2015 14:51:48
**/

@Path("/crud/viewApproachs")
public class ViewApproachResources {

	@Inject
	ViewApproachService viewApproachService;
	
	@Inject
	private SpringSecurityUserContext context;
	
	public static final Logger LOGGER = Logger.getLogger(ViewApproachResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterViewApproach> paginationParams = new PaginationParams<FilterViewApproach>(uriInfo, FilterViewApproach.class);

			List<JsonViewApproach> jsonViewApproachs = Parser.toListJsonViewApproachs(viewApproachService.filter(paginationParams));
			response = Response.ok(jsonViewApproachs).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
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
			List<JsonViewApproach> jsonViewApproachs = Parser.toListJsonViewApproachs(viewApproachService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonViewApproachs).build();
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
		Pager<ViewApproach> viewApproachs = null;

		try {
			PaginationParams<FilterViewApproach> paginationParams = new PaginationParams<FilterViewApproach>(uriInfo, FilterViewApproach.class);
			viewApproachs = viewApproachService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonViewApproach> paginator = new JsonPaginator<JsonViewApproach>(Parser.toListJsonViewApproachs(viewApproachs.getItens()), viewApproachs.getActualPage(), viewApproachs.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar viewApproachs para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			ViewApproach viewApproach = viewApproachService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(viewApproach)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonViewApproach jsonViewApproach) {
		try {

			ViewApproach viewApproach = Parser.toEntity(jsonViewApproach);
			viewApproach.setOwner(context.getCurrentUser().getOwner());
			viewApproach = viewApproachService.save(viewApproach);
			return Response.ok().entity(Parser.toJson(viewApproach)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonViewApproach.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonViewApproach, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  viewApproach [ %s ] parametros [ %s ]", e.getMessage(), jsonViewApproach.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonViewApproach)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonViewApproach jsonViewApproach) {
		try {
			ViewApproach viewApproach = viewApproachService.get(id);
			Parser.apply(viewApproach, jsonViewApproach);

			viewApproach.setOwner(context.getCurrentUser().getOwner());
			viewApproach = viewApproachService.save(viewApproach);
			return Response.ok().entity(Parser.toJson(viewApproach)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonViewApproach.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonViewApproach, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonViewApproach.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonViewApproach)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(viewApproachService.delete(id)).build();
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
