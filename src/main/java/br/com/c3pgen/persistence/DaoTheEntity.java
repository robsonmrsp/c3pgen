package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.TheEntity;
import br.com.c3pgen.model.filter.FilterTheEntity;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;
/**
*  generated: 03/09/2015 14:51:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoTheEntity extends AccessibleHibernateDao<TheEntity> {
	private static final Logger LOGGER = Logger.getLogger(DaoTheEntity.class);

	public DaoTheEntity() {
		super(TheEntity.class);
	}

	@Override
	public Pagination<TheEntity> getAll(PaginationParams paginationParams) {
		FilterTheEntity filterTheEntity = (FilterTheEntity) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterTheEntity.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterTheEntity.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterTheEntity.getName(), MatchMode.ANYWHERE));
		}
		if (filterTheEntity.getDisplayName() != null) {
			searchCriteria.add(Restrictions.ilike("displayName", filterTheEntity.getDisplayName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("displayName", filterTheEntity.getDisplayName(), MatchMode.ANYWHERE));
		}
		if (filterTheEntity.getTableName() != null) {
			searchCriteria.add(Restrictions.ilike("tableName", filterTheEntity.getTableName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("tableName", filterTheEntity.getTableName(), MatchMode.ANYWHERE));
		}
		if (filterTheEntity.getHasOwner() != null) {
			searchCriteria.add(Restrictions.eq("hasOwner", filterTheEntity.getHasOwner()));
			countCriteria.add(Restrictions.eq("hasOwner", filterTheEntity.getHasOwner()));
		}				
		if (filterTheEntity.getHasMobile() != null) {
			searchCriteria.add(Restrictions.eq("hasMobile", filterTheEntity.getHasMobile()));
			countCriteria.add(Restrictions.eq("hasMobile", filterTheEntity.getHasMobile()));
		}				
		if (filterTheEntity.getApplication() != null) {
			searchCriteria.createAlias("application", "application_");
			countCriteria.createAlias("application", "application_");
			searchCriteria.add(Restrictions.eq("application_.id", filterTheEntity.getApplication()));
			countCriteria.add(Restrictions.eq("application_.id", filterTheEntity.getApplication()));
		}

		return new Paginator<TheEntity>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<TheEntity> filter(PaginationParams paginationParams) {
		List<TheEntity> list = new ArrayList<TheEntity>();
		FilterTheEntity filterTheEntity = (FilterTheEntity) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterTheEntity.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterTheEntity.getName()));
		}
		if (filterTheEntity.getDisplayName() != null) {
			searchCriteria.add(Restrictions.eq("displayName", filterTheEntity.getDisplayName()));
		}
		if (filterTheEntity.getTableName() != null) {
			searchCriteria.add(Restrictions.eq("tableName", filterTheEntity.getTableName()));
		}
		if (filterTheEntity.getHasOwner() != null) {
			searchCriteria.add(Restrictions.eq("hasOwner", filterTheEntity.getHasOwner()));
		}
		if (filterTheEntity.getHasMobile() != null) {
			searchCriteria.add(Restrictions.eq("hasMobile", filterTheEntity.getHasMobile()));
		}
		if (filterTheEntity.getApplication() != null) {
			searchCriteria.createAlias("application", "application_");
			searchCriteria.add(Restrictions.eq("application_.id", filterTheEntity.getApplication()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<TheEntity> getAll(PaginationParams paginationParams, Client owner) {
		FilterTheEntity filterTheEntity = (FilterTheEntity) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterTheEntity.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterTheEntity.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterTheEntity.getName(), MatchMode.ANYWHERE));
		}
		if (filterTheEntity.getDisplayName() != null) {
			searchCriteria.add(Restrictions.ilike("displayName", filterTheEntity.getDisplayName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("displayName", filterTheEntity.getDisplayName(), MatchMode.ANYWHERE));
		}
		if (filterTheEntity.getTableName() != null) {
			searchCriteria.add(Restrictions.ilike("tableName", filterTheEntity.getTableName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("tableName", filterTheEntity.getTableName(), MatchMode.ANYWHERE));
		}
		if (filterTheEntity.getHasOwner() != null) {
			searchCriteria.add(Restrictions.eq("hasOwner", filterTheEntity.getHasOwner()));
			countCriteria.add(Restrictions.eq("hasOwner", filterTheEntity.getHasOwner()));
		}				
		if (filterTheEntity.getHasMobile() != null) {
			searchCriteria.add(Restrictions.eq("hasMobile", filterTheEntity.getHasMobile()));
			countCriteria.add(Restrictions.eq("hasMobile", filterTheEntity.getHasMobile()));
		}				
		if (filterTheEntity.getApplication() != null) {
			searchCriteria.createAlias("application", "application_");
			countCriteria.createAlias("application", "application_");
			searchCriteria.add(Restrictions.eq("application_.id", filterTheEntity.getApplication()));
			countCriteria.add(Restrictions.eq("application_.id", filterTheEntity.getApplication()));
		}
	return new Paginator<TheEntity>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<TheEntity> filter(PaginationParams paginationParams, Client owner) {
		List<TheEntity> list = new ArrayList<TheEntity>();
		FilterTheEntity filterTheEntity = (FilterTheEntity) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterTheEntity.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterTheEntity.getName()));
		}
		if (filterTheEntity.getDisplayName() != null) {
			searchCriteria.add(Restrictions.eq("displayName", filterTheEntity.getDisplayName()));
		}
		if (filterTheEntity.getTableName() != null) {
			searchCriteria.add(Restrictions.eq("tableName", filterTheEntity.getTableName()));
		}
		if (filterTheEntity.getHasOwner() != null) {
			searchCriteria.add(Restrictions.eq("hasOwner", filterTheEntity.getHasOwner()));
		}
		if (filterTheEntity.getHasMobile() != null) {
			searchCriteria.add(Restrictions.eq("hasMobile", filterTheEntity.getHasMobile()));
		}
		if (filterTheEntity.getApplication() != null) {
			searchCriteria.createAlias("application", "application_");
			searchCriteria.add(Restrictions.eq("application_.id", filterTheEntity.getApplication()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
