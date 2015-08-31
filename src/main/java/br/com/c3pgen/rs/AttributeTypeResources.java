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
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;

import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.json.JsonAttributeType;

import br.com.c3pgen.model.AttributeType;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.filter.FilterAttributeType;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.service.AttributeTypeService;
import br.com.c3pgen.service.UserService;
import br.com.c3pgen.utils.Parser;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.security.SpringSecurityUserContext;
/**
*  generated: 30/08/2015 20:23:12
**/

@Path("/crud/attributeTypes")
public class AttributeTypeResources {

	@Inject
	AttributeTypeService attributeTypeService;
	
	@Inject
	private SpringSecurityUserContext context;
	
	public static final Logger LOGGER = Logger.getLogger(AttributeTypeResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterAttributeType> paginationParams = new PaginationParams<FilterAttributeType>(uriInfo, FilterAttributeType.class);

			List<JsonAttributeType> jsonAttributeTypes = Parser.toListJsonAttributeTypes(attributeTypeService.filter(paginationParams));
			response = Response.ok(jsonAttributeTypes).build();
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
			List<JsonAttributeType> jsonAttributeTypes = Parser.toListJsonAttributeTypes(attributeTypeService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonAttributeTypes).build();
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
		Pager<AttributeType> attributeTypes = null;

		try {
			PaginationParams<FilterAttributeType> paginationParams = new PaginationParams<FilterAttributeType>(uriInfo, FilterAttributeType.class);
			attributeTypes = attributeTypeService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonAttributeType> paginator = new JsonPaginator<JsonAttributeType>(Parser.toListJsonAttributeTypes(attributeTypes.getItens()), attributeTypes.getActualPage(), attributeTypes.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar attributeTypes para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			AttributeType attributeType = attributeTypeService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(attributeType)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonAttributeType jsonAttributeType) {
		try {

			AttributeType attributeType = Parser.toEntity(jsonAttributeType);
			attributeType.setOwner(context.getCurrentUser().getOwner());
			attributeType = attributeTypeService.save(attributeType);
			return Response.ok().entity(Parser.toJson(attributeType)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonAttributeType.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonAttributeType, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  attributeType [ %s ] parametros [ %s ]", e.getMessage(), jsonAttributeType.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonAttributeType)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonAttributeType jsonAttributeType) {
		try {
			AttributeType attributeType = attributeTypeService.get(id);
			Parser.apply(attributeType, jsonAttributeType);

			attributeType.setOwner(context.getCurrentUser().getOwner());
			attributeType = attributeTypeService.save(attributeType);
			return Response.ok().entity(Parser.toJson(attributeType)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonAttributeType.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonAttributeType, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonAttributeType.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonAttributeType)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(attributeTypeService.delete(id)).build();
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
