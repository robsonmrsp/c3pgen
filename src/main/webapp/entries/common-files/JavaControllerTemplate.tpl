/*  generated by JSetup ${JSetupVersion} :  at ${.now} */
package ${package}.rs;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import ${corepackage}.json.JsonError;
import ${corepackage}.json.JsonPaginator;
import ${package}.json.Json${entity.name};

import ${package}.model.${entity.name};

import ${package}.service.${entity.name}Service;
import ${package}.model.filter.Filter${entity.name};
import ${corepackage}.persistence.pagination.Pager;
import ${corepackage}.persistence.pagination.SearchParameters;
import ${corepackage}.rs.exception.ValidationException;
import ${corepackage}.security.SpringSecurityUserContext;

import ${package}.utils.Parser;
<#if application.hasDocRestApi()>

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@Api("${firstUpper(entity.name)}'s CRUD API")
</#if>
@RestController
@RequestMapping("/rs/crud/${firstLower(entity.name)}s")
@SuppressWarnings({ "unchecked", "rawtypes" })
public class ${entity.name}Controller {
	@Autowired
	${entity.name}Service ${firstLower(entity.name)}Service;
	<#if application.multitenancy == true && entity.multitenancy>
	@Autowired
	private SpringSecurityUserContext context;
	</#if>
	public static final Logger LOGGER = LoggerFactory.getLogger(${entity.name}Controller.class);

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
	@RequestMapping(method = GET, produces = APPLICATION_JSON_VALUE)
	<#if application.hasDocRestApi()>
	public ResponseEntity get(@ApiIgnore @RequestParam MultiValueMap<String, String> mapParams) {
	<#else>
	public ResponseEntity get(@RequestParam MultiValueMap<String, String> mapParams) {
	</#if>
		ResponseEntity response = null;

		Pager<${entity.name}> ${firstLower(entity.name)}s = null;
		try {
			SearchParameters<Filter${entity.name}> paginationParams = new SearchParameters<Filter${entity.name}>(mapParams, Filter${entity.name}.class);

			<#if application.multitenancy == true && entity.multitenancy>
			${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.get(paginationParams, context.getTenant());
			<#else>
			${firstLower(entity.name)}s = ${firstLower(entity.name)}Service.get(paginationParams);
			</#if>
			
			JsonPaginator<Json${entity.name}> paginator = JsonPaginator.of(Parser.toListJson${entity.name}s(${firstLower(entity.name)}s.getItems()),
				 ${firstLower(entity.name)}s.getActualPage(), ${firstLower(entity.name)}s.getPageSize(), ${firstLower(entity.name)}s.getOrder(), ${firstLower(entity.name)}s.getOrderBy(),${firstLower(entity.name)}s.getTotalRecords());

			response = ResponseEntity.ok(paginator);

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar ${firstLower(entity.name)}s para os parametros %s [%s]", mapParams.toString(), e.getMessage());
			LOGGER.error(message, e);
			response = ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new JsonError(e, message, null));
		}
		return response;
	}
	
	<#if application.hasDocRestApi()>
	@ApiOperation(value = "Retrieve  a ${entity.name} by id ", response = Json${entity.name}.class)
	</#if>
	@RequestMapping(value = "{id:\\d+}", method = GET, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity get(@PathVariable("id") int id) {
		try {
			<#if application.multitenancy == true && entity.multitenancy>
			Optional<${entity.name}> optional = ${firstLower(entity.name)}Service.get(id, context.getTenant());
			<#else>
			Optional<${entity.name}> optional = ${firstLower(entity.name)}Service.get(id);
			</#if>
			
			if (optional.isPresent()) {
				return ResponseEntity.ok(Parser.toJson(optional.get()));
			}

			return ResponseEntity.notFound().build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new JsonError(e, message, null));
		}
	}

	<#if application.hasDocRestApi()>
	@ApiOperation(value = "Save a  ${entity.name}.", response = Json${entity.name}.class)
	</#if>
	@RequestMapping(method = POST, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity save(@RequestBody Json${entity.name} json${entity.name}) {
		try {
			${entity.name} ${firstLower(entity.name)} = Parser.toEntity(json${entity.name});

			${firstLower(entity.name)} = ${firstLower(entity.name)}Service.save(${firstLower(entity.name)});

			return ResponseEntity.status(CREATED).body(Parser.toJson(${firstLower(entity.name)}));

		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e.getOrigem());
			return ResponseEntity.status(BAD_REQUEST).body(new JsonError(e, message, json${entity.name}, e.getLegalMessage()));
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  ${firstLower(entity.name)} [ %s ] parametros [ %s ]", e.getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e);
			return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new JsonError(e, message, json${entity.name}));

		}
	}

	<#if application.hasDocRestApi()>
	@ApiOperation(value = "Update a ${entity.name}. with the 'id' ", response = Json${entity.name}.class)
	</#if>
	@RequestMapping(value = "{id:\\d+}", method = PUT, produces = APPLICATION_JSON_VALUE)
	public ResponseEntity update(@PathVariable("id") Integer id, @RequestBody Json${entity.name} json${entity.name}) {
		try {
			${entity.name} ${firstLower(entity.name)} = Parser.toEntity(json${entity.name});

			${firstLower(entity.name)} = ${firstLower(entity.name)}Service.update(${firstLower(entity.name)});

			return ResponseEntity.ok(Parser.toJson(${firstLower(entity.name)}));
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel salvar  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e.getOrigem());
			return ResponseEntity.status(BAD_REQUEST).body(new JsonError(e, message, json${entity.name}, e.getLegalMessage()));
		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), json${entity.name}.toString());
			LOGGER.error(message, e);
			return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new JsonError(e, message, json${entity.name}));
		}
	}
	<#if application.hasDocRestApi()>
	@ApiOperation(value = "Remove the ${entity.name} with the 'id' .")
	</#if>
	
	@RequestMapping(value = "{id:\\d+}", method = DELETE)
	public ResponseEntity delete(@PathVariable("id") Integer id) {
		try {
		<#if application.multitenancy == true && entity.multitenancy>
			${firstLower(entity.name)}Service.delete(id, context.getTenant());
		<#else>
			${firstLower(entity.name)}Service.delete(id);
		</#if>
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new JsonError(e, message, id));
		}
	}

}
//generated by JSetup ${JSetupVersion} :  at ${.now}
