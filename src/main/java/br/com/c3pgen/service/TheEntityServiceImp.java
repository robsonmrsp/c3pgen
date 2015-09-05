package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.TheEntity;
import br.com.c3pgen.persistence.DaoTheEntity;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:48
**/

@Named
@Transactional
public class TheEntityServiceImp implements TheEntityService {

	private static final Logger LOGGER = Logger.getLogger(TheEntityServiceImp.class);
	
	@Inject
	DaoTheEntity daoTheEntity;

	@Override
	public TheEntity get(Integer id) {
		return daoTheEntity.find(id);
	}
	
	@Override
	public TheEntity get(Integer id, Client client) {
		return daoTheEntity.find(id, client);
	}

	@Override
	public List<TheEntity> all(Client client) {
		return daoTheEntity.getAll(client);
	}
	
	

	@Override
	public Pager<TheEntity> all(PaginationParams paginationParams, Client owner) {
		Pagination<TheEntity> pagination = daoTheEntity.getAll(paginationParams, owner);
		return new Pager<TheEntity>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<TheEntity> filter(PaginationParams paginationParams, Client owner) {
		List<TheEntity> list = daoTheEntity.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<TheEntity> all(PaginationParams paginationParams) {
		Pagination<TheEntity> pagination = daoTheEntity.getAll(paginationParams);
		return new Pager<TheEntity>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<TheEntity> filter(PaginationParams paginationParams) {
		List<TheEntity> list = daoTheEntity.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<TheEntity> all() {
		return daoTheEntity.getAll();
	}

	@Override
	public List<TheEntity> search(String description) {
		return new ArrayList<TheEntity>();
	}
	
	public List<TheEntity> last(LocalDateTime lastSyncDate){
		return daoTheEntity.last(lastSyncDate);
	}
			
	@Override
	public TheEntity save(TheEntity entity) {
		return daoTheEntity.save(entity);
	}

	@Override
	public TheEntity update(TheEntity entity) {
		return daoTheEntity.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoTheEntity.delete(id);
	}


}
