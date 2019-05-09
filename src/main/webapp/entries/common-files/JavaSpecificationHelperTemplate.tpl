package ${application.rootPackage}.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import ${application.rootPackage}.model.${entity.name};
import ${application.rootPackage}.model.filter.Filter${entity.name};

import ${application.rootPackage}.core.persistence.pagination.SearchParameters;
import ${application.rootPackage}.core.utils.Util;

import org.springframework.data.jpa.domain.Specification;

<#if application.multitenancy && entity.multitenancy>
import ${application.corePackage}.model.Tenant;
</#if>	
@SuppressWarnings("serial")
public class ${entity.name}SpecificationHelper {

<#if application.multitenancy && entity.multitenancy>
	public static Specification<${entity.name}> fromId(Integer id, Tenant tenant) {
		return new Specification<${entity.name}>() {
			@Override
			public Predicate toPredicate(Root<${entity.name}> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<>();
				predicates.add(criteriaBuilder.equal(root.get("tenant"), tenant));
					predicates.add(criteriaBuilder.equal(root.get("id"), id));

				return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
			}
		};
	}
</#if>	
<#if application.multitenancy && entity.multitenancy>
	public static Specification<${entity.name}> filter(SearchParameters<Filter${entity.name}> searchParam, Tenant tenant) {
<#else>
	public static Specification<${entity.name}> filter(SearchParameters<Filter${entity.name}> searchParam) {
</#if>	
		return new Specification<${entity.name}>() {

			@Override
			public Predicate toPredicate(Root<${entity.name}> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<>();
				Filter${entity.name} filter${entity.name} = searchParam.getFilter();
			<#if application.multitenancy && entity.multitenancy>
				predicates.add(criteriaBuilder.equal(root.get("tenant"), tenant));
			</#if>					
			<#if entity.attributes??>	
			<#list entity.attributes as att>
			  	<#if att.type.className == 'String'>	
				if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
					predicates.add(criteriaBuilder.like(criteriaBuilder.upper(root.<String>get("${att.name}")), Util.wrapSufix(filter${entity.name}.get${firstUpper(att.name)}().toUpperCase(), searchParam.isExact())));
				}  
				<#else>
				if (filter${entity.name}.get${firstUpper(att.name)}() != null) {
					predicates.add(criteriaBuilder.equal(root.get("${att.name}"), filter${entity.name}.get${firstUpper(att.name)}()));
				}				
				</#if>	
			</#list>
			</#if>	
			<#if entity.relationships??>	
			<#list entity.relationships as rel>
				<#if rel.type == 'ManyToOne'>
				if (filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}() != null) {
					predicates.add(criteriaBuilder.equal(root.get("${firstLower(rel.name)!firstLower(rel.model)}").get("id"), filter${entity.name}.get${firstUpper(rel.name)!firstLower(rel.model)}()));
				}
				</#if>	
			</#list>
			</#if>					
				return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
			}
		};
	}
}
