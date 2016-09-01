package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Variedade;
import br.com.gvs.qualidade.persistence.DaoVariedade;

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
public class VariedadeServiceImp implements VariedadeService {

	private static final Logger LOGGER = Logger.getLogger(VariedadeServiceImp.class);
	
	@Inject
	DaoVariedade daoVariedade;

	@Override
	public Variedade get(Integer id) {
		return daoVariedade.find(id);
	}
	

	@Override
	public Pager<Variedade> all(PaginationParams paginationParams) {
		Pagination<Variedade> pagination = daoVariedade.getAll(paginationParams);
		return new Pager<Variedade>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Variedade> filter(PaginationParams paginationParams) {
		List<Variedade> list = daoVariedade.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Variedade> all() {
		return daoVariedade.getAll();
	}

	@Override
	public List<Variedade> search(String description) {
		return new ArrayList<Variedade>();
	}
	
	public List<Variedade> last(LocalDateTime lastSyncDate){
		return daoVariedade.last(lastSyncDate);
	}
			
	@Override
	public Variedade save(Variedade entity) {
		return daoVariedade.save(entity);
	}

	@Override
	public Variedade update(Variedade entity) {
		return daoVariedade.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoVariedade.delete(id);
	}


}
