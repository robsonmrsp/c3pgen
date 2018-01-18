package ${package}.rs;

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

import ${corepackage}.json.JsonError;
import ${corepackage}.json.JsonPaginator;

import ${package}.model.${entity.name};

import ${package}.service.${entity.name}Service;
import ${package}.model.filter.Filter${entity.name};
import ${corepackage}.pager.Pager;
import ${corepackage}.pager.PaginationParams;

import ${corepackage}.rs.exception.ValidationException;
/* generated: ${.now} */
@Path("/crud/${firstLower(entity.name)}s")
public class ${entity.name}Resources {

	@Inject
	${entity.name}Service ${firstLower(entity.name)}Service;
	
	<#if entity.hasOwner == true>
	@Inject
	private SpringSecurityUserContext context;
	</#if>
	
	public static final Logger LOGGER = Logger.getLogger(${entity.name}Resources.class);

	@GET
	@Path("filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<Filter${entity.name}> paginationParams = new PaginationParams<Filter${entity.name}>(uriInfo, Filter${entity.name}.class);

			List<${entity.name}> ${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.filtra(paginationParams.getFilter());
			response = Response.ok(${firstLower(entity.name)}s).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e, message)).build();
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
			List<${entity.name}> ${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.lista();
			response = Response.ok(${firstLower(entity.name)}s).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e,message)).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response all(@Context UriInfo uriInfo) {
		Response response = null;
		Pager<${entity.name}> ${firstLower(entity.name)}s = null;

		try {
			PaginationParams<Filter${entity.name}> paginationParams = new PaginationParams<Filter${entity.name}>(uriInfo, Filter${entity.name}.class);
			${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.pesquisa(paginationParams);
			JsonPaginator<${entity.name}> paginator = new JsonPaginator<${entity.name}>(${firstLower(entity.name)}s.getItems(), ${firstLower(entity.name)}s.getActualPage(), ${firstLower(entity.name)}s.getTotalRecords());

			response = Response.ok(paginator).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar ${firstLower(entity.name)}s para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e,message)).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response get(@PathParam("id") Integer id) {
		try {
			${entity.name} ${firstLower(entity.name)} = ${firstLower(entity.name)}Service.carrega(id);
			
			return Response.ok().entity(${firstLower(entity.name)}).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e,message)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(${entity.name} ${firstLower(entity.name)}) {
		try {
			${firstLower(entity.name)} = ${firstLower(entity.name)}Service.salva(${firstLower(entity.name)});
			return Response.ok().entity(${firstLower(entity.name)}).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), ${firstLower(entity.name)}.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, ${firstLower(entity.name)}, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  ${firstLower(entity.name)} [ %s ] parametros [ %s ]", e.getMessage(), ${firstLower(entity.name)}.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e,message)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, ${entity.name} ${firstLower(entity.name)}) {
		try {
			${firstLower(entity.name)} = ${firstLower(entity.name)}Service.atualiza(${firstLower(entity.name)});
			return Response.ok().entity(${firstLower(entity.name)}).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), ${firstLower(entity.name)}.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, ${firstLower(entity.name)}, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), ${firstLower(entity.name)}.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e,message )).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(${firstLower(entity.name)}Service.deleta(id)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), id);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, id, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e,message)).build();
		}
	}
}
