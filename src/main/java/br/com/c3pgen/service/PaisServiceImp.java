package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Pais;
import br.com.c3pgen.persistence.DaoPais;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:48
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
