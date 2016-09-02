package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Funcao;
import br.com.gvs.qualidade.persistence.DaoFuncao;

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
public class FuncaoServiceImp implements FuncaoService {

	private static final Logger LOGGER = Logger.getLogger(FuncaoServiceImp.class);
	
	@Inject
	DaoFuncao daoFuncao;

	@Override
	public Funcao get(Integer id) {
		return daoFuncao.find(id);
	}
	

	@Override
	public Pager<Funcao> all(PaginationParams paginationParams) {
		Pagination<Funcao> pagination = daoFuncao.getAll(paginationParams);
		return new Pager<Funcao>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Funcao> filter(PaginationParams paginationParams) {
		List<Funcao> list = daoFuncao.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Funcao> all() {
		return daoFuncao.getAll();
	}

	@Override
	public List<Funcao> search(String description) {
		return new ArrayList<Funcao>();
	}
	
	public List<Funcao> last(LocalDateTime lastSyncDate){
		return daoFuncao.last(lastSyncDate);
	}
			
	@Override
	public Funcao save(Funcao entity) {
		return daoFuncao.save(entity);
	}

	@Override
	public Funcao update(Funcao entity) {
		return daoFuncao.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoFuncao.delete(id);
	}


}
