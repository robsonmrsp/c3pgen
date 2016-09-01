package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import br.com.gvs.qualidade.model.Client;

import br.com.gvs.qualidade.model.Packing;
import br.com.gvs.qualidade.persistence.DaoPacking;

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
public class PackingServiceImp implements PackingService {

	private static final Logger LOGGER = Logger.getLogger(PackingServiceImp.class);
	
	@Inject
	DaoPacking daoPacking;

	@Override
	public Packing get(Integer id) {
		return daoPacking.find(id);
	}
	
	@Override
	public Packing get(Integer id, Client client) {
		return daoPacking.find(id, client);
	}

	@Override
	public List<Packing> all(Client client) {
		return daoPacking.getAll(client);
	}
	
	

	@Override
	public Pager<Packing> all(PaginationParams paginationParams, Client owner) {
		Pagination<Packing> pagination = daoPacking.getAll(paginationParams, owner);
		return new Pager<Packing>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<Packing> filter(PaginationParams paginationParams, Client owner) {
		List<Packing> list = daoPacking.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<Packing> all(PaginationParams paginationParams) {
		Pagination<Packing> pagination = daoPacking.getAll(paginationParams);
		return new Pager<Packing>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Packing> filter(PaginationParams paginationParams) {
		List<Packing> list = daoPacking.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Packing> all() {
		return daoPacking.getAll();
	}

	@Override
	public List<Packing> search(String description) {
		return new ArrayList<Packing>();
	}
	
	public List<Packing> last(LocalDateTime lastSyncDate){
		return daoPacking.last(lastSyncDate);
	}
			
	@Override
	public Packing save(Packing entity) {
		return daoPacking.save(entity);
	}

	@Override
	public Packing update(Packing entity) {
		return daoPacking.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoPacking.delete(id);
	}


}
