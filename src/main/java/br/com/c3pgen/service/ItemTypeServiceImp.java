package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.c3pgen.model.ItemType;
import br.com.c3pgen.persistence.DaoItemType;
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
public class ItemTypeServiceImp implements ItemTypeService {

	private static final Logger LOGGER = Logger.getLogger(ItemTypeServiceImp.class);
	
	@Inject
	DaoItemType daoItemType;

	@Override
	public ItemType get(Integer id) {
		return daoItemType.find(id);
	}
	

	@Override
	public Pager<ItemType> all(PaginationParams paginationParams) {
		Pagination<ItemType> pagination = daoItemType.getAll(paginationParams);
		return new Pager<ItemType>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<ItemType> filter(PaginationParams paginationParams) {
		List<ItemType> list = daoItemType.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<ItemType> all() {
		return daoItemType.getAll();
	}

	@Override
	public List<ItemType> search(String description) {
		return new ArrayList<ItemType>();
	}
	
	public List<ItemType> last(LocalDateTime lastSyncDate){
		return daoItemType.last(lastSyncDate);
	}
			
	@Override
	public ItemType save(ItemType entity) {
		return daoItemType.save(entity);
	}

	@Override
	public ItemType update(ItemType entity) {
		return daoItemType.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoItemType.delete(id);
	}


}
