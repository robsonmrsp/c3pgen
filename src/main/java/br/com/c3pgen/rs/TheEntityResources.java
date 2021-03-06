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
import br.com.c3pgen.json.JsonTheEntity;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.filter.FilterTheEntity;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.security.SpringSecurityUserContext;
import br.com.c3pgen.service.TheEntityService;
import br.com.c3pgen.utils.Parser;

/**
 * generated: 03/09/2015 14:51:48
 **/

@Path("/crud/entitys")
public class TheEntityResources {

	@Inject
	TheEntityService theEntityService;

	@Inject
	private SpringSecurityUserContext context;

	public static final Logger LOGGER = Logger.getLogger(TheEntityResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterTheEntity> paginationParams = new PaginationParams<FilterTheEntity>(uriInfo, FilterTheEntity.class);

			List<JsonTheEntity> jsonTheEntitys = Parser.toListJsonTheEntitys(theEntityService.filter(paginationParams));
			response = Response.ok(jsonTheEntitys).build();
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
			List<JsonTheEntity> jsonTheEntitys = Parser.toListJsonTheEntitys(theEntityService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonTheEntitys).build();
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
		Pager<ApplicationEntity> theEntitys = null;

		try {
			PaginationParams<FilterTheEntity> paginationParams = new PaginationParams<FilterTheEntity>(uriInfo, FilterTheEntity.class);
			theEntitys = theEntityService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonTheEntity> paginator = new JsonPaginator<JsonTheEntity>(Parser.toListJsonTheEntitys(theEntitys.getItens()), theEntitys.getActualPage(), theEntitys.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar theEntitys para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			ApplicationEntity theEntity = theEntityService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(theEntity)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonTheEntity jsonTheEntity) {
		try {

			ApplicationEntity theEntity = Parser.toEntity(jsonTheEntity);
			theEntity.setOwner(context.getCurrentUser().getOwner());
			theEntity = theEntityService.save(theEntity);
			return Response.ok().entity(Parser.toJson(theEntity)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonTheEntity.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonTheEntity, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  theEntity [ %s ] parametros [ %s ]", e.getMessage(), jsonTheEntity.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonTheEntity)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonTheEntity jsonTheEntity) {
		try {
			ApplicationEntity theEntity = theEntityService.get(id);
			Parser.apply(theEntity, jsonTheEntity);

			theEntity.setOwner(context.getCurrentUser().getOwner());
			theEntity = theEntityService.save(theEntity);
			return Response.ok().entity(Parser.toJson(theEntity)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonTheEntity.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonTheEntity, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonTheEntity.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonTheEntity)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(theEntityService.delete(id)).build();
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
