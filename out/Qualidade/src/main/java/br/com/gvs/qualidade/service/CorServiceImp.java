package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Cor;
import br.com.gvs.qualidade.persistence.DaoCor;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 02/09/2016 16:23:48
**/

@Named
@Transactional
public class CorServiceImp implements CorService {

	private static final Logger LOGGER = Logger.getLogger(CorServiceImp.class);
	
	@Inject
	DaoCor daoCor;

	@Override
	public Cor get(Integer id) {
		return daoCor.find(id);
	}
	

	@Override
	public Pager<Cor> all(PaginationParams paginationParams) {
		Pagination<Cor> pagination = daoCor.getAll(paginationParams);
		return new Pager<Cor>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Cor> filter(PaginationParams paginationParams) {
		List<Cor> list = daoCor.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Cor> all() {
		return daoCor.getAll();
	}

	@Override
	public List<Cor> search(String description) {
		return new ArrayList<Cor>();
	}
	
	public List<Cor> last(LocalDateTime lastSyncDate){
		return daoCor.last(lastSyncDate);
	}
			
	@Override
	public Cor save(Cor entity) {
		return daoCor.save(entity);
	}

	@Override
	public Cor update(Cor entity) {
		return daoCor.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoCor.delete(id);
	}


}
