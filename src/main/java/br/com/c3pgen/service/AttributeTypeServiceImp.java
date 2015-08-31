package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Client;

import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.persistence.DaoAttributeType;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.utils.DateUtil;
import br.com.c3pgen.utils.Util;

/**
*  generated: 30/08/2015 20:23:12
**/

@Named
@Transactional
public class AttributeTypeServiceImp implements AttributeTypeService {

	private static final Logger LOGGER = Logger.getLogger(AttributeTypeServiceImp.class);
	
	@Inject
	DaoAttributeType daoAttributeType;

	@Override
	public AttributeType get(Integer id) {
		return daoAttributeType.find(id);
	}
	
	@Override
	public AttributeType get(Integer id, Client client) {
		return daoAttributeType.find(id, client);
	}

	@Override
	public List<AttributeType> all(Client client) {
		return daoAttributeType.getAll(client);
	}
	
	

	@Override
	public Pager<AttributeType> all(PaginationParams paginationParams, Client owner) {
		Pagination<AttributeType> pagination = daoAttributeType.getAll(paginationParams, owner);
		return new Pager<AttributeType>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<AttributeType> filter(PaginationParams paginationParams, Client owner) {
		List<AttributeType> list = daoAttributeType.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<AttributeType> all(PaginationParams paginationParams) {
		Pagination<AttributeType> pagination = daoAttributeType.getAll(paginationParams);
		return new Pager<AttributeType>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<AttributeType> filter(PaginationParams paginationParams) {
		List<AttributeType> list = daoAttributeType.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<AttributeType> all() {
		return daoAttributeType.getAll();
	}

	@Override
	public List<AttributeType> search(String description) {
		return new ArrayList<AttributeType>();
	}
	
	public List<AttributeType> last(LocalDateTime lastSyncDate){
		return daoAttributeType.last(lastSyncDate);
	}
			
	@Override
	public AttributeType save(AttributeType entity) {
		return daoAttributeType.save(entity);
	}

	@Override
	public AttributeType update(AttributeType entity) {
		return daoAttributeType.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoAttributeType.delete(id);
	}


}
