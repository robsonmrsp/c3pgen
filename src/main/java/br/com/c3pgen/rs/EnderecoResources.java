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

import br.com.c3pgen.json.JsonEndereco;
import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.model.Endereco;
import br.com.c3pgen.model.filter.FilterEndereco;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.service.EnderecoService;
import br.com.c3pgen.utils.Parser;
/**
*  generated: 03/09/2015 14:51:48
**/

@Path("/crud/enderecos")
public class EnderecoResources {

	@Inject
	EnderecoService enderecoService;
	
	
	public static final Logger LOGGER = Logger.getLogger(EnderecoResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterEndereco> paginationParams = new PaginationParams<FilterEndereco>(uriInfo, FilterEndereco.class);

			List<JsonEndereco> jsonEnderecos = Parser.toListJsonEnderecos(enderecoService.filter(paginationParams));
			response = Response.ok(jsonEnderecos).build();
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
			List<JsonEndereco> jsonEnderecos = Parser.toListJsonEnderecos(enderecoService.all());
			response = Response.ok(jsonEnderecos).build();
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
		Pager<Endereco> enderecos = null;

		try {
			PaginationParams<FilterEndereco> paginationParams = new PaginationParams<FilterEndereco>(uriInfo, FilterEndereco.class);
			enderecos = enderecoService.all(paginationParams);
			JsonPaginator<JsonEndereco> paginator = new JsonPaginator<JsonEndereco>(Parser.toListJsonEnderecos(enderecos.getItens()), enderecos.getActualPage(), enderecos.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar enderecos para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Endereco endereco = enderecoService.get(id);

			return Response.ok().entity(Parser.toJson(endereco)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonEndereco jsonEndereco) {
		try {

			Endereco endereco = Parser.toEntity(jsonEndereco);
			endereco = enderecoService.save(endereco);
			return Response.ok().entity(Parser.toJson(endereco)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonEndereco.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonEndereco, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  endereco [ %s ] parametros [ %s ]", e.getMessage(), jsonEndereco.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonEndereco)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonEndereco jsonEndereco) {
		try {
			Endereco endereco = enderecoService.get(id);
			Parser.apply(endereco, jsonEndereco);

			endereco = enderecoService.save(endereco);
			return Response.ok().entity(Parser.toJson(endereco)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonEndereco.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonEndereco, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonEndereco.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonEndereco)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(enderecoService.delete(id)).build();
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
