package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Pais;
import br.com.gvs.qualidade.persistence.DaoPais;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 11:56:37
**/

@Named
@Transactional
public class PaisServiceImp implements PaisService {

	private static final Logger LOGGER = Logger.getLogger(PaisServiceImp.class);
	
	@Inject
	DaoPais daoPais;

	@Override
	public Pais get(Integer id) {
		return daoPais.find(id);
	}
	

	@Override
	public Pager<Pais> all(PaginationParams paginationParams) {
		Pagination<Pais> pagination = daoPais.getAll(paginationParams);
		return new Pager<Pais>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Pais> filter(PaginationParams paginationParams) {
		List<Pais> list = daoPais.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Pais> all() {
		return daoPais.getAll();
	}

	@Override
	public List<Pais> search(String description) {
		return new ArrayList<Pais>();
	}
	
	public List<Pais> last(LocalDateTime lastSyncDate){
		return daoPais.last(lastSyncDate);
	}
			
	@Override
	public Pais save(Pais entity) {
		return daoPais.save(entity);
	}

	@Override
	public Pais update(Pais entity) {
		return daoPais.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoPais.delete(id);
	}


}
