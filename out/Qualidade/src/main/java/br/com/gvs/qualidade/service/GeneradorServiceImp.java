package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Generador;
import br.com.gvs.qualidade.persistence.DaoGenerador;

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
public class GeneradorServiceImp implements GeneradorService {

	private static final Logger LOGGER = Logger.getLogger(GeneradorServiceImp.class);
	
	@Inject
	DaoGenerador daoGenerador;

	@Override
	public Generador get(Integer id) {
		return daoGenerador.find(id);
	}
	

	@Override
	public Pager<Generador> all(PaginationParams paginationParams) {
		Pagination<Generador> pagination = daoGenerador.getAll(paginationParams);
		return new Pager<Generador>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Generador> filter(PaginationParams paginationParams) {
		List<Generador> list = daoGenerador.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Generador> all() {
		return daoGenerador.getAll();
	}

	@Override
	public List<Generador> search(String description) {
		return new ArrayList<Generador>();
	}
	
	public List<Generador> last(LocalDateTime lastSyncDate){
		return daoGenerador.last(lastSyncDate);
	}
			
	@Override
	public Generador save(Generador entity) {
		return daoGenerador.save(entity);
	}

	@Override
	public Generador update(Generador entity) {
		return daoGenerador.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoGenerador.delete(id);
	}


}
