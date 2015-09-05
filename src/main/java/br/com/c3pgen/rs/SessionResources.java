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
import br.com.c3pgen.json.JsonSession;
import br.com.c3pgen.model.Session;
import br.com.c3pgen.model.filter.FilterSession;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.service.SessionService;
import br.com.c3pgen.utils.Parser;
/**
*  generated: 03/09/2015 14:51:49
**/

@Path("/crud/sessions")
public class SessionResources {

	@Inject
	SessionService sessionService;
	
	
	public static final Logger LOGGER = Logger.getLogger(SessionResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterSession> paginationParams = new PaginationParams<FilterSession>(uriInfo, FilterSession.class);

			List<JsonSession> jsonSessions = Parser.toListJsonSessions(sessionService.filter(paginationParams));
			response = Response.ok(jsonSessions).build();
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
			List<JsonSession> jsonSessions = Parser.toListJsonSessions(sessionService.all());
			response = Response.ok(jsonSessions).build();
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
		Pager<Session> sessions = null;

		try {
			PaginationParams<FilterSession> paginationParams = new PaginationParams<FilterSession>(uriInfo, FilterSession.class);
			sessions = sessionService.all(paginationParams);
			JsonPaginator<JsonSession> paginator = new JsonPaginator<JsonSession>(Parser.toListJsonSessions(sessions.getItens()), sessions.getActualPage(), sessions.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar sessions para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Session session = sessionService.get(id);

			return Response.ok().entity(Parser.toJson(session)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonSession jsonSession) {
		try {

			Session session = Parser.toEntity(jsonSession);
			session = sessionService.save(session);
			return Response.ok().entity(Parser.toJson(session)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonSession.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonSession, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  session [ %s ] parametros [ %s ]", e.getMessage(), jsonSession.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonSession)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonSession jsonSession) {
		try {
			Session session = sessionService.get(id);
			Parser.apply(session, jsonSession);

			session = sessionService.save(session);
			return Response.ok().entity(Parser.toJson(session)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonSession.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonSession, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonSession.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonSession)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(sessionService.delete(id)).build();
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
