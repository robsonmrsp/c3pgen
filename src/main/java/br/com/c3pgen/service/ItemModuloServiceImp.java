package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.ItemModulo;
import br.com.c3pgen.persistence.DaoItemModulo;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 05/08/2016 15:23:43
**/

@Named
@Transactional
public class ItemModuloServiceImp implements ItemModuloService {

	private static final Logger LOGGER = Logger.getLogger(ItemModuloServiceImp.class);
	
	@Inject
	DaoItemModulo daoItemModulo;

	@Override
	public ItemModulo get(Integer id) {
		return daoItemModulo.find(id);
	}
	
	@Override
	public ItemModulo get(Integer id, Client client) {
		return daoItemModulo.find(id, client);
	}

	@Override
	public List<ItemModulo> all(Client client) {
		return daoItemModulo.getAll(client);
	}
	
	

	@Override
	public Pager<ItemModulo> all(PaginationParams paginationParams, Client owner) {
		Pagination<ItemModulo> pagination = daoItemModulo.getAll(paginationParams, owner);
		return new Pager<ItemModulo>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<ItemModulo> filter(PaginationParams paginationParams, Client owner) {
		List<ItemModulo> list = daoItemModulo.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<ItemModulo> all(PaginationParams paginationParams) {
		Pagination<ItemModulo> pagination = daoItemModulo.getAll(paginationParams);
		return new Pager<ItemModulo>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<ItemModulo> filter(PaginationParams paginationParams) {
		List<ItemModulo> list = daoItemModulo.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<ItemModulo> all() {
		return daoItemModulo.getAll();
	}

	@Override
	public List<ItemModulo> search(String description) {
		return new ArrayList<ItemModulo>();
	}
	
	public List<ItemModulo> last(LocalDateTime lastSyncDate){
		return daoItemModulo.last(lastSyncDate);
	}
			
	@Override
	public ItemModulo save(ItemModulo entity) {
		return daoItemModulo.save(entity);
	}

	@Override
	public ItemModulo update(ItemModulo entity) {
		return daoItemModulo.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoItemModulo.delete(id);
	}


}
