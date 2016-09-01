package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.ItemType;
import br.com.gvs.qualidade.persistence.DaoItemType;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 01/09/2016 17:25:05
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
