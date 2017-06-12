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
import ${package}.json.Json${entity.name};

import ${package}.model.${entity.name};

<#if entity.hasOwner == true>
import ${package}.model.Client;
</#if>
import ${package}.service.${entity.name}Service;
import ${package}.model.filter.Filter${entity.name};
import ${corepackage}.persistence.pagination.Pager;
import ${corepackage}.persistence.pagination.PaginationParams;
import ${package}.service.UserService;
import ${corepackage}.rs.exception.ValidationException;
import ${corepackage}.security.SpringSecurityUserContext;

import ${package}.utils.Parser;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
*  generated: ${.now}
**/


@Api("${firstUpper(entity.name)}'s CRUD API")
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
	@Path("filterEqual")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "${entity.name}'s List by comparation [EXACTLY EQUAL] of query parameters.", response = Json${entity.name}.class, responseContainer = "List")
	@ApiImplicitParams({ 
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
		@ApiImplicitParam(name = "${att.name}", value = "${att.displayName}", paramType = "query", dataType="string"),  			
		</#if>
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'ManyToOne'>
		@ApiImplicitParam(name = "${rel.name}", value = "${rel.displayName}", paramType = "query", dataType="integer"),		
		</#if>
	</#list>
	</#if>
	})
	public Response filter(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<Filter${entity.name}> paginationParams = new PaginationParams<Filter${entity.name}>(uriInfo, Filter${entity.name}.class);

			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.filter(paginationParams, Boolean.TRUE));
			response = Response.ok(json${entity.name}s).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e,message, null)).build();
		}
		return response;
	}

	@GET
	@Path("filterAlike")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "${entity.name}'s List by comparation [LIKE] of query parameters.", response = Json${entity.name}.class, responseContainer = "List")
	@ApiImplicitParams({ 
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
		@ApiImplicitParam(name = "${att.name}", value = "${att.displayName}", paramType = "query", dataType="string"),  			
		</#if>
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'ManyToOne'>
		@ApiImplicitParam(name = "${rel.name}", value = "${rel.displayName}", paramType = "query", dataType="integer"),		
		</#if>
	</#list>
	</#if>
	})
	public Response filterAlike(@Context UriInfo uriInfo) {
		Response response = null;
		try {
			PaginationParams<Filter${entity.name}> paginationParams = new PaginationParams<Filter${entity.name}>(uriInfo, Filter${entity.name}.class);

			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.filter(paginationParams, Boolean.FALSE));
			response = Response.ok(json${entity.name}s).build();
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
	@ApiOperation(value = "All the ${entity.name}s.", response = Json${entity.name}.class, responseContainer = "List")
	public Response all() {
		Response response = null;
		try {
			<#if entity.hasOwner == true>
			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.all(context.getCurrentUser().getOwner()));
			<#else>
			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.all());
			</#if>
			response = Response.ok(json${entity.name}s).build();
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
	@ApiOperation(value = "${entity.name}'s Page by comparation [LIKE] of query parameters and pagination parameters", response = Pager.class)
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "page", value = "With page", paramType = "query", dataType="string"),  			
		@ApiImplicitParam(name = "orderBy", value = "the sort field", paramType = "query", dataType="string"),  			
		@ApiImplicitParam(name = "order", value = "sort ASC or sort DESC", paramType = "query", dataType="string", allowableValues="asc,desc"),  			
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
		@ApiImplicitParam(name = "${att.name}", value = "${att.displayName}", paramType = "query", dataType="string"),  			
		</#if>
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'ManyToOne'>
		@ApiImplicitParam(name = "${rel.name}", value = "${rel.displayName}", paramType = "query", dataType="integer"),		
		</#if>
	</#list>
	</#if>
	})	
	public Response all(@Context UriInfo uriInfo) {
		Response response = null;
		Pager<${entity.name}> ${firstLower(entity.name)}s = null;

		try {
			PaginationParams<Filter${entity.name}> paginationParams = new PaginationParams<Filter${entity.name}>(uriInfo, Filter${entity.name}.class);
			<#if entity.hasOwner == true>
			${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.all(paginationParams, context.getCurrentUser().getOwner());
			<#else>
			${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.all(paginationParams);
			</#if>
			JsonPaginator<Json${entity.name}> paginator = new JsonPaginator<Json${entity.name}>(Parser.toListJson${entity.name}s(${firstLower(entity.name)}s.getItens()), ${firstLower(entity.name)}s.getActualPage(), ${firstLower(entity.name)}s.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar ${firstLower(entity.name)}s para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
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

			<#if entity.hasOwner == true>
			${entity.name} ${firstLower(entity.name)} = ${firstLower(entity.name)}Service.get(id, context.getCurrentUser().getOwner());
			<#else>
			${entity.name} ${firstLower(entity.name)} = ${firstLower(entity.name)}Service.get(id);
			</#if>

			return Response.ok().entity(Parser.toJson(${firstLower(entity.name)})).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Save a  ${entity.name}.", response = Json${entity.name}.class)
	public Response save(Json${entity.name} json${entity.name}) {
		try {

			${entity.name} ${firstLower(entity.name)} = Parser.toEntity(json${entity.name});
			<#if entity.hasOwner == true>
			${firstLower(entity.name)}.setOwner(context.getCurrentUser().getOwner());
			</#if>
			${firstLower(entity.name)} = ${firstLower(entity.name)}Service.save(${firstLower(entity.name)});
			return Response.ok().entity(Parser.toJson(${firstLower(entity.name)})).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, json${entity.name}, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  ${firstLower(entity.name)} [ %s ] parametros [ %s ]", e.getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, json${entity.name})).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	@ApiOperation(value = "Update a ${entity.name}. with the 'id' ", response = Json${entity.name}.class)
	public Response update(@PathParam("id") Integer id, Json${entity.name} json${entity.name}) {
		try {
			${entity.name} ${firstLower(entity.name)} = Parser.toEntity(json${entity.name});

			<#if entity.hasOwner == true>
			${firstLower(entity.name)}.setOwner(context.getCurrentUser().getOwner());
			</#if>
			${firstLower(entity.name)} = ${firstLower(entity.name)}Service.save(${firstLower(entity.name)});
			return Response.ok().entity(Parser.toJson(${firstLower(entity.name)})).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, json${entity.name}, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, json${entity.name})).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Remove the ${entity.name} with the 'id' .", response = Json${entity.name}.class)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(${firstLower(entity.name)}Service.delete(id)).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), id);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(e, message, id, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(e, message, id)).build();
		}
	}
}
