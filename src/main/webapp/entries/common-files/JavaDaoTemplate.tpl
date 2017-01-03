package ${application.rootPackage}.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import ${application.rootPackage}.model.${entity.name};
import ${application.corePackage}.persistence.AccessibleHibernateDao;
import ${application.rootPackage}.model.filter.Filter${entity.name};
import ${application.corePackage}.persistence.pagination.Pagination;
import ${application.corePackage}.persistence.pagination.PaginationParams;
import ${application.corePackage}.persistence.pagination.Paginator;

import ${application.rootPackage}.model.${entity.name};
<#if entity.hasOwner>
import ${application.rootPackage}.model.Client;
</#if>
/**
*  generated: ${.now}
**/

@Named
@SuppressWarnings("rawtypes")
public class Dao${entity.name} extends AccessibleHibernateDao<${entity.name}> {
	private static final Logger LOGGER = Logger.getLogger(Dao${entity.name}.class);

	public Dao${entity.name}() {
		super(${entity.name}.class);
	}
	<#if entity.attributes??>	
	<#list entity.attributes as att>
	<#if att.unique == true>
	public ${entity.name} findBy${firstUpper(att.name)}(String ${att.name}) {
		${entity.name} ${firstLower(entity.name)} = null;
		try {
			${firstLower(entity.name)} = (${entity.name}) criteria().add(Restrictions.eq("${att.name}", ${att.name})).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter ${entity.displayName} pelo ${att.name}," + ${att.name}, e);
		}
		return ${firstLower(entity.name)};
	}
	</#if>	
	</#list>
	</#if>	

	@Override
	public Pagination<${entity.name}> getAll(PaginationParams paginationParams) {
		Filter${entity.name} filter${entity.name} = (Filter${entity.name}) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
	<#if entity.attributes??>	
	<#list entity.attributes as att>
      	<#if att.type.className == 'String'>	
		if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
			searchCriteria.add(Restrictions.ilike("${att.name}", filter${entity.name}.get${firstUpper(att.name)}(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("${att.name}", filter${entity.name}.get${firstUpper(att.name)}(), MatchMode.ANYWHERE));
		}
		<#else>
		if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
			searchCriteria.add(Restrictions.eq("${att.name}", filter${entity.name}.get${firstUpper(att.name)}()));
			countCriteria.add(Restrictions.eq("${att.name}", filter${entity.name}.get${firstUpper(att.name)}()));
		}				
		</#if>	
	</#list>
	</#if>	
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'ManyToOne'>
		if (filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}() != null) {
			searchCriteria.createAlias("${firstLower(rel.name)!firstLower(rel.model)}", "${firstLower(rel.name)!firstLower(rel.model)}_");
			countCriteria.createAlias("${firstLower(rel.name)!firstLower(rel.model)}", "${firstLower(rel.name)!firstLower(rel.model)}_");
			searchCriteria.add(Restrictions.eq("${firstLower(rel.name)!firstLower(rel.model)}_.id", filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}()));
			countCriteria.add(Restrictions.eq("${firstLower(rel.name)!firstLower(rel.model)}_.id", filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}()));
		}
		</#if>	
	</#list>
	</#if>	

		return new Paginator<${entity.name}>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<${entity.name}> filter(PaginationParams paginationParams) {
		List<${entity.name}> list = new ArrayList<${entity.name}>();
		Filter${entity.name} filter${entity.name} = (Filter${entity.name}) paginationParams.getFilter();
		return filter(filter${entity.name} );
	}
	
	public List<${entity.name}> filter(Filter${entity.name} filter${entity.name}) {
		List<${entity.name}> list = new ArrayList<${entity.name}>();
		Criteria searchCriteria = criteria();
	<#if entity.attributes??>	
	<#list entity.attributes as att>
      	<#if att.type.className == 'String'>	
		if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
			searchCriteria.add(Restrictions.ilike("${att.name}", filter${entity.name}.get${firstUpper(att.name)}(), MatchMode.ANYWHERE));
		}
		<#else>
		if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
			searchCriteria.add(Restrictions.eq("${att.name}", filter${entity.name}.get${firstUpper(att.name)}()));
		}				
		</#if>	
	</#list>
	</#if>	
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'ManyToOne'>
		if (filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}() != null) {
			searchCriteria.createAlias("${firstLower(rel.name)!firstLower(rel.model)}", "${firstLower(rel.name)!firstLower(rel.model)}_");
			searchCriteria.add(Restrictions.eq("${firstLower(rel.name)!firstLower(rel.model)}_.id", filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}()));
		}
		</#if>	
	</#list>
	</#if>	
		// Independente da quantidade de registros na base de dados, somente
		// será devolvido no maximo 100.
		list.addAll(searchCriteria.setMaxResults(100).list());
		return list;
	}
	<#if entity.hasOwner>
	@Override
	public Pagination<${entity.name}> getAll(PaginationParams paginationParams, Client owner) {
		Filter${entity.name} filter${entity.name} = (Filter${entity.name}) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
	<#if entity.attributes??>	
	<#list entity.attributes as att>
      	<#if att.type.className == 'String'>	
		if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
			searchCriteria.add(Restrictions.ilike("${att.name}", filter${entity.name}.get${firstUpper(att.name)}(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("${att.name}", filter${entity.name}.get${firstUpper(att.name)}(), MatchMode.ANYWHERE));
		}
		<#else>
		if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
			searchCriteria.add(Restrictions.eq("${att.name}", filter${entity.name}.get${firstUpper(att.name)}()));
			countCriteria.add(Restrictions.eq("${att.name}", filter${entity.name}.get${firstUpper(att.name)}()));
		}				
		</#if>	
	</#list>
	</#if>	
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'ManyToOne'>
		if (filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}() != null) {
			searchCriteria.createAlias("${firstLower(rel.name)!firstLower(rel.model)}", "${firstLower(rel.name)!firstLower(rel.model)}_");
			countCriteria.createAlias("${firstLower(rel.name)!firstLower(rel.model)}", "${firstLower(rel.name)!firstLower(rel.model)}_");
			searchCriteria.add(Restrictions.eq("${firstLower(rel.name)!firstLower(rel.model)}_.id", filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}()));
			countCriteria.add(Restrictions.eq("${firstLower(rel.name)!firstLower(rel.model)}_.id", filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}()));
		}
		</#if>	
	</#list>
	</#if>	
	return new Paginator<${entity.name}>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<${entity.name}> filter(PaginationParams paginationParams, Client owner) {
		List<${entity.name}> list = new ArrayList<${entity.name}>();
		Filter${entity.name} filter${entity.name} = (Filter${entity.name}) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
			searchCriteria.add(Restrictions.eq("${att.name}", filter${entity.name}.get${firstUpper(att.name)}()));
		}
	</#list>
	</#if>	
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'ManyToOne'>
		if (filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}() != null) {
			searchCriteria.createAlias("${firstLower(rel.name)!firstLower(rel.model)}", "${firstLower(rel.name)!firstLower(rel.model)}_");
			searchCriteria.add(Restrictions.eq("${firstLower(rel.name)!firstLower(rel.model)}_.id", filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}()));
		}
		</#if>	
	</#list>
	</#if>	

		list.addAll(searchCriteria.list());
		return list;
	}
	
	</#if>	
}
