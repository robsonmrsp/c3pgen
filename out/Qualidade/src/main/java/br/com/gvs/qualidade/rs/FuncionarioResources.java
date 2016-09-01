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
import br.com.gvs.qualidade.json.JsonFuncionario;

import br.com.gvs.qualidade.model.Funcionario;

import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.service.FuncionarioService;
import br.com.gvs.qualidade.model.filter.FilterFuncionario;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.qualidade.service.UserService;
import br.com.gvs.core.utils.Parser;
import br.com.gvs.core.rs.exception.ValidationException;
import br.com.gvs.core.security.SpringSecurityUserContext;
/**
*  generated: 01/09/2016 17:25:05
**/

@Path("/crud/funcionarios")
public class FuncionarioResources {

	@Inject
	FuncionarioService funcionarioService;
	
	@Inject
	private SpringSecurityUserContext context;
	
	public static final Logger LOGGER = Logger.getLogger(FuncionarioResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterFuncionario> paginationParams = new PaginationParams<FilterFuncionario>(uriInfo, FilterFuncionario.class);

			List<JsonFuncionario> jsonFuncionarios = Parser.toListJsonFuncionarios(funcionarioService.filter(paginationParams));
			response = Response.ok(jsonFuncionarios).build();
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
			List<JsonFuncionario> jsonFuncionarios = Parser.toListJsonFuncionarios(funcionarioService.all(context.getCurrentUser().getOwner()));
			response = Response.ok(jsonFuncionarios).build();
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
		Pager<Funcionario> funcionarios = null;

		try {
			PaginationParams<FilterFuncionario> paginationParams = new PaginationParams<FilterFuncionario>(uriInfo, FilterFuncionario.class);
			funcionarios = funcionarioService.all(paginationParams, context.getCurrentUser().getOwner());
			JsonPaginator<JsonFuncionario> paginator = new JsonPaginator<JsonFuncionario>(Parser.toListJsonFuncionarios(funcionarios.getItens()), funcionarios.getActualPage(), funcionarios.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar funcionarios para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Funcionario funcionario = funcionarioService.get(id, context.getCurrentUser().getOwner());

			return Response.ok().entity(Parser.toJson(funcionario)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonFuncionario jsonFuncionario) {
		try {

			Funcionario funcionario = Parser.toEntity(jsonFuncionario);
			funcionario.setOwner(context.getCurrentUser().getOwner());
			funcionario = funcionarioService.save(funcionario);
			return Response.ok().entity(Parser.toJson(funcionario)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonFuncionario.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonFuncionario, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  funcionario [ %s ] parametros [ %s ]", e.getMessage(), jsonFuncionario.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonFuncionario)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonFuncionario jsonFuncionario) {
		try {
			Funcionario funcionario = Parser.toEntity(jsonFuncionario);

			funcionario.setOwner(context.getCurrentUser().getOwner());
			funcionario = funcionarioService.save(funcionario);
			return Response.ok().entity(Parser.toJson(funcionario)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonFuncionario.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, jsonFuncionario, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonFuncionario.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, jsonFuncionario)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(funcionarioService.delete(id)).build();
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
