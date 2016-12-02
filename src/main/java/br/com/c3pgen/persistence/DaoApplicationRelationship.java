package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.filter.FilterApplicationRelationship;

@Named
public class DaoApplicationRelationship extends AccessibleHibernateDao<ApplicationRelationship> {

	public DaoApplicationRelationship() {
		super(ApplicationRelationship.class);
	}

	public void deleteByApplication(Application application) {
		if (application.getId() != null) {
			Query delete = getSession().createQuery("delete ApplicationRelationship where application.id = " + application.getId());
			delete.executeUpdate();
		}
	}

	public List<ApplicationRelationship> filter(FilterApplicationRelationship filter) {
		List<ApplicationRelationship> list = new ArrayList<ApplicationRelationship>();

		Criteria searchCriteria = criteria();

		if (filter.getEntity() != null) {
			searchCriteria.createAlias("source", "source_");
			searchCriteria.createAlias("source_.entity", "source_entity_");

			searchCriteria.createAlias("target", "target_");
			searchCriteria.createAlias("target_.entity", "target_entity_");

			searchCriteria.add(Restrictions.or(Restrictions.eq("source_entity_.id", filter.getEntity()), Restrictions.eq("target_entity_.id", filter.getEntity())));

		}

		list.addAll(searchCriteria.list());

		return list;
	}
}
