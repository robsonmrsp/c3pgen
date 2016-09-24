package br.com.gvs.qualidade.rs;

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

import br.com.gvs.core.json.JsonError;
import br.com.gvs.core.json.JsonPaginator;
import br.com.gvs.qualidade.json.JsonPacking;

import br.com.gvs.qualidade.model.Packing;

import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.service.PackingService;
import br.com.gvs.qualidade.model.filter.FilterPacking;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.qualidade.service.UserService;
import br.com.gvs.core.utils.Parser;
import br.com.gvs.core.rs.exception.ValidationException;
import br.com.gvs.core.security.SpringSecurityUserContext;
/**
*  generated: 24/09/2016 11:56:35
**/

@Path("/crud/packings")
public class PackingResources {

	@Inject
	PackingService packingService;
	
	@Inject
	private SpringSecurityUserContext context;
	
	public static final Logger LOGGER = Logger.getLogger(PackingResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterPacking> paginationParams = new PaginationParams<FilterPacking>(uriInfo, FilterPacking.class);

			List<JsonPacking> jsonPackings = Parser.toListJsonPackings(packingService.filter(paginationParams));
			response = Response.ok(jsonPackings).build();
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
			List<JsonPacking> jsonPackings = Parser.toListJsonPackings(packingService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonPackings).build();
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
		Pager<Packing> packings = null;

		try {
			PaginationParams<FilterPacking> paginationParams = new PaginationParams<FilterPacking>(uriInfo, FilterPacking.class);
			packings = packingService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonPacking> paginator = new JsonPaginator<JsonPacking>(Parser.toListJsonPackings(packings.getItens()), packings.getActualPage(), packings.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar packings para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Packing packing = packingService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(packing)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonPacking jsonPacking) {
		try {

			Packing packing = Parser.toEntity(jsonPacking);
			packing.setOwner(context.getCurrentUser().getOwner());
			packing = packingService.save(packing);
			return Response.ok().entity(Parser.toJson(packing)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonPacking.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonPacking, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  packing [ %s ] parametros [ %s ]", e.getMessage(), jsonPacking.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonPacking)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonPacking jsonPacking) {
		try {
			Packing packing = Parser.toEntity(jsonPacking);

			packing.setOwner(context.getCurrentUser().getOwner());
			packing = packingService.save(packing);
			return Response.ok().entity(Parser.toJson(packing)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonPacking.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonPacking, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonPacking.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonPacking)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(packingService.delete(id)).build();
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
