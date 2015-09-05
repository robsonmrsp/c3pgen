package ${application.rootPackage}.persistence;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.joda.time.LocalDateTime;

import ${application.rootPackage}.model.Client;
import ${application.rootPackage}.persistence.pagination.Pagination;
import ${application.rootPackage}.persistence.pagination.PaginationParams;
import ${application.rootPackage}.persistence.pagination.Paginator;

//
@SuppressWarnings("unchecked")
public abstract class AccessibleHibernateDao<Entity> extends HibernateDao<Entity> {

	public AccessibleHibernateDao(Class<Entity> clazz) {
		super(clazz);
	}

	public List<Entity> getAll(Client owner) {
		List<Entity> entities = criteria().add(Restrictions.eq("owner", owner)).list();
		return entities;
	}

	public Entity find(Serializable key, Client owner) {
		Entity media = (Entity) criteria().add(Restrictions.eq("owner", owner)).add(Restrictions.eq("id", key)).uniqueResult();
		return media;
	}

	public Pagination<Entity> getAll(PaginationParams paginationParams, Client owner) {
		return new Paginator<Entity>(criteria().add(Restrictions.eq("owner", owner)), criteria().add(Restrictions.eq("owner", owner))).paginate(paginationParams);
	}

	public Pagination<Entity> searchByText(PaginationParams paginationParams, Client owner, String searchText, String field) {
		return new Paginator<Entity>(criteria().add(Restrictions.eq("owner", owner)), criteria().add(Restrictions.eq("owner", owner)).add(Restrictions.eq(field, searchText))).paginate(paginationParams);
	}

	public List<Entity> searchByText(String field, String searchText, Client owner) {
		return criteria().add(Restrictions.ilike(field, searchText, MatchMode.ANYWHERE)).add(Restrictions.eq("owner", owner)).list();
	}
}
