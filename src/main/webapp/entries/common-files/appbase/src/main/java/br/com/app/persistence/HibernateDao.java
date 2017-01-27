package ${application.corePackage}.persistence;

import java.io.Serializable;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.joda.time.LocalDateTime;

import ${application.corePackage}.persistence.HibernateDao;import ${application.corePackage}.persistence.pagination.Pagination;import ${application.corePackage}.persistence.pagination.PaginationParams;import ${application.corePackage}.persistence.pagination.Paginator;

@SuppressWarnings("unchecked")
public class HibernateDao<Entity> {

	private static final Logger LOGGER = Logger.getLogger(HibernateDao.class);

	private Class<Entity> clazz;

	public HibernateDao(Class<Entity> clazz) {
		this.clazz = clazz;
	}

	@Inject
	SessionFactory sessionFactory;

	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public Entity find(Serializable key) {
		if (key == null) {
			return null;
		}
		return (Entity) sessionFactory.getCurrentSession().get(clazz, key);
	}

	public List<Entity> getAll() {
		LOGGER.warn("Aparentemente voce está tentando fazer uma consulta FULL SCAN. Por efeitos de performance, estamos limitando essa consulta aos primeiros 100 registos.");
		List<Entity> entities = sessionFactory.getCurrentSession().createCriteria(clazz).setMaxResults(100).list();
		return entities;
	}

	public Pagination<Entity> getAll(PaginationParams paginationParams) {
		return new Paginator<Entity>(criteria(), criteria()).paginate(paginationParams);
	}

	public Entity save(Entity entity) {
		Session currentSession = sessionFactory.getCurrentSession();
		currentSession.merge(entity);
		return entity;
	}


	public Boolean delete(Serializable entityId) {
		Entity entity = find(entityId);
		if (entity != null) {
			sessionFactory.getCurrentSession().delete(entity);
			sessionFactory.getCurrentSession().flush();
		}
		return Boolean.TRUE;
	}

	public Criteria criteria() {
		return sessionFactory.getCurrentSession().createCriteria(clazz);
	}

	public Query query(String hql) {
		return getSession().createQuery(hql);
	}

	public SQLQuery nativeQuery(String nativeSql) {
		return getSession().createSQLQuery(nativeSql);
	}

	public List<Entity> last(LocalDateTime dateTime) {
		List<Entity> list = new ArrayList<Entity>();
		Criteria searchCriteria = criteria();

		searchCriteria.add(Restrictions.gt("lastUpdateDatetime", dateTime));
		searchCriteria.setMaxResults(1000);

		try {
			list.addAll(searchCriteria.list());
		} catch (Exception e) {
			LOGGER.error("Error searching last changed registers...", e);
		}
		return list;
	}

}
