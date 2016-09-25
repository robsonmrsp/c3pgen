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
import br.com.gvs.qualidade.json.JsonVariedade;

import br.com.gvs.qualidade.model.Variedade;

import br.com.gvs.qualidade.service.VariedadeService;
import br.com.gvs.qualidade.model.filter.FilterVariedade;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.qualidade.service.UserService;
import br.com.gvs.core.utils.Parser;
import br.com.gvs.core.rs.exception.ValidationException;
import br.com.gvs.core.security.SpringSecurityUserContext;
/**
*  generated: 24/09/2016 12:52:15
**/

@Path("/crud/variedades")
public class VariedadeResources {

	@Inject
	VariedadeService variedadeService;
	
	
	public static final Logger LOGGER = Logger.getLogger(VariedadeResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterVariedade> paginationParams = new PaginationParams<FilterVariedade>(uriInfo, FilterVariedade.class);

			List<JsonVariedade> jsonVariedades = Parser.toListJsonVariedades(variedadeService.filter(paginationParams));
			response = Response.ok(jsonVariedades).build();
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
			List<JsonVariedade> jsonVariedades = Parser.toListJsonVariedades(variedadeService.all());
			response = Response.ok(jsonVariedades).build();
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
		Pager<Variedade> variedades = null;

		try {
			PaginationParams<FilterVariedade> paginationParams = new PaginationParams<FilterVariedade>(uriInfo, FilterVariedade.class);
			variedades = variedadeService.all(paginationParams);
			JsonPaginator<JsonVariedade> paginator = new JsonPaginator<JsonVariedade>(Parser.toListJsonVariedades(variedades.getItens()), variedades.getActualPage(), variedades.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar variedades para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Variedade variedade = variedadeService.get(id);

			return Response.ok().entity(Parser.toJson(variedade)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonVariedade jsonVariedade) {
		try {

			Variedade variedade = Parser.toEntity(jsonVariedade);
			variedade = variedadeService.save(variedade);
			return Response.ok().entity(Parser.toJson(variedade)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonVariedade.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonVariedade, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  variedade [ %s ] parametros [ %s ]", e.getMessage(), jsonVariedade.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonVariedade)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonVariedade jsonVariedade) {
		try {
			Variedade variedade = Parser.toEntity(jsonVariedade);

			variedade = variedadeService.save(variedade);
			return Response.ok().entity(Parser.toJson(variedade)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonVariedade.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonVariedade, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonVariedade.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonVariedade)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(variedadeService.delete(id)).build();
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
