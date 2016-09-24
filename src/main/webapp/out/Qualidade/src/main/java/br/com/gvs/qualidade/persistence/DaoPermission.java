package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Permission;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterPermission;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Permission;
/**
*  generated: 24/09/2016 11:56:38
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoPermission extends AccessibleHibernateDao<Permission> {
	private static final Logger LOGGER = Logger.getLogger(DaoPermission.class);

	public DaoPermission() {
		super(Permission.class);
	}

	@Override
	public Pagination<Permission> getAll(PaginationParams paginationParams) {
		FilterPermission filterPermission = (FilterPermission) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterPermission.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterPermission.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterPermission.getName(), MatchMode.ANYWHERE));
		}
		if (filterPermission.getOperation() != null) {
			searchCriteria.createAlias("operation", "operation_");
			countCriteria.createAlias("operation", "operation_");
			searchCriteria.add(Restrictions.eq("operation_.id", filterPermission.getOperation()));
			countCriteria.add(Restrictions.eq("operation_.id", filterPermission.getOperation()));
		}
		if (filterPermission.getItem() != null) {
			searchCriteria.createAlias("item", "item_");
			countCriteria.createAlias("item", "item_");
			searchCriteria.add(Restrictions.eq("item_.id", filterPermission.getItem()));
			countCriteria.add(Restrictions.eq("item_.id", filterPermission.getItem()));
		}

		return new Paginator<Permission>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Permission> filter(PaginationParams paginationParams) {
		List<Permission> list = new ArrayList<Permission>();
		FilterPermission filterPermission = (FilterPermission) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterPermission.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterPermission.getName()));
		}
		if (filterPermission.getOperation() != null) {
			searchCriteria.createAlias("operation", "operation_");
			searchCriteria.add(Restrictions.eq("operation_.id", filterPermission.getOperation()));
		}
		if (filterPermission.getItem() != null) {
			searchCriteria.createAlias("item", "item_");
			searchCriteria.add(Restrictions.eq("item_.id", filterPermission.getItem()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
