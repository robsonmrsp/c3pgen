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
import br.com.gvs.qualidade.json.JsonApontamentoQualidadePacking;

import br.com.gvs.qualidade.model.ApontamentoQualidadePacking;

import br.com.gvs.qualidade.service.ApontamentoQualidadePackingService;
import br.com.gvs.qualidade.model.filter.FilterApontamentoQualidadePacking;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.qualidade.service.UserService;
import br.com.gvs.core.utils.Parser;
import br.com.gvs.core.rs.exception.ValidationException;
import br.com.gvs.core.security.SpringSecurityUserContext;
/**
*  generated: 03/09/2016 22:18:30
**/

@Path("/crud/apontamentoQualidadePackings")
public class ApontamentoQualidadePackingResources {

	@Inject
	ApontamentoQualidadePackingService apontamentoQualidadePackingService;
	
	
	public static final Logger LOGGER = Logger.getLogger(ApontamentoQualidadePackingResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterApontamentoQualidadePacking> paginationParams = new PaginationParams<FilterApontamentoQualidadePacking>(uriInfo, FilterApontamentoQualidadePacking.class);

			List<JsonApontamentoQualidadePacking> jsonApontamentoQualidadePackings = Parser.toListJsonApontamentoQualidadePackings(apontamentoQualidadePackingService.filter(paginationParams));
			response = Response.ok(jsonApontamentoQualidadePackings).build();
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
			List<JsonApontamentoQualidadePacking> jsonApontamentoQualidadePackings = Parser.toListJsonApontamentoQualidadePackings(apontamentoQualidadePackingService.all());
			response = Response.ok(jsonApontamentoQualidadePackings).build();
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
		Pager<ApontamentoQualidadePacking> apontamentoQualidadePackings = null;

		try {
			PaginationParams<FilterApontamentoQualidadePacking> paginationParams = new PaginationParams<FilterApontamentoQualidadePacking>(uriInfo, FilterApontamentoQualidadePacking.class);
			apontamentoQualidadePackings = apontamentoQualidadePackingService.all(paginationParams);
			JsonPaginator<JsonApontamentoQualidadePacking> paginator = new JsonPaginator<JsonApontamentoQualidadePacking>(Parser.toListJsonApontamentoQualidadePackings(apontamentoQualidadePackings.getItens()), apontamentoQualidadePackings.getActualPage(), apontamentoQualidadePackings.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar apontamentoQualidadePackings para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			ApontamentoQualidadePacking apontamentoQualidadePacking = apontamentoQualidadePackingService.get(id);

			return Response.ok().entity(Parser.toJson(apontamentoQualidadePacking)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking) {
		try {

			ApontamentoQualidadePacking apontamentoQualidadePacking = Parser.toEntity(jsonApontamentoQualidadePacking);
			apontamentoQualidadePacking = apontamentoQualidadePackingService.save(apontamentoQualidadePacking);
			return Response.ok().entity(Parser.toJson(apontamentoQualidadePacking)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonApontamentoQualidadePacking.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonApontamentoQualidadePacking, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  apontamentoQualidadePacking [ %s ] parametros [ %s ]", e.getMessage(), jsonApontamentoQualidadePacking.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonApontamentoQualidadePacking)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking) {
		try {
			ApontamentoQualidadePacking apontamentoQualidadePacking = Parser.toEntity(jsonApontamentoQualidadePacking);

			apontamentoQualidadePacking = apontamentoQualidadePackingService.save(apontamentoQualidadePacking);
			return Response.ok().entity(Parser.toJson(apontamentoQualidadePacking)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonApontamentoQualidadePacking.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonApontamentoQualidadePacking, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonApontamentoQualidadePacking.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonApontamentoQualidadePacking)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(apontamentoQualidadePackingService.delete(id)).build();
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
