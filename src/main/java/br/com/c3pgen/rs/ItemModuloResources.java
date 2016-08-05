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
import br.com.c3pgen.json.JsonItemModulo;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.model.ItemModulo;
import br.com.c3pgen.model.filter.FilterItemModulo;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.security.SpringSecurityUserContext;
import br.com.c3pgen.service.ItemModuloService;
import br.com.c3pgen.utils.Parser;
/**
*  generated: 05/08/2016 15:23:43
**/

@Path("/crud/itemModulos")
public class ItemModuloResources {

	@Inject
	ItemModuloService itemModuloService;
	
	@Inject
	private SpringSecurityUserContext context;
	
	public static final Logger LOGGER = Logger.getLogger(ItemModuloResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterItemModulo> paginationParams = new PaginationParams<FilterItemModulo>(uriInfo, FilterItemModulo.class);

			List<JsonItemModulo> jsonItemModulos = Parser.toListJsonItemModulos(itemModuloService.filter(paginationParams));
			response = Response.ok(jsonItemModulos).build();
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
			List<JsonItemModulo> jsonItemModulos = Parser.toListJsonItemModulos(itemModuloService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonItemModulos).build();
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
		Pager<ItemModulo> itemModulos = null;

		try {
			PaginationParams<FilterItemModulo> paginationParams = new PaginationParams<FilterItemModulo>(uriInfo, FilterItemModulo.class);
			itemModulos = itemModuloService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonItemModulo> paginator = new JsonPaginator<JsonItemModulo>(Parser.toListJsonItemModulos(itemModulos.getItens()), itemModulos.getActualPage(), itemModulos.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar itemModulos para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			ItemModulo itemModulo = itemModuloService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(itemModulo)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonItemModulo jsonItemModulo) {
		try {

			ItemModulo itemModulo = Parser.toEntity(jsonItemModulo);
			itemModulo.setOwner(context.getCurrentUser().getOwner());
			itemModulo = itemModuloService.save(itemModulo);
			return Response.ok().entity(Parser.toJson(itemModulo)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonItemModulo.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonItemModulo, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  itemModulo [ %s ] parametros [ %s ]", e.getMessage(), jsonItemModulo.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonItemModulo)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonItemModulo jsonItemModulo) {
		try {
			ItemModulo itemModulo = Parser.toEntity(jsonItemModulo);

			itemModulo.setOwner(context.getCurrentUser().getOwner());
			itemModulo = itemModuloService.save(itemModulo);
			return Response.ok().entity(Parser.toJson(itemModulo)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonItemModulo.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonItemModulo, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonItemModulo.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonItemModulo)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(itemModuloService.delete(id)).build();
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
