package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Cabine;
import br.com.gvs.qualidade.persistence.DaoCabine;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 12:52:12
**/

@Named
@Transactional
public class CabineServiceImp implements CabineService {

	private static final Logger LOGGER = Logger.getLogger(CabineServiceImp.class);
	
	@Inject
	DaoCabine daoCabine;

	@Override
	public Cabine get(Integer id) {
		return daoCabine.find(id);
	}
	

	@Override
	public Pager<Cabine> all(PaginationParams paginationParams) {
		Pagination<Cabine> pagination = daoCabine.getAll(paginationParams);
		return new Pager<Cabine>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Cabine> filter(PaginationParams paginationParams) {
		List<Cabine> list = daoCabine.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Cabine> all() {
		return daoCabine.getAll();
	}

	@Override
	public List<Cabine> search(String description) {
		return new ArrayList<Cabine>();
	}
	
	public List<Cabine> last(LocalDateTime lastSyncDate){
		return daoCabine.last(lastSyncDate);
	}
			
	@Override
	public Cabine save(Cabine entity) {
		return daoCabine.save(entity);
	}

	@Override
	public Cabine update(Cabine entity) {
		return daoCabine.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoCabine.delete(id);
	}


}
