package ${package}.rs;

import java.util.List;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ${corepackage}.json.JsonError;
import ${corepackage}.json.JsonPaginator;
import ${package}.json.Json${entity.name};

import ${package}.model.${entity.name};

<#if entity.hasOwner>
import ${application.corePackage}.model.Client;
</#if>
import ${package}.service.${entity.name}Service;
import ${package}.model.filter.Filter${entity.name};
import ${corepackage}.persistence.pagination.Pager;
import ${corepackage}.persistence.pagination.PaginationParams;
import ${package}.service.UserService;
import ${corepackage}.rs.exception.ValidationException;
import ${corepackage}.security.SpringSecurityUserContext;

import ${package}.utils.Parser;
<#if application.hasDocRestApi()>
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
@Api("${firstUpper(entity.name)}'s CRUD API")
</#if>
/*  generated by JSetup ${JSetupVersion} :  at ${.now} */
@RestController
@RequestMapping("/rs/crud/${firstLower(entity.name)}s")
@SuppressWarnings({ "unchecked", "rawtypes" })
public class ${entity.name}Controller {
	@Inject
	${entity.name}Service ${firstLower(entity.name)}Service;
	<#if entity.hasOwner == true>
	@Inject
	private SpringSecurityUserContext context;
	</#if>
	public static final Logger LOGGER = Logger.getLogger(${entity.name}Controller.class);

	<#if application.hasDocRestApi()>
	@ApiOperation(value = "${entity.name}'s List by comparation [EXACTLY EQUAL] of query parameters.", response = Json${entity.name}.class, responseContainer = "List")
	@ApiImplicitParams({ 
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id' && att.viewApproach.type  != 'upload'>
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
	</#if>
	
	@RequestMapping(value = "filterEqual", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity filter(@RequestParam MultiValueMap<String, String> requestParams) {
		ResponseEntity response = null;

		try {
			PaginationParams<Filter${entity.name}> paginationParams = new PaginationParams(requestParams, Filter${entity.name}.class);
			
			<#if entity.hasOwner == true>
			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.filter(paginationParams, context.getCurrentUser().getOwner(), Boolean.TRUE));
			<#else>
			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.filter(paginationParams, Boolean.TRUE));
			</#if>

			response = new ResponseEntity(json${entity.name}s, HttpStatus.OK);
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = new ResponseEntity(new JsonError(e, message, null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	
	<#if application.hasDocRestApi()>
	@ApiOperation(value = "${entity.name}'s List by comparation [LIKE] of query parameters.", response = Json${entity.name}.class, responseContainer = "List")
	@ApiImplicitParams({ 
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id' && att.viewApproach.type  != 'upload'>
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
	</#if>
	@RequestMapping(value = "filterAlike", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity filterAlike(@RequestParam MultiValueMap<String, String> requestParams) {
		ResponseEntity response = null;
		try {
			PaginationParams<Filter${entity.name}> paginationParams = new PaginationParams<Filter${entity.name}>(requestParams, Filter${entity.name}.class);

			<#if entity.hasOwner == true>
			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.filter(paginationParams, context.getCurrentUser().getOwner(), Boolean.FALSE));
			<#else>
			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.filter(paginationParams, Boolean.FALSE));
			</#if>

			response = new ResponseEntity(json${entity.name}s, HttpStatus.OK);
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = new ResponseEntity(new JsonError(e, message, null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}
	<#if application.hasDocRestApi()>
	@ApiOperation(value = "All the ${entity.name}s.", response = Json${entity.name}.class, responseContainer = "List")
	</#if>
	@RequestMapping(value = "all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity all() {
		ResponseEntity response = null;
		try {
			
			<#if entity.hasOwner == true>
			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.all(context.getCurrentUser().getOwner()));
			<#else>
			List<Json${entity.name}> json${entity.name}s = Parser.toListJson${entity.name}s(${firstLower(entity.name)}Service.all());
			</#if>
			
			response = new ResponseEntity(json${entity.name}s, HttpStatus.OK);
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = new ResponseEntity(new JsonError(e, message, null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	<#if application.hasDocRestApi()>
	@ApiOperation(value = "${entity.name}'s Page by comparation [LIKE] of query parameters and pagination parameters", response = Pager.class)
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "page", value = "With page", paramType = "query", dataType="string"),  			
		@ApiImplicitParam(name = "orderBy", value = "the sort field", paramType = "query", dataType="string"),  			
		@ApiImplicitParam(name = "order", value = "sort ASC or sort DESC", paramType = "query", dataType="string", allowableValues="asc,desc"),  			
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id' && att.viewApproach.type  != 'upload'>
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
	</#if>
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity all(@RequestParam MultiValueMap<String, String> requestParams) {
		ResponseEntity response = null;
		Pager<${entity.name}> ${firstLower(entity.name)}s = null;

		try {
			PaginationParams<Filter${entity.name}> paginationParams = new PaginationParams<Filter${entity.name}>(requestParams, Filter${entity.name}.class);

			<#if entity.hasOwner == true>
			${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.all(paginationParams, context.getCurrentUser().getOwner());
			<#else>
			${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.all(paginationParams);
			</#if>

			JsonPaginator<Json${entity.name}> paginator = new JsonPaginator<Json${entity.name}>(Parser.toListJson${entity.name}s(${firstLower(entity.name)}s.getItens()), ${firstLower(entity.name)}s.getActualPage(), ${firstLower(entity.name)}s.getTotalRecords());

			response = new ResponseEntity(paginator, HttpStatus.OK);

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar ${firstLower(entity.name)}s para os parametros %s [%s]", requestParams.toString(), e.getMessage());
			LOGGER.error(message, e);
			response = new ResponseEntity(new JsonError(e, message, null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	<#if application.hasDocRestApi()>
	@ApiOperation(value = "Retrieve  a ${entity.name} by id ", response = Json${entity.name}.class)
	</#if>
	@RequestMapping(value = "{id:\\d+}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity get(@PathVariable("id") int id) {
		try {

			<#if entity.hasOwner == true>
			${entity.name} ${firstLower(entity.name)} = ${firstLower(entity.name)}Service.get(id, context.getCurrentUser().getOwner());
			<#else>
			${entity.name} ${firstLower(entity.name)} = ${firstLower(entity.name)}Service.get(id);
			</#if>
			if (${firstLower(entity.name)} == null) {
				return new ResponseEntity(HttpStatus.NO_CONTENT);
			}
			return ResponseEntity.ok(Parser.toJson(${firstLower(entity.name)}));

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return new ResponseEntity(new JsonError(e, message, null), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	<#if application.hasDocRestApi()>
	@ApiOperation(value = "Save a  ${entity.name}.", response = Json${entity.name}.class)
	</#if>
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity save(@RequestBody Json${entity.name} json${entity.name}) {
		try {

			${entity.name} ${firstLower(entity.name)} = Parser.toEntity(json${entity.name});
			<#if entity.hasOwner == true>
			${firstLower(entity.name)}.setOwner(context.getCurrentUser().getOwner());
			</#if>
			${firstLower(entity.name)} = ${firstLower(entity.name)}Service.save(${firstLower(entity.name)});
			return ResponseEntity.ok(Parser.toJson(${firstLower(entity.name)}));
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e.getOrigem());
			return new ResponseEntity(new JsonError(e, message, json${entity.name}, e.getLegalMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  ${firstLower(entity.name)} [ %s ] parametros [ %s ]", e.getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e);
			return new ResponseEntity(new JsonError(e, message, json${entity.name}), HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	<#if application.hasDocRestApi()>
	@ApiOperation(value = "Update a ${entity.name}. with the 'id' ", response = Json${entity.name}.class)
	</#if>
	@RequestMapping(value = "{id:\\d+}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity update(@PathVariable("id") Integer id, @RequestBody Json${entity.name} json${entity.name}) {
		try {
			${entity.name} ${firstLower(entity.name)} = Parser.toEntity(json${entity.name});

			<#if entity.hasOwner == true>
			${firstLower(entity.name)}.setOwner(context.getCurrentUser().getOwner());
			</#if>

			${firstLower(entity.name)} = ${firstLower(entity.name)}Service.update(${firstLower(entity.name)});
			return ResponseEntity.ok(Parser.toJson(${firstLower(entity.name)}));
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e.getOrigem());

			return new ResponseEntity(new JsonError(e, message, json${entity.name}, e.getLegalMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e);
			return new ResponseEntity(new JsonError(e, message, json${entity.name}), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	<#if application.hasDocRestApi()>
	@ApiOperation(value = "Remove the ${entity.name} with the 'id' .")
	</#if>
	@RequestMapping(value = "{id:\\d+}", method = RequestMethod.DELETE)
	public ResponseEntity delete(@PathVariable("id") Integer id) {
		try {
			return ResponseEntity.ok(${firstLower(entity.name)}Service.delete(id));
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), id);
			LOGGER.error(message, e.getOrigem());
			return new ResponseEntity(new JsonError(e, message, id, e.getLegalMessage()), HttpStatus.INTERNAL_SERVER_ERROR);

		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return new ResponseEntity(new JsonError(e, message, id), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
//generated by JSetup ${JSetupVersion} :  at ${.now}