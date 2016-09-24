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
import br.com.gvs.qualidade.json.JsonPais;

import br.com.gvs.qualidade.model.Pais;

import br.com.gvs.qualidade.service.PaisService;
import br.com.gvs.qualidade.model.filter.FilterPais;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.qualidade.service.UserService;
import br.com.gvs.core.utils.Parser;
import br.com.gvs.core.rs.exception.ValidationException;
import br.com.gvs.core.security.SpringSecurityUserContext;
/**
*  generated: 24/09/2016 11:56:37
**/

@Path("/crud/paiss")
public class PaisResources {

	@Inject
	PaisService paisService;
	
	
	public static final Logger LOGGER = Logger.getLogger(PaisResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterPais> paginationParams = new PaginationParams<FilterPais>(uriInfo, FilterPais.class);

			List<JsonPais> jsonPaiss = Parser.toListJsonPaiss(paisService.filter(paginationParams));
			response = Response.ok(jsonPaiss).build();
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
			List<JsonPais> jsonPaiss = Parser.toListJsonPaiss(paisService.all());
			response = Response.ok(jsonPaiss).build();
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
		Pager<Pais> paiss = null;

		try {
			PaginationParams<FilterPais> paginationParams = new PaginationParams<FilterPais>(uriInfo, FilterPais.class);
			paiss = paisService.all(paginationParams);
			JsonPaginator<JsonPais> paginator = new JsonPaginator<JsonPais>(Parser.toListJsonPaiss(paiss.getItens()), paiss.getActualPage(), paiss.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar paiss para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Pais pais = paisService.get(id);

			return Response.ok().entity(Parser.toJson(pais)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonPais jsonPais) {
		try {

			Pais pais = Parser.toEntity(jsonPais);
			pais = paisService.save(pais);
			return Response.ok().entity(Parser.toJson(pais)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonPais.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonPais, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  pais [ %s ] parametros [ %s ]", e.getMessage(), jsonPais.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonPais)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonPais jsonPais) {
		try {
			Pais pais = Parser.toEntity(jsonPais);

			pais = paisService.save(pais);
			return Response.ok().entity(Parser.toJson(pais)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonPais.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonPais, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonPais.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonPais)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(paisService.delete(id)).build();
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
