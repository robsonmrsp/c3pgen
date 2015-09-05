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

import br.com.c3pgen.json.JsonBairro;
import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.json.JsonPaginator;
import br.com.c3pgen.model.Bairro;
import br.com.c3pgen.model.filter.FilterBairro;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.service.BairroService;
import br.com.c3pgen.utils.Parser;
/**
*  generated: 03/09/2015 14:51:48
**/

@Path("/crud/bairros")
public class BairroResources {

	@Inject
	BairroService bairroService;
	
	
	public static final Logger LOGGER = Logger.getLogger(BairroResources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<FilterBairro> paginationParams = new PaginationParams<FilterBairro>(uriInfo, FilterBairro.class);

			List<JsonBairro> jsonBairros = Parser.toListJsonBairros(bairroService.filter(paginationParams));
			response = Response.ok(jsonBairros).build();
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
			List<JsonBairro> jsonBairros = Parser.toListJsonBairros(bairroService.all());
			response = Response.ok(jsonBairros).build();
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
		Pager<Bairro> bairros = null;

		try {
			PaginationParams<FilterBairro> paginationParams = new PaginationParams<FilterBairro>(uriInfo, FilterBairro.class);
			bairros = bairroService.all(paginationParams);
			JsonPaginator<JsonBairro> paginator = new JsonPaginator<JsonBairro>(Parser.toListJsonBairros(bairros.getItens()), bairros.getActualPage(), bairros.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar bairros para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			Bairro bairro = bairroService.get(id);

			return Response.ok().entity(Parser.toJson(bairro)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonBairro jsonBairro) {
		try {

			Bairro bairro = Parser.toEntity(jsonBairro);
			bairro = bairroService.save(bairro);
			return Response.ok().entity(Parser.toJson(bairro)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonBairro.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonBairro, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  bairro [ %s ] parametros [ %s ]", e.getMessage(), jsonBairro.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonBairro)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, JsonBairro jsonBairro) {
		try {
			Bairro bairro = bairroService.get(id);
			Parser.apply(bairro, jsonBairro);

			bairro = bairroService.save(bairro);
			return Response.ok().entity(Parser.toJson(bairro)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), jsonBairro.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, jsonBairro, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonBairro.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonBairro)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(bairroService.delete(id)).build();
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
