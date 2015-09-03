package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.c3pgen.model.Estado;
import br.com.c3pgen.persistence.DaoEstado;
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
public class EstadoServiceImp implements EstadoService {

	private static final Logger LOGGER = Logger.getLogger(EstadoServiceImp.class);
	
	@Inject
	DaoEstado daoEstado;

	@Override
	public Estado get(Integer id) {
		return daoEstado.find(id);
	}
	

	@Override
	public Pager<Estado> all(PaginationParams paginationParams) {
		Pagination<Estado> pagination = daoEstado.getAll(paginationParams);
		return new Pager<Estado>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Estado> filter(PaginationParams paginationParams) {
		List<Estado> list = daoEstado.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Estado> all() {
		return daoEstado.getAll();
	}

	@Override
	public List<Estado> search(String description) {
		return new ArrayList<Estado>();
	}
	
	public List<Estado> last(LocalDateTime lastSyncDate){
		return daoEstado.last(lastSyncDate);
	}
			
	@Override
	public Estado save(Estado entity) {
		return daoEstado.save(entity);
	}

	@Override
	public Estado update(Estado entity) {
		return daoEstado.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoEstado.delete(id);
	}


}
