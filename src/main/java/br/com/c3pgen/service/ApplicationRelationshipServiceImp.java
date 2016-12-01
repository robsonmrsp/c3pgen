package br.com.c3pgen.service;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.persistence.DaoApplicationRelationship;

@Named
@Transactional
public class ApplicationRelationshipServiceImp implements ApplicationRelationshipService {

	@Inject
	DaoApplicationRelationship daoApplicationRelationship;

	@Override
	public void removeAllByApplication(Application application) {
		daoApplicationRelationship.deleteByApplication(application);
	}

	@Override
	public Boolean delete(Integer id) {
		// TODO Auto-generated method stub
		return daoApplicationRelationship.delete(id);
	}
}
