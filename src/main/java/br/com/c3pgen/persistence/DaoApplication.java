package br.com.c3pgen.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.filter.FilterApplication;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Client;
/**
*  generated: 30/08/2015 20:23:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoApplication extends AccessibleHibernateDao<Application> {
	private static final Logger LOGGER = Logger.getLogger(DaoApplication.class);

	public DaoApplication() {
		super(Application.class);
	}
	public Application findBySkin(String skin) {
		Application application = null;
		try {
			application = (Application) criteria().add(Restrictions.eq("skin", skin)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Application pelo skin," + skin, e);
		}
		return application;
	}
	public Application findByRootPackage(String rootPackage) {
		Application application = null;
		try {
			application = (Application) criteria().add(Restrictions.eq("rootPackage", rootPackage)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Application pelo rootPackage," + rootPackage, e);
		}
		return application;
	}

	@Override
	public Pagination<Application> getAll(PaginationParams paginationParams) {
		FilterApplication filterApplication = (FilterApplication) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterApplication.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterApplication.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterApplication.getName(), MatchMode.ANYWHERE));
		}
		if (filterApplication.getSkin() != null) {
			searchCriteria.add(Restrictions.ilike("skin", filterApplication.getSkin(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("skin", filterApplication.getSkin(), MatchMode.ANYWHERE));
		}
		if (filterApplication.getRootPackage() != null) {
			searchCriteria.add(Restrictions.ilike("rootPackage", filterApplication.getRootPackage(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("rootPackage", filterApplication.getRootPackage(), MatchMode.ANYWHERE));
		}

		return new Paginator<Application>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Application> filter(PaginationParams paginationParams) {
		List<Application> list = new ArrayList<Application>();
		FilterApplication filterApplication = (FilterApplication) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterApplication.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterApplication.getName()));
		}
		if (filterApplication.getSkin() != null) {
			searchCriteria.add(Restrictions.eq("skin", filterApplication.getSkin()));
		}
		if (filterApplication.getRootPackage() != null) {
			searchCriteria.add(Restrictions.eq("rootPackage", filterApplication.getRootPackage()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<Application> getAll(PaginationParams paginationParams, Client owner) {
		FilterApplication filterApplication = (FilterApplication) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterApplication.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterApplication.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterApplication.getName(), MatchMode.ANYWHERE));
		}
		if (filterApplication.getSkin() != null) {
			searchCriteria.add(Restrictions.ilike("skin", filterApplication.getSkin(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("skin", filterApplication.getSkin(), MatchMode.ANYWHERE));
		}
		if (filterApplication.getRootPackage() != null) {
			searchCriteria.add(Restrictions.ilike("rootPackage", filterApplication.getRootPackage(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("rootPackage", filterApplication.getRootPackage(), MatchMode.ANYWHERE));
		}
	return new Paginator<Application>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<Application> filter(PaginationParams paginationParams, Client owner) {
		List<Application> list = new ArrayList<Application>();
		FilterApplication filterApplication = (FilterApplication) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterApplication.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterApplication.getName()));
		}
		if (filterApplication.getSkin() != null) {
			searchCriteria.add(Restrictions.eq("skin", filterApplication.getSkin()));
		}
		if (filterApplication.getRootPackage() != null) {
			searchCriteria.add(Restrictions.eq("rootPackage", filterApplication.getRootPackage()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
