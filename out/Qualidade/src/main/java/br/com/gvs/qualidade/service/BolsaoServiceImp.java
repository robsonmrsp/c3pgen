package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Bolsao;
import br.com.gvs.qualidade.persistence.DaoBolsao;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 03/09/2016 22:18:31
**/

@Named
@Transactional
public class BolsaoServiceImp implements BolsaoService {

	private static final Logger LOGGER = Logger.getLogger(BolsaoServiceImp.class);
	
	@Inject
	DaoBolsao daoBolsao;

	@Override
	public Bolsao get(Integer id) {
		return daoBolsao.find(id);
	}
	

	@Override
	public Pager<Bolsao> all(PaginationParams paginationParams) {
		Pagination<Bolsao> pagination = daoBolsao.getAll(paginationParams);
		return new Pager<Bolsao>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Bolsao> filter(PaginationParams paginationParams) {
		List<Bolsao> list = daoBolsao.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Bolsao> all() {
		return daoBolsao.getAll();
	}

	@Override
	public List<Bolsao> search(String description) {
		return new ArrayList<Bolsao>();
	}
	
	public List<Bolsao> last(LocalDateTime lastSyncDate){
		return daoBolsao.last(lastSyncDate);
	}
			
	@Override
	public Bolsao save(Bolsao entity) {
		return daoBolsao.save(entity);
	}

	@Override
	public Bolsao update(Bolsao entity) {
		return daoBolsao.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoBolsao.delete(id);
	}


}
