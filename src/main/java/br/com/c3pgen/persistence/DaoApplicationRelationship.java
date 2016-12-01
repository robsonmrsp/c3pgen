package br.com.c3pgen.persistence;

import javax.inject.Named;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationRelationship;

@Named
public class DaoApplicationRelationship extends AccessibleHibernateDao<ApplicationRelationship> {

	public DaoApplicationRelationship() {
		super(ApplicationRelationship.class);
	}

	public void deleteByApplication(Application application) {
		String hql = "delete from Student where classId= :classId";
		// CriteriaQueryTypeQueryAdapter<X>(hql).setString("classId",
		// classId).executeUpdate();

	}

}
