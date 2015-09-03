package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Client;

import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.persistence.DaoRelationship;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.utils.DateUtil;
import br.com.c3pgen.utils.Util;

/**
*  generated: 03/09/2015 14:51:48
**/

@Named
@Transactional
public class RelationshipServiceImp implements RelationshipService {

	private static final Logger LOGGER = Logger.getLogger(RelationshipServiceImp.class);
	
	@Inject
	DaoRelationship daoRelationship;

	@Override
	public Relationship get(Integer id) {
		return daoRelationship.find(id);
	}
	
	@Override
	public Relationship get(Integer id, Client client) {
		return daoRelationship.find(id, client);
	}

	@Override
	public List<Relationship> all(Client client) {
		return daoRelationship.getAll(client);
	}
	
	

	@Override
	public Pager<Relationship> all(PaginationParams paginationParams, Client owner) {
		Pagination<Relationship> pagination = daoRelationship.getAll(paginationParams, owner);
		return new Pager<Relationship>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<Relationship> filter(PaginationParams paginationParams, Client owner) {
		List<Relationship> list = daoRelationship.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<Relationship> all(PaginationParams paginationParams) {
		Pagination<Relationship> pagination = daoRelationship.getAll(paginationParams);
		return new Pager<Relationship>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Relationship> filter(PaginationParams paginationParams) {
		List<Relationship> list = daoRelationship.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Relationship> all() {
		return daoRelationship.getAll();
	}

	@Override
	public List<Relationship> search(String description) {
		return new ArrayList<Relationship>();
	}
	
	public List<Relationship> last(LocalDateTime lastSyncDate){
		return daoRelationship.last(lastSyncDate);
	}
			
	@Override
	public Relationship save(Relationship entity) {
		return daoRelationship.save(entity);
	}

	@Override
	public Relationship update(Relationship entity) {
		return daoRelationship.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoRelationship.delete(id);
	}


}
