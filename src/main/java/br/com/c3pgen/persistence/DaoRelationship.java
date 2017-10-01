package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.filter.FilterRelationship;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;

/**
 * generated: 03/09/2015 14:51:48
 **/

@Named
@SuppressWarnings("rawtypes")
public class DaoRelationship extends AccessibleHibernateDao<Relationship> {
	private static final Logger LOGGER = Logger.getLogger(DaoRelationship.class);

	public DaoRelationship() {
		super(Relationship.class);
	}

	@Override
	public Pagination<Relationship> getAll(PaginationParams paginationParams) {
		FilterRelationship filterRelationship = (FilterRelationship) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterRelationship.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterRelationship.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterRelationship.getName(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getType() != null) {
			searchCriteria.add(Restrictions.ilike("type", filterRelationship.getType(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("type", filterRelationship.getType(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getDisplayName() != null) {
			searchCriteria.add(Restrictions.ilike("displayName", filterRelationship.getDisplayName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("displayName", filterRelationship.getDisplayName(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getOwnerName() != null) {
			searchCriteria.add(Restrictions.ilike("ownerName", filterRelationship.getOwnerName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("ownerName", filterRelationship.getOwnerName(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getModel() != null) {
			searchCriteria.add(Restrictions.ilike("model", filterRelationship.getModel(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("model", filterRelationship.getModel(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getUniDirecional() != null) {
			searchCriteria.add(Restrictions.eq("uniDirecional", filterRelationship.getUniDirecional()));
			countCriteria.add(Restrictions.eq("uniDirecional", filterRelationship.getUniDirecional()));
		}
		if (filterRelationship.getEntity() != null) {
			searchCriteria.createAlias("entity", "entity_");
			countCriteria.createAlias("entity", "entity_");
			searchCriteria.add(Restrictions.eq("entity_.id", filterRelationship.getEntity()));
			countCriteria.add(Restrictions.eq("entity_.id", filterRelationship.getEntity()));
		}
		if (filterRelationship.getViewApproach() != null) {
			searchCriteria.createAlias("viewApproach", "viewApproach_");
			countCriteria.createAlias("viewApproach", "viewApproach_");
			searchCriteria.add(Restrictions.eq("viewApproach_.id", filterRelationship.getViewApproach()));
			countCriteria.add(Restrictions.eq("viewApproach_.id", filterRelationship.getViewApproach()));
		}

		return new Paginator<Relationship>(searchCriteria, countCriteria).paginate(paginationParams);
	}

	public List<Relationship> filter(PaginationParams paginationParams) {
		List<Relationship> list = new ArrayList<Relationship>();
		FilterRelationship filterRelationship = (FilterRelationship) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterRelationship.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterRelationship.getName()));
		}
		if (filterRelationship.getType() != null) {
			searchCriteria.add(Restrictions.eq("type", filterRelationship.getType()));
		}
		if (filterRelationship.getDisplayName() != null) {
			searchCriteria.add(Restrictions.eq("displayName", filterRelationship.getDisplayName()));
		}
		if (filterRelationship.getOwnerName() != null) {
			searchCriteria.add(Restrictions.eq("ownerName", filterRelationship.getOwnerName()));
		}
		if (filterRelationship.getModel() != null) {
			searchCriteria.add(Restrictions.eq("model", filterRelationship.getModel()));
		}
		if (filterRelationship.getUniDirecional() != null) {
			searchCriteria.add(Restrictions.eq("uniDirecional", filterRelationship.getUniDirecional()));
		}
		if (filterRelationship.getEntity() != null) {
			searchCriteria.createAlias("entity", "entity_");
			searchCriteria.add(Restrictions.eq("entity_.id", filterRelationship.getEntity()));
		}
		if (filterRelationship.getViewApproach() != null) {
			searchCriteria.createAlias("viewApproach", "viewApproach_");
			searchCriteria.add(Restrictions.eq("viewApproach_.id", filterRelationship.getViewApproach()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}

	@Override
	public Pagination<Relationship> getAll(PaginationParams paginationParams, Client owner) {
		FilterRelationship filterRelationship = (FilterRelationship) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));

		if (filterRelationship.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterRelationship.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterRelationship.getName(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getType() != null) {
			searchCriteria.add(Restrictions.ilike("type", filterRelationship.getType(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("type", filterRelationship.getType(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getDisplayName() != null) {
			searchCriteria.add(Restrictions.ilike("displayName", filterRelationship.getDisplayName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("displayName", filterRelationship.getDisplayName(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getOwnerName() != null) {
			searchCriteria.add(Restrictions.ilike("ownerName", filterRelationship.getOwnerName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("ownerName", filterRelationship.getOwnerName(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getModel() != null) {
			searchCriteria.add(Restrictions.ilike("model", filterRelationship.getModel(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("model", filterRelationship.getModel(), MatchMode.ANYWHERE));
		}
		if (filterRelationship.getUniDirecional() != null) {
			searchCriteria.add(Restrictions.eq("uniDirecional", filterRelationship.getUniDirecional()));
			countCriteria.add(Restrictions.eq("uniDirecional", filterRelationship.getUniDirecional()));
		}
		if (filterRelationship.getEntity() != null) {
			searchCriteria.createAlias("entity", "entity_");
			countCriteria.createAlias("entity", "entity_");
			searchCriteria.add(Restrictions.eq("entity_.id", filterRelationship.getEntity()));
			countCriteria.add(Restrictions.eq("entity_.id", filterRelationship.getEntity()));
		}
		if (filterRelationship.getViewApproach() != null) {
			searchCriteria.createAlias("viewApproach", "viewApproach_");
			countCriteria.createAlias("viewApproach", "viewApproach_");
			searchCriteria.add(Restrictions.eq("viewApproach_.id", filterRelationship.getViewApproach()));
			countCriteria.add(Restrictions.eq("viewApproach_.id", filterRelationship.getViewApproach()));
		}
		return new Paginator<Relationship>(searchCriteria, countCriteria).paginate(paginationParams);
	}

	public List<Relationship> filter(PaginationParams paginationParams, Client owner) {
		List<Relationship> list = new ArrayList<Relationship>();
		FilterRelationship filterRelationship = (FilterRelationship) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterRelationship.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterRelationship.getName()));
		}
		if (filterRelationship.getType() != null) {
			searchCriteria.add(Restrictions.eq("type", filterRelationship.getType()));
		}
		if (filterRelationship.getDisplayName() != null) {
			searchCriteria.add(Restrictions.eq("displayName", filterRelationship.getDisplayName()));
		}
		if (filterRelationship.getOwnerName() != null) {
			searchCriteria.add(Restrictions.eq("ownerName", filterRelationship.getOwnerName()));
		}
		if (filterRelationship.getModel() != null) {
			searchCriteria.add(Restrictions.eq("model", filterRelationship.getModel()));
		}
		if (filterRelationship.getUniDirecional() != null) {
			searchCriteria.add(Restrictions.eq("uniDirecional", filterRelationship.getUniDirecional()));
		}
		if (filterRelationship.getEntity() != null) {
			searchCriteria.createAlias("entity", "entity_");
			searchCriteria.add(Restrictions.eq("entity_.id", filterRelationship.getEntity()));
		}
		if (filterRelationship.getViewApproach() != null) {
			searchCriteria.createAlias("viewApproach", "viewApproach_");
			searchCriteria.add(Restrictions.eq("viewApproach_.id", filterRelationship.getViewApproach()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}

	public Integer removeReverseRelationship(ApplicationEntity entity) {

		String hqlDelete = "delete from Relationship  where (id_entity = :entityId  or model = :entityName) and	id_client = :idClient";//

		// String hqlDeleteEntRel = "delete from rel_ent where ent_id = :entId
		// or ";//

		String hqlDeleteEntRel = "delete from rel_ent where ent_id = :entityId  or rel_id in(select id from Relationship  where (id_entity = :entityId  or model = :entityName) and	id_client = :idClient)";//

		Session session = getSession();

		int deletedEntitiesEntRel = session.createSQLQuery(hqlDeleteEntRel) //
				.setInteger("entityId", entity.getId())//
				.setInteger("idClient", entity.getOwner().getId())//
				.setString("entityName", entity.getName())//
				.executeUpdate();
		
		// int deletedEntitiesEntRel =
		// session.createSQLQuery(hqlDeleteEntRel).setInteger("entId",
		// entity.getId()).executeUpdate();

		// int deletedEntities =
		// session.createSQLQuery(hqlDelete).setInteger("idClient",
		// entity.getOwner().getId()).setInteger("entityId",
		// entity.getId()).executeUpdate();
		int deletedEntities = session.createSQLQuery(hqlDelete)//
				.setInteger("entityId", entity.getId())//
				.setInteger("idClient", entity.getOwner().getId())//
				.setString("entityName", entity.getName())//
				.executeUpdate();


		return deletedEntitiesEntRel;

	}

}
