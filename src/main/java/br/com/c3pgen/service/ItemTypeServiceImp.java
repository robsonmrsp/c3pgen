package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.ItemType;
import br.com.c3pgen.persistence.DaoItemType;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:48
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
