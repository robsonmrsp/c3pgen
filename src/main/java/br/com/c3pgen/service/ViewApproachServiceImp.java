package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.ViewApproach;
import br.com.c3pgen.persistence.DaoViewApproach;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:48
**/

@Named
@Transactional
public class ViewApproachServiceImp implements ViewApproachService {

	private static final Logger LOGGER = Logger.getLogger(ViewApproachServiceImp.class);
	
	@Inject
	DaoViewApproach daoViewApproach;

	@Override
	public ViewApproach get(Integer id) {
		return daoViewApproach.find(id);
	}
	
	@Override
	public ViewApproach get(Integer id, Client client) {
		return daoViewApproach.find(id, client);
	}

	@Override
	public List<ViewApproach> all(Client client) {
		return daoViewApproach.getAll(client);
	}
	
	

	@Override
	public Pager<ViewApproach> all(PaginationParams paginationParams, Client owner) {
		Pagination<ViewApproach> pagination = daoViewApproach.getAll(paginationParams, owner);
		return new Pager<ViewApproach>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<ViewApproach> filter(PaginationParams paginationParams, Client owner) {
		List<ViewApproach> list = daoViewApproach.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<ViewApproach> all(PaginationParams paginationParams) {
		Pagination<ViewApproach> pagination = daoViewApproach.getAll(paginationParams);
		return new Pager<ViewApproach>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<ViewApproach> filter(PaginationParams paginationParams) {
		List<ViewApproach> list = daoViewApproach.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<ViewApproach> all() {
		return daoViewApproach.getAll();
	}

	@Override
	public List<ViewApproach> search(String description) {
		return new ArrayList<ViewApproach>();
	}
	
	public List<ViewApproach> last(LocalDateTime lastSyncDate){
		return daoViewApproach.last(lastSyncDate);
	}
			
	@Override
	public ViewApproach save(ViewApproach entity) {
		return daoViewApproach.save(entity);
	}

	@Override
	public ViewApproach update(ViewApproach entity) {
		return daoViewApproach.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoViewApproach.delete(id);
	}


}
