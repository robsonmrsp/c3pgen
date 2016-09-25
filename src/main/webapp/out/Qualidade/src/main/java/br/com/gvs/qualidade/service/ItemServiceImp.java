package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Item;
import br.com.gvs.qualidade.persistence.DaoItem;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 12:52:17
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
