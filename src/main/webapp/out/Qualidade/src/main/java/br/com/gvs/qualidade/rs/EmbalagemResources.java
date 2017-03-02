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
import br.com.gvs.qualidade.json.JsonEmbalagem;

import br.com.gvs.qualidade.model.Embalagem;

import br.com.gvs.qualidade.service.EmbalagemService;
import br.com.gvs.qualidade.model.filter.FilterEmbalagem;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.qualidade.service.UserService;
import br.com.gvs.core.utils.Parser;
import br.com.gvs.core.rs.exception.ValidationException;
import br.com.gvs.core.security.SpringSecurityUserContext;
/**
*  generated: 24/09/2016 11:56:34
**/

@Path("/crud/embalagems")
public class EmbalagemResources {

	@Inject
	EmbalagemService embalagemService;
	
	
	public static final Logger LOGGER = Logger.getLogger(EmbalagemResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterEmbalagem> paginationParams = new PaginationParams<FilterEmbalagem>(uriInfo, FilterEmbalagem.class);

			List<JsonEmbalagem> jsonEmbalagems = Parser.toListJsonEmbalagems(embalagemService.filter(paginationParams));
			response = Response.ok(jsonEmbalagems).build();
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
			List<JsonEmbalagem> jsonEmbalagems = Parser.toListJsonEmbalagems(embalagemService.all());
			response = Response.ok(jsonEmbalagems).build();
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
		Pager<Embalagem> embalagems = null;

		try {
			PaginationParams<FilterEmbalagem> paginationParams = new PaginationParams<FilterEmbalagem>(uriInfo, FilterEmbalagem.class);
			embalagems = embalagemService.all(paginationParams);
			JsonPaginator<JsonEmbalagem> paginator = new JsonPaginator<JsonEmbalagem>(Parser.toListJsonEmbalagems(embalagems.getItens()), embalagems.getActualPage(), embalagems.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar embalagems para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Embalagem embalagem = embalagemService.get(id);

			return Response.ok().entity(Parser.toJson(embalagem)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonEmbalagem jsonEmbalagem) {
		try {

			Embalagem embalagem = Parser.toEntity(jsonEmbalagem);
			embalagem = embalagemService.save(embalagem);
			return Response.ok().entity(Parser.toJson(embalagem)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonEmbalagem.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonEmbalagem, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  embalagem [ %s ] parametros [ %s ]", e.getMessage(), jsonEmbalagem.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonEmbalagem)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonEmbalagem jsonEmbalagem) {
		try {
			Embalagem embalagem = Parser.toEntity(jsonEmbalagem);

			embalagem = embalagemService.save(embalagem);
			return Response.ok().entity(Parser.toJson(embalagem)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonEmbalagem.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonEmbalagem, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonEmbalagem.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonEmbalagem)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(embalagemService.delete(id)).build();
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