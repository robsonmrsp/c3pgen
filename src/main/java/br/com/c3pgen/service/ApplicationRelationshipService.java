package br.com.c3pgen.service;

import br.com.c3pgen.model.Application;

public interface ApplicationRelationshipService {

	void removeAllByApplication(Application application);

	Boolean delete(Integer id);

}
