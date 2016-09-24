package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Cbo;
import br.com.gvs.qualidade.persistence.DaoCbo;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 11:56:33
**/

@Named
@Transactional
public class CboServiceImp implements CboService {

	private static final Logger LOGGER = Logger.getLogger(CboServiceImp.class);
	
	@Inject
	DaoCbo daoCbo;

	@Override
	public Cbo get(Integer id) {
		return daoCbo.find(id);
	}
	

	@Override
	public Pager<Cbo> all(PaginationParams paginationParams) {
		Pagination<Cbo> pagination = daoCbo.getAll(paginationParams);
		return new Pager<Cbo>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Cbo> filter(PaginationParams paginationParams) {
		List<Cbo> list = daoCbo.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Cbo> all() {
		return daoCbo.getAll();
	}

	@Override
	public List<Cbo> search(String description) {
		return new ArrayList<Cbo>();
	}
	
	public List<Cbo> last(LocalDateTime lastSyncDate){
		return daoCbo.last(lastSyncDate);
	}
			
	@Override
	public Cbo save(Cbo entity) {
		return daoCbo.save(entity);
	}

	@Override
	public Cbo update(Cbo entity) {
		return daoCbo.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoCbo.delete(id);
	}


}
