package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Client;

import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.persistence.DaoAttribute;
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
public class AttributeServiceImp implements AttributeService {

	private static final Logger LOGGER = Logger.getLogger(AttributeServiceImp.class);
	
	@Inject
	DaoAttribute daoAttribute;

	@Override
	public Attribute get(Integer id) {
		return daoAttribute.find(id);
	}
	
	@Override
	public Attribute get(Integer id, Client client) {
		return daoAttribute.find(id, client);
	}

	@Override
	public List<Attribute> all(Client client) {
		return daoAttribute.getAll(client);
	}
	
	

	@Override
	public Pager<Attribute> all(PaginationParams paginationParams, Client owner) {
		Pagination<Attribute> pagination = daoAttribute.getAll(paginationParams, owner);
		return new Pager<Attribute>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<Attribute> filter(PaginationParams paginationParams, Client owner) {
		List<Attribute> list = daoAttribute.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<Attribute> all(PaginationParams paginationParams) {
		Pagination<Attribute> pagination = daoAttribute.getAll(paginationParams);
		return new Pager<Attribute>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Attribute> filter(PaginationParams paginationParams) {
		List<Attribute> list = daoAttribute.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Attribute> all() {
		return daoAttribute.getAll();
	}

	@Override
	public List<Attribute> search(String description) {
		return new ArrayList<Attribute>();
	}
	
	public List<Attribute> last(LocalDateTime lastSyncDate){
		return daoAttribute.last(lastSyncDate);
	}
			
	@Override
	public Attribute save(Attribute entity) {
		return daoAttribute.save(entity);
	}

	@Override
	public Attribute update(Attribute entity) {
		return daoAttribute.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoAttribute.delete(id);
	}


}
