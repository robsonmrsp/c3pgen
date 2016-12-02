package br.com.c3pgen.service;

import java.util.List;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.filter.FilterApplicationRelationship;

public interface ApplicationRelationshipService {

	void removeAllByApplication(Application application);

	Boolean delete(Integer id);

	public List<ApplicationRelationship> filter(FilterApplicationRelationship filter);

	void deleteByEntity(Integer id);

}
