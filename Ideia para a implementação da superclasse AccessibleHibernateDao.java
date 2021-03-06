package br.com.locadora.core.persistence;

import java.io.Serializable;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.locadora.core.model.Owner;
import br.com.locadora.core.persistence.pagination.Pagination;
import br.com.locadora.core.persistence.pagination.PaginationParams;
import br.com.locadora.core.persistence.pagination.Paginator;

/* generated by JSetup v0.95 :  at 07/09/2017 22:00:40 */
@SuppressWarnings("unchecked")
public abstract class AccessibleHibernateDao<Filter, Entity> extends HibernateDao<Entity> {

	public AccessibleHibernateDao(Class<Entity> clazz) {
		super(clazz);
	}

	public List<Entity> getAll(Owner owner) {
		List<Entity> entities = criteria().add(Restrictions.eq("owner", owner)).list();
		return entities;
	}

	public Pagination<Entity> getAll(PaginationParams<Filter> paginationParams) {
		Filter filter = (Filter) paginationParams.getFilter();
		Criteria searchCriteria = prepareIlikeCriteria(filter);
		Criteria countCriteria = prepareIlikeCriteria(filter);

		return new Paginator<Entity>(searchCriteria, countCriteria).paginate(paginationParams);
	}

	public List<Entity> filter(PaginationParams<Filter> paginationParams, Boolean equals) {
		List<Entity> list = new ArrayList<Entity>();
		Filter filter = (Filter) paginationParams.getFilter();

		return filter(filter, equals);
	}

	public List<Entity> filter(Filter filter, Boolean equals) {
		if (equals) {
			return filterEqual(filter);
		} else {
			return filterAlike(filter);
		}
	}

	public List<Entity> filterEqual(Filter filter) {
		List<Entity> list = new ArrayList<Entity>();
		Criteria searchCriteria = prepareEquCriteria(filter);

		// max 100 rows
		list.addAll(searchCriteria.setMaxResults(100).list());
		return list;
	}

	public List<Entity> filterAlike(Filter filter) {
		List<Entity> list = new ArrayList<Entity>();
		Criteria searchCriteria = prepareIlikeCriteria(filter);

		// max 100 rows
		list.addAll(searchCriteria.setMaxResults(100).list());
		return list;
	}

	public Pagination<Entity> getAll(PaginationParams<Filter> paginationParams, Owner owner) {
		Filter filter = (Filter) paginationParams.getFilter();
		Criteria searchCriteria = prepareIlikeCriteria(filter);
		Criteria countCriteria = prepareIlikeCriteria(filter);

		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));

		return new Paginator<Entity>(searchCriteria, countCriteria).paginate(paginationParams);
	}

	public List<Entity> filter(PaginationParams<Filter> paginationParams, Owner owner) {
		List<Entity> list = new ArrayList<Entity>();
		Filter filter = (Filter) paginationParams.getFilter();
		Criteria searchCriteria = prepareEquCriteria(filter);

		searchCriteria.add(Restrictions.eq("owner", owner));

		list.addAll(searchCriteria.list());
		return list;
	}

	public List<Entity> filter(PaginationParams<Filter> paginationParams, Owner owner, Boolean equals) {
		List<Entity> list = new ArrayList<Entity>();
		Filter filter = (Filter) paginationParams.getFilter();

		return filter(filter, owner, equals);
	}

	public List<Entity> filter(Filter filter, Owner owner, Boolean equals) {
		if (equals) {
			return filterEqual(filter, owner);
		} else {
			return filterAlike(filter, owner);
		}
	}

	public List<Entity> filterEqual(Filter filter, Owner owner) {
		List<Entity> list = new ArrayList<Entity>();
		Criteria searchCriteria = prepareEquCriteria(filter);
		searchCriteria.add(Restrictions.eq("owner", owner));

		// max 100 rows
		list.addAll(searchCriteria.setMaxResults(100).list());
		return list;
	}

	public List<Entity> filterAlike(Filter filter, Owner owner) {
		List<Entity> list = new ArrayList<Entity>();
		Criteria searchCriteria = prepareIlikeCriteria(filter);
		searchCriteria.add(Restrictions.eq("owner", owner));

		// max 100 rows
		list.addAll(searchCriteria.setMaxResults(100).list());
		return list;
	}

	public Entity find(Serializable key, Owner owner) {
		Entity media = (Entity) criteria().add(Restrictions.eq("owner", owner)).add(Restrictions.eq("id", key)).uniqueResult();
		return media;
	}

	public Pagination<Entity> searchByText(PaginationParams<Filter> paginationParams, Owner owner, String searchText, String field) {
		return new Paginator<Entity>(criteria().add(Restrictions.eq("owner", owner)), criteria().add(Restrictions.eq("owner", owner)).add(Restrictions.eq(field, searchText))).paginate(paginationParams);
	}

	public List<Entity> searchByText(String field, String searchText, Owner owner) {
		return criteria().add(Restrictions.ilike(field, searchText, MatchMode.ANYWHERE)).add(Restrictions.eq("owner", owner)).list();
	}

	protected abstract Criteria prepareIlikeCriteria(Filter filter);

	protected abstract Criteria prepareEquCriteria(Filter filter);

}
