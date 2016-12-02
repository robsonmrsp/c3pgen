package br.com.c3pgen.service;

import java.util.List;
import java.util.Set;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.filter.FilterApplicationRelationship;
import br.com.c3pgen.persistence.DaoApplicationRelationship;

@Named
@Transactional
public class ApplicationRelationshipServiceImp implements ApplicationRelationshipService {

	@Inject
	DaoApplicationRelationship daoApplicationRelationship;

	@Override
	public void removeAllByApplication(Application application) {
		Set<ApplicationRelationship> applicationRelationships = application.getApplicationRelationships();
		
		daoApplicationRelationship.deleteByApplication(application);
	}

	@Override
	public Boolean delete(Integer id) {
		
		return daoApplicationRelationship.delete(id);
	}

	@Override
	public List<ApplicationRelationship> filter(FilterApplicationRelationship filter) {
		return daoApplicationRelationship.filter(filter);
	}

	@Override
	public void deleteByEntity(Integer id) {
		FilterApplicationRelationship filterApplicationRelationship = new FilterApplicationRelationship();
		filterApplicationRelationship.setEntity(id);

		List<ApplicationRelationship> filter = filter(filterApplicationRelationship);
		for (ApplicationRelationship applicationRelationship : filter) {
			delete(applicationRelationship.getId());
		}
	}
}
