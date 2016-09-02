package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Session;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterSession;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Session;
/**
*  generated: 02/09/2016 16:23:49
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoSession extends AccessibleHibernateDao<Session> {
	private static final Logger LOGGER = Logger.getLogger(DaoSession.class);

	public DaoSession() {
		super(Session.class);
	}

	@Override
	public Pagination<Session> getAll(PaginationParams paginationParams) {
		FilterSession filterSession = (FilterSession) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterSession.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterSession.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterSession.getName(), MatchMode.ANYWHERE));
		}
		if (filterSession.getCreationDate() != null) {
			searchCriteria.add(Restrictions.eq("creationDate", filterSession.getCreationDate()));
			countCriteria.add(Restrictions.eq("creationDate", filterSession.getCreationDate()));
		}				
		if (filterSession.getUser() != null) {
			searchCriteria.createAlias("user", "user_");
			countCriteria.createAlias("user", "user_");
			searchCriteria.add(Restrictions.eq("user_.id", filterSession.getUser()));
			countCriteria.add(Restrictions.eq("user_.id", filterSession.getUser()));
		}

		return new Paginator<Session>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Session> filter(PaginationParams paginationParams) {
		List<Session> list = new ArrayList<Session>();
		FilterSession filterSession = (FilterSession) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterSession.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterSession.getName()));
		}
		if (filterSession.getCreationDate() != null) {
			searchCriteria.add(Restrictions.eq("creationDate", filterSession.getCreationDate()));
		}
		if (filterSession.getUser() != null) {
			searchCriteria.createAlias("user", "user_");
			searchCriteria.add(Restrictions.eq("user_.id", filterSession.getUser()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
