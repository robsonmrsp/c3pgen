package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.filter.FilterAttributeType;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;
/**
*  generated: 03/09/2015 14:51:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoAttributeType extends AccessibleHibernateDao<AttributeType> {
	private static final Logger LOGGER = Logger.getLogger(DaoAttributeType.class);

	public DaoAttributeType() {
		super(AttributeType.class);
	}

	@Override
	public Pagination<AttributeType> getAll(PaginationParams paginationParams) {
		FilterAttributeType filterAttributeType = (FilterAttributeType) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterAttributeType.getClassName() != null) {
			searchCriteria.add(Restrictions.ilike("className", filterAttributeType.getClassName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("className", filterAttributeType.getClassName(), MatchMode.ANYWHERE));
		}
		if (filterAttributeType.getFormat() != null) {
			searchCriteria.add(Restrictions.ilike("format", filterAttributeType.getFormat(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("format", filterAttributeType.getFormat(), MatchMode.ANYWHERE));
		}

		return new Paginator<AttributeType>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<AttributeType> filter(PaginationParams paginationParams) {
		List<AttributeType> list = new ArrayList<AttributeType>();
		FilterAttributeType filterAttributeType = (FilterAttributeType) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterAttributeType.getClassName() != null) {
			searchCriteria.add(Restrictions.eq("className", filterAttributeType.getClassName()));
		}
		if (filterAttributeType.getFormat() != null) {
			searchCriteria.add(Restrictions.eq("format", filterAttributeType.getFormat()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<AttributeType> getAll(PaginationParams paginationParams, Client owner) {
		FilterAttributeType filterAttributeType = (FilterAttributeType) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterAttributeType.getClassName() != null) {
			searchCriteria.add(Restrictions.ilike("className", filterAttributeType.getClassName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("className", filterAttributeType.getClassName(), MatchMode.ANYWHERE));
		}
		if (filterAttributeType.getFormat() != null) {
			searchCriteria.add(Restrictions.ilike("format", filterAttributeType.getFormat(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("format", filterAttributeType.getFormat(), MatchMode.ANYWHERE));
		}
	return new Paginator<AttributeType>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<AttributeType> filter(PaginationParams paginationParams, Client owner) {
		List<AttributeType> list = new ArrayList<AttributeType>();
		FilterAttributeType filterAttributeType = (FilterAttributeType) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterAttributeType.getClassName() != null) {
			searchCriteria.add(Restrictions.eq("className", filterAttributeType.getClassName()));
		}
		if (filterAttributeType.getFormat() != null) {
			searchCriteria.add(Restrictions.eq("format", filterAttributeType.getFormat()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
