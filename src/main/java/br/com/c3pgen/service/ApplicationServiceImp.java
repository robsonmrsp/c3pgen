package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.persistence.DaoApplication;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:47
**/

@Named
@Transactional
public class ApplicationServiceImp implements ApplicationService {

	private static final Logger LOGGER = Logger.getLogger(ApplicationServiceImp.class);
	
	@Inject
	DaoApplication daoApplication;

	@Override
	public Application get(Integer id) {
		return daoApplication.find(id);
	}
	
	@Override
	public Application get(Integer id, Client client) {
		return daoApplication.find(id, client);
	}

	@Override
	public List<Application> all(Client client) {
		return daoApplication.getAll(client);
	}
	
	

	@Override
	public Pager<Application> all(PaginationParams paginationParams, Client owner) {
		Pagination<Application> pagination = daoApplication.getAll(paginationParams, owner);
		return new Pager<Application>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<Application> filter(PaginationParams paginationParams, Client owner) {
		List<Application> list = daoApplication.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<Application> all(PaginationParams paginationParams) {
		Pagination<Application> pagination = daoApplication.getAll(paginationParams);
		return new Pager<Application>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Application> filter(PaginationParams paginationParams) {
		List<Application> list = daoApplication.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Application> all() {
		return daoApplication.getAll();
	}

	@Override
	public List<Application> search(String description) {
		return new ArrayList<Application>();
	}
	
	public List<Application> last(LocalDateTime lastSyncDate){
		return daoApplication.last(lastSyncDate);
	}
			
	@Override
	public Application save(Application entity) {
		return daoApplication.save(entity);
	}

	@Override
	public Application update(Application entity) {
		return daoApplication.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoApplication.delete(id);
	}


}
