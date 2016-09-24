package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Sacola;
import br.com.gvs.qualidade.persistence.DaoSacola;

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
public class SacolaServiceImp implements SacolaService {

	private static final Logger LOGGER = Logger.getLogger(SacolaServiceImp.class);
	
	@Inject
	DaoSacola daoSacola;

	@Override
	public Sacola get(Integer id) {
		return daoSacola.find(id);
	}
	

	@Override
	public Pager<Sacola> all(PaginationParams paginationParams) {
		Pagination<Sacola> pagination = daoSacola.getAll(paginationParams);
		return new Pager<Sacola>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Sacola> filter(PaginationParams paginationParams) {
		List<Sacola> list = daoSacola.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Sacola> all() {
		return daoSacola.getAll();
	}

	@Override
	public List<Sacola> search(String description) {
		return new ArrayList<Sacola>();
	}
	
	public List<Sacola> last(LocalDateTime lastSyncDate){
		return daoSacola.last(lastSyncDate);
	}
			
	@Override
	public Sacola save(Sacola entity) {
		return daoSacola.save(entity);
	}

	@Override
	public Sacola update(Sacola entity) {
		return daoSacola.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoSacola.delete(id);
	}


}
