package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.c3pgen.model.Item;
import br.com.c3pgen.persistence.DaoItem;
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
public class ItemServiceImp implements ItemService {

	private static final Logger LOGGER = Logger.getLogger(ItemServiceImp.class);
	
	@Inject
	DaoItem daoItem;

	@Override
	public Item get(Integer id) {
		return daoItem.find(id);
	}
	

	@Override
	public Pager<Item> all(PaginationParams paginationParams) {
		Pagination<Item> pagination = daoItem.getAll(paginationParams);
		return new Pager<Item>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Item> filter(PaginationParams paginationParams) {
		List<Item> list = daoItem.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Item> all() {
		return daoItem.getAll();
	}

	@Override
	public List<Item> search(String description) {
		return new ArrayList<Item>();
	}
	
	public List<Item> last(LocalDateTime lastSyncDate){
		return daoItem.last(lastSyncDate);
	}
			
	@Override
	public Item save(Item entity) {
		return daoItem.save(entity);
	}

	@Override
	public Item update(Item entity) {
		return daoItem.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoItem.delete(id);
	}


}
