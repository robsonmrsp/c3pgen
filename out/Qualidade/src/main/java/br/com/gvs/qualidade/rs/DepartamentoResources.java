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
import br.com.gvs.qualidade.json.JsonDepartamento;

import br.com.gvs.qualidade.model.Departamento;

import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.service.DepartamentoService;
import br.com.gvs.qualidade.model.filter.FilterDepartamento;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.qualidade.service.UserService;
import br.com.gvs.core.utils.Parser;
import br.com.gvs.core.rs.exception.ValidationException;
import br.com.gvs.core.security.SpringSecurityUserContext;
/**
*  generated: 02/09/2016 16:23:48
**/

@Path("/crud/departamentos")
public class DepartamentoResources {

	@Inject
	DepartamentoService departamentoService;
	
	@Inject
	private SpringSecurityUserContext context;
	
	public static final Logger LOGGER = Logger.getLogger(DepartamentoResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterDepartamento> paginationParams = new PaginationParams<FilterDepartamento>(uriInfo, FilterDepartamento.class);

			List<JsonDepartamento> jsonDepartamentos = Parser.toListJsonDepartamentos(departamentoService.filter(paginationParams));
			response = Response.ok(jsonDepartamentos).build();
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
			List<JsonDepartamento> jsonDepartamentos = Parser.toListJsonDepartamentos(departamentoService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonDepartamentos).build();
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
		Pager<Departamento> departamentos = null;

		try {
			PaginationParams<FilterDepartamento> paginationParams = new PaginationParams<FilterDepartamento>(uriInfo, FilterDepartamento.class);
			departamentos = departamentoService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonDepartamento> paginator = new JsonPaginator<JsonDepartamento>(Parser.toListJsonDepartamentos(departamentos.getItens()), departamentos.getActualPage(), departamentos.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar departamentos para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Departamento departamento = departamentoService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(departamento)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonDepartamento jsonDepartamento) {
		try {

			Departamento departamento = Parser.toEntity(jsonDepartamento);
			departamento.setOwner(context.getCurrentUser().getOwner());
			departamento = departamentoService.save(departamento);
			return Response.ok().entity(Parser.toJson(departamento)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonDepartamento.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonDepartamento, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  departamento [ %s ] parametros [ %s ]", e.getMessage(), jsonDepartamento.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonDepartamento)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonDepartamento jsonDepartamento) {
		try {
			Departamento departamento = Parser.toEntity(jsonDepartamento);

			departamento.setOwner(context.getCurrentUser().getOwner());
			departamento = departamentoService.save(departamento);
			return Response.ok().entity(Parser.toJson(departamento)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonDepartamento.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonDepartamento, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonDepartamento.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonDepartamento)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(departamentoService.delete(id)).build();
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
