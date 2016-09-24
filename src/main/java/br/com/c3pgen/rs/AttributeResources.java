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

import br.com.c3pgen.json.JsonAttribute;
import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.filter.FilterAttribute;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.security.SpringSecurityUserContext;
import br.com.c3pgen.service.AttributeService;
import br.com.c3pgen.utils.Parser;

/**
 * generated: 03/09/2015 14:51:48
 **/

@Path("/crud/attributes")
public class AttributeResources {

	@Inject
	AttributeService attributeService;

	@Inject
	private SpringSecurityUserContext context;

	public static final Logger LOGGER = Logger.getLogger(AttributeResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterAttribute> paginationParams = new PaginationParams<FilterAttribute>(uriInfo, FilterAttribute.class);

			List<JsonAttribute> jsonAttributes = Parser.toListJsonAttributes(attributeService.filter(paginationParams));
			response = Response.ok(jsonAttributes).build();
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
			List<JsonAttribute> jsonAttributes = Parser.toListJsonAttributes(attributeService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonAttributes).build();
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
		Pager<Attribute> attributes = null;

		try {
			PaginationParams<FilterAttribute> paginationParams = new PaginationParams<FilterAttribute>(uriInfo, FilterAttribute.class);
			attributes = attributeService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonAttribute> paginator = new JsonPaginator<JsonAttribute>(Parser.toListJsonAttributes(attributes.getItens()), attributes.getActualPage(), attributes.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar attributes para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Attribute attribute = attributeService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(attribute)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonAttribute jsonAttribute) {
		try {

			Attribute attribute = Parser.toEntity(jsonAttribute);
			attribute.setOwner(context.getCurrentUser().getOwner());
			attribute = attributeService.save(attribute);
			return Response.ok().entity(Parser.toJson(attribute)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonAttribute.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonAttribute, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  attribute [ %s ] parametros [ %s ]", e.getMessage(), jsonAttribute.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonAttribute)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonAttribute jsonAttribute) {
		try {
			Attribute attribute = attributeService.get(id);
			Parser.apply(attribute, jsonAttribute);

			attribute.setOwner(context.getCurrentUser().getOwner());
			attribute = attributeService.save(attribute);
			return Response.ok().entity(Parser.toJson(attribute)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonAttribute.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonAttribute, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonAttribute.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonAttribute)).build();
		}
	}

	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete() {
		try {
			return Response.ok(Boolean.TRUE).build();
		} catch (ValidationException e) {
			return Response.serverError().entity(new JsonError("Erro removendo lixo", null)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(attributeService.delete(id)).build();
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
