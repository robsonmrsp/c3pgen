package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import br.com.gvs.qualidade.model.Client;

import br.com.gvs.qualidade.model.Latada;
import br.com.gvs.qualidade.persistence.DaoLatada;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 11:56:35
**/

@Named
@Transactional
public class LatadaServiceImp implements LatadaService {

	private static final Logger LOGGER = Logger.getLogger(LatadaServiceImp.class);
	
	@Inject
	DaoLatada daoLatada;

	@Override
	public Latada get(Integer id) {
		return daoLatada.find(id);
	}
	
	@Override
	public Latada get(Integer id, Client client) {
		return daoLatada.find(id, client);
	}

	@Override
	public List<Latada> all(Client client) {
		return daoLatada.getAll(client);
	}
	
	

	@Override
	public Pager<Latada> all(PaginationParams paginationParams, Client owner) {
		Pagination<Latada> pagination = daoLatada.getAll(paginationParams, owner);
		return new Pager<Latada>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<Latada> filter(PaginationParams paginationParams, Client owner) {
		List<Latada> list = daoLatada.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<Latada> all(PaginationParams paginationParams) {
		Pagination<Latada> pagination = daoLatada.getAll(paginationParams);
		return new Pager<Latada>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Latada> filter(PaginationParams paginationParams) {
		List<Latada> list = daoLatada.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Latada> all() {
		return daoLatada.getAll();
	}

	@Override
	public List<Latada> search(String description) {
		return new ArrayList<Latada>();
	}
	
	public List<Latada> last(LocalDateTime lastSyncDate){
		return daoLatada.last(lastSyncDate);
	}
			
	@Override
	public Latada save(Latada entity) {
		return daoLatada.save(entity);
	}

	@Override
	public Latada update(Latada entity) {
		return daoLatada.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoLatada.delete(id);
	}


}
