package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.filter.FilterAttribute;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;
/**
*  generated: 03/09/2015 14:51:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoAttribute extends AccessibleHibernateDao<Attribute> {
	private static final Logger LOGGER = Logger.getLogger(DaoAttribute.class);

	public DaoAttribute() {
		super(Attribute.class);
	}

	@Override
	public Pagination<Attribute> getAll(PaginationParams paginationParams) {
		FilterAttribute filterAttribute = (FilterAttribute) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterAttribute.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterAttribute.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterAttribute.getName(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getDisplayName() != null) {
			searchCriteria.add(Restrictions.ilike("displayName", filterAttribute.getDisplayName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("displayName", filterAttribute.getDisplayName(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getMaxLen() != null) {
			searchCriteria.add(Restrictions.eq("maxLen", filterAttribute.getMaxLen()));
			countCriteria.add(Restrictions.eq("maxLen", filterAttribute.getMaxLen()));
		}				
		if (filterAttribute.getTableFieldName() != null) {
			searchCriteria.add(Restrictions.ilike("tableFieldName", filterAttribute.getTableFieldName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("tableFieldName", filterAttribute.getTableFieldName(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getMasc() != null) {
			searchCriteria.add(Restrictions.ilike("masc", filterAttribute.getMasc(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("masc", filterAttribute.getMasc(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getDefaultValue() != null) {
			searchCriteria.add(Restrictions.ilike("defaultValue", filterAttribute.getDefaultValue(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("defaultValue", filterAttribute.getDefaultValue(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getPlaceholder() != null) {
			searchCriteria.add(Restrictions.ilike("placeholder", filterAttribute.getPlaceholder(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("placeholder", filterAttribute.getPlaceholder(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getRequired() != null) {
			searchCriteria.add(Restrictions.eq("required", filterAttribute.getRequired()));
			countCriteria.add(Restrictions.eq("required", filterAttribute.getRequired()));
		}				
		if (filterAttribute.getUnique() != null) {
			searchCriteria.add(Restrictions.eq("unique", filterAttribute.getUnique()));
			countCriteria.add(Restrictions.eq("unique", filterAttribute.getUnique()));
		}				
		if (filterAttribute.getEntity() != null) {
			searchCriteria.createAlias("entity", "entity_");
			countCriteria.createAlias("entity", "entity_");
			searchCriteria.add(Restrictions.eq("entity_.id", filterAttribute.getEntity()));
			countCriteria.add(Restrictions.eq("entity_.id", filterAttribute.getEntity()));
		}
		if (filterAttribute.getType() != null) {
			searchCriteria.createAlias("type", "type_");
			countCriteria.createAlias("type", "type_");
			searchCriteria.add(Restrictions.eq("type_.id", filterAttribute.getType()));
			countCriteria.add(Restrictions.eq("type_.id", filterAttribute.getType()));
		}
		if (filterAttribute.getViewApproach() != null) {
			searchCriteria.createAlias("viewApproach", "viewApproach_");
			countCriteria.createAlias("viewApproach", "viewApproach_");
			searchCriteria.add(Restrictions.eq("viewApproach_.id", filterAttribute.getViewApproach()));
			countCriteria.add(Restrictions.eq("viewApproach_.id", filterAttribute.getViewApproach()));
		}

		return new Paginator<Attribute>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Attribute> filter(PaginationParams paginationParams) {
		List<Attribute> list = new ArrayList<Attribute>();
		FilterAttribute filterAttribute = (FilterAttribute) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterAttribute.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterAttribute.getName()));
		}
		if (filterAttribute.getDisplayName() != null) {
			searchCriteria.add(Restrictions.eq("displayName", filterAttribute.getDisplayName()));
		}
		if (filterAttribute.getMaxLen() != null) {
			searchCriteria.add(Restrictions.eq("maxLen", filterAttribute.getMaxLen()));
		}
		if (filterAttribute.getTableFieldName() != null) {
			searchCriteria.add(Restrictions.eq("tableFieldName", filterAttribute.getTableFieldName()));
		}
		if (filterAttribute.getMasc() != null) {
			searchCriteria.add(Restrictions.eq("masc", filterAttribute.getMasc()));
		}
		if (filterAttribute.getDefaultValue() != null) {
			searchCriteria.add(Restrictions.eq("defaultValue", filterAttribute.getDefaultValue()));
		}
		if (filterAttribute.getPlaceholder() != null) {
			searchCriteria.add(Restrictions.eq("placeholder", filterAttribute.getPlaceholder()));
		}
		if (filterAttribute.getRequired() != null) {
			searchCriteria.add(Restrictions.eq("required", filterAttribute.getRequired()));
		}
		if (filterAttribute.getUnique() != null) {
			searchCriteria.add(Restrictions.eq("unique", filterAttribute.getUnique()));
		}
		if (filterAttribute.getEntity() != null) {
			searchCriteria.createAlias("entity", "entity_");
			searchCriteria.add(Restrictions.eq("entity_.id", filterAttribute.getEntity()));
		}
		if (filterAttribute.getType() != null) {
			searchCriteria.createAlias("type", "type_");
			searchCriteria.add(Restrictions.eq("type_.id", filterAttribute.getType()));
		}
		if (filterAttribute.getViewApproach() != null) {
			searchCriteria.createAlias("viewApproach", "viewApproach_");
			searchCriteria.add(Restrictions.eq("viewApproach_.id", filterAttribute.getViewApproach()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<Attribute> getAll(PaginationParams paginationParams, Client owner) {
		FilterAttribute filterAttribute = (FilterAttribute) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterAttribute.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterAttribute.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterAttribute.getName(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getDisplayName() != null) {
			searchCriteria.add(Restrictions.ilike("displayName", filterAttribute.getDisplayName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("displayName", filterAttribute.getDisplayName(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getMaxLen() != null) {
			searchCriteria.add(Restrictions.eq("maxLen", filterAttribute.getMaxLen()));
			countCriteria.add(Restrictions.eq("maxLen", filterAttribute.getMaxLen()));
		}				
		if (filterAttribute.getTableFieldName() != null) {
			searchCriteria.add(Restrictions.ilike("tableFieldName", filterAttribute.getTableFieldName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("tableFieldName", filterAttribute.getTableFieldName(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getMasc() != null) {
			searchCriteria.add(Restrictions.ilike("masc", filterAttribute.getMasc(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("masc", filterAttribute.getMasc(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getDefaultValue() != null) {
			searchCriteria.add(Restrictions.ilike("defaultValue", filterAttribute.getDefaultValue(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("defaultValue", filterAttribute.getDefaultValue(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getPlaceholder() != null) {
			searchCriteria.add(Restrictions.ilike("placeholder", filterAttribute.getPlaceholder(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("placeholder", filterAttribute.getPlaceholder(), MatchMode.ANYWHERE));
		}
		if (filterAttribute.getRequired() != null) {
			searchCriteria.add(Restrictions.eq("required", filterAttribute.getRequired()));
			countCriteria.add(Restrictions.eq("required", filterAttribute.getRequired()));
		}				
		if (filterAttribute.getUnique() != null) {
			searchCriteria.add(Restrictions.eq("unique", filterAttribute.getUnique()));
			countCriteria.add(Restrictions.eq("unique", filterAttribute.getUnique()));
		}				
		if (filterAttribute.getEntity() != null) {
			searchCriteria.createAlias("entity", "entity_");
			countCriteria.createAlias("entity", "entity_");
			searchCriteria.add(Restrictions.eq("entity_.id", filterAttribute.getEntity()));
			countCriteria.add(Restrictions.eq("entity_.id", filterAttribute.getEntity()));
		}
		if (filterAttribute.getType() != null) {
			searchCriteria.createAlias("type", "type_");
			countCriteria.createAlias("type", "type_");
			searchCriteria.add(Restrictions.eq("type_.id", filterAttribute.getType()));
			countCriteria.add(Restrictions.eq("type_.id", filterAttribute.getType()));
		}
		if (filterAttribute.getViewApproach() != null) {
			searchCriteria.createAlias("viewApproach", "viewApproach_");
			countCriteria.createAlias("viewApproach", "viewApproach_");
			searchCriteria.add(Restrictions.eq("viewApproach_.id", filterAttribute.getViewApproach()));
			countCriteria.add(Restrictions.eq("viewApproach_.id", filterAttribute.getViewApproach()));
		}
	return new Paginator<Attribute>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<Attribute> filter(PaginationParams paginationParams, Client owner) {
		List<Attribute> list = new ArrayList<Attribute>();
		FilterAttribute filterAttribute = (FilterAttribute) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterAttribute.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterAttribute.getName()));
		}
		if (filterAttribute.getDisplayName() != null) {
			searchCriteria.add(Restrictions.eq("displayName", filterAttribute.getDisplayName()));
		}
		if (filterAttribute.getMaxLen() != null) {
			searchCriteria.add(Restrictions.eq("maxLen", filterAttribute.getMaxLen()));
		}
		if (filterAttribute.getTableFieldName() != null) {
			searchCriteria.add(Restrictions.eq("tableFieldName", filterAttribute.getTableFieldName()));
		}
		if (filterAttribute.getMasc() != null) {
			searchCriteria.add(Restrictions.eq("masc", filterAttribute.getMasc()));
		}
		if (filterAttribute.getDefaultValue() != null) {
			searchCriteria.add(Restrictions.eq("defaultValue", filterAttribute.getDefaultValue()));
		}
		if (filterAttribute.getPlaceholder() != null) {
			searchCriteria.add(Restrictions.eq("placeholder", filterAttribute.getPlaceholder()));
		}
		if (filterAttribute.getRequired() != null) {
			searchCriteria.add(Restrictions.eq("required", filterAttribute.getRequired()));
		}
		if (filterAttribute.getUnique() != null) {
			searchCriteria.add(Restrictions.eq("unique", filterAttribute.getUnique()));
		}
		if (filterAttribute.getEntity() != null) {
			searchCriteria.createAlias("entity", "entity_");
			searchCriteria.add(Restrictions.eq("entity_.id", filterAttribute.getEntity()));
		}
		if (filterAttribute.getType() != null) {
			searchCriteria.createAlias("type", "type_");
			searchCriteria.add(Restrictions.eq("type_.id", filterAttribute.getType()));
		}
		if (filterAttribute.getViewApproach() != null) {
			searchCriteria.createAlias("viewApproach", "viewApproach_");
			searchCriteria.add(Restrictions.eq("viewApproach_.id", filterAttribute.getViewApproach()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
