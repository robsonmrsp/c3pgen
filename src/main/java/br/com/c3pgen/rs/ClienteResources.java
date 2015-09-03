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
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;

import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.json.JsonCliente;

import br.com.c3pgen.model.Cliente;

import br.com.c3pgen.model.filter.FilterCliente;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.service.ClienteService;
import br.com.c3pgen.service.UserService;
import br.com.c3pgen.utils.Parser;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.security.SpringSecurityUserContext;
/**
*  generated: 03/09/2015 14:51:48
**/

@Path("/crud/clientes")
public class ClienteResources {

	@Inject
	ClienteService clienteService;
	
	
	public static final Logger LOGGER = Logger.getLogger(ClienteResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterCliente> paginationParams = new PaginationParams<FilterCliente>(uriInfo, FilterCliente.class);

			List<JsonCliente> jsonClientes = Parser.toListJsonClientes(clienteService.filter(paginationParams));
			response = Response.ok(jsonClientes).build();
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
			List<JsonCliente> jsonClientes = Parser.toListJsonClientes(clienteService.all());
			response = Response.ok(jsonClientes).build();
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
		Pager<Cliente> clientes = null;

		try {
			PaginationParams<FilterCliente> paginationParams = new PaginationParams<FilterCliente>(uriInfo, FilterCliente.class);
			clientes = clienteService.all(paginationParams);
			JsonPaginator<JsonCliente> paginator = new JsonPaginator<JsonCliente>(Parser.toListJsonClientes(clientes.getItens()), clientes.getActualPage(), clientes.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar clientes para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Cliente cliente = clienteService.get(id);

			return Response.ok().entity(Parser.toJson(cliente)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonCliente jsonCliente) {
		try {

			Cliente cliente = Parser.toEntity(jsonCliente);
			cliente = clienteService.save(cliente);
			return Response.ok().entity(Parser.toJson(cliente)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonCliente.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonCliente, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  cliente [ %s ] parametros [ %s ]", e.getMessage(), jsonCliente.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonCliente)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonCliente jsonCliente) {
		try {
			Cliente cliente = clienteService.get(id);
			Parser.apply(cliente, jsonCliente);

			cliente = clienteService.save(cliente);
			return Response.ok().entity(Parser.toJson(cliente)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonCliente.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonCliente, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonCliente.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonCliente)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(clienteService.delete(id)).build();
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
