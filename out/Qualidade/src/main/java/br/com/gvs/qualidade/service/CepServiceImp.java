package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Cep;
import br.com.gvs.qualidade.persistence.DaoCep;

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
public class CepServiceImp implements CepService {

	private static final Logger LOGGER = Logger.getLogger(CepServiceImp.class);
	
	@Inject
	DaoCep daoCep;

	@Override
	public Cep get(Integer id) {
		return daoCep.find(id);
	}
	

	@Override
	public Pager<Cep> all(PaginationParams paginationParams) {
		Pagination<Cep> pagination = daoCep.getAll(paginationParams);
		return new Pager<Cep>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Cep> filter(PaginationParams paginationParams) {
		List<Cep> list = daoCep.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Cep> all() {
		return daoCep.getAll();
	}

	@Override
	public List<Cep> search(String description) {
		return new ArrayList<Cep>();
	}
	
	public List<Cep> last(LocalDateTime lastSyncDate){
		return daoCep.last(lastSyncDate);
	}
			
	@Override
	public Cep save(Cep entity) {
		return daoCep.save(entity);
	}

	@Override
	public Cep update(Cep entity) {
		return daoCep.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoCep.delete(id);
	}


}
