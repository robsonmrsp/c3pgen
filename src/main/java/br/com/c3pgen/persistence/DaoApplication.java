package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.Column;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.filter.FilterApplication;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;

/**
 * generated: 03/09/2015 14:51:47
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
			LOGGER.error("Erro ao obter Aplicação pelo skin," + skin, e);
		}
		return application;
	}

	public Application findByRootPackage(String rootPackage) {
		Application application = null;
		try {
			application = (Application) criteria().add(Restrictions.eq("rootPackage", rootPackage)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Aplicação pelo rootPackage," + rootPackage, e);
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
		if (filterApplication.getDescription() != null) {
			searchCriteria.add(Restrictions.ilike("description", filterApplication.getDescription(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("description", filterApplication.getDescription(), MatchMode.ANYWHERE));
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
		if (filterApplication.getDescription() != null) {
			searchCriteria.add(Restrictions.eq("description", filterApplication.getDescription()));
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
		if (filterApplication.getDescription() != null) {
			searchCriteria.add(Restrictions.ilike("description", filterApplication.getDescription(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("description", filterApplication.getDescription(), MatchMode.ANYWHERE));
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
		if (filterApplication.getDescription() != null) {
			searchCriteria.add(Restrictions.eq("description", filterApplication.getDescription()));
		}
		if (filterApplication.getRootPackage() != null) {
			searchCriteria.add(Restrictions.eq("rootPackage", filterApplication.getRootPackage()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}

	public Application saveOnlyApplication(Application application) {
		String hqlUpdate = "update Application c 		"//
				+ "	set  c.appName = :appName ,				"//
				+ "      c.skin = :skin, 				"//
				+ "      c.description = :description , 	"//
				+ "      c.rootPackage = :rootPackage , 	"//
				+ "      c.corePackage = :corePackage ,	"//

				+ "      c.configurationType = :configurationType ,	"//
				+ "      c.applicationType = :applicationType ,	"//
				+ "      c.persistenceFramework = :persistenceFramework ,	"//
				+ "      c.multitenancy = :multitenancy ,	"//
				+ "      c.useAudit = :useAudit	, "//
				
				+ "      c.generateTest = :generateTest ,	"//
				+ "      c.asModule = :asModule	"//
				+ " where c.id= :id";//
		Session session = getSession();
		
		

		int updatedEntities = session.createQuery(hqlUpdate)//
				.setString("appName", application.getAppName())//
				.setString("description", application.getDescription())//
				.setString("persistenceFramework", application.getPersistenceFramework())//
				.setString("skin", application.getSkin())//
				.setString("rootPackage", application.getRootPackage())//
				.setString("corePackage", application.getCorePackage())//
				.setBoolean("multitenancy", application.getMultitenancy())//
				.setBoolean("useAudit", application.getUseAudit())//
				.setBoolean("generateTest", application.getGenerateTest())//
				.setBoolean("asModule", application.getAsModule())//
				.setString("configurationType", application.getConfigurationType().name())//
				.setString("applicationType", application.getApplicationType().name())//
				.setInteger("id", application.getId())//
				.executeUpdate();
		return application;
	}

}
