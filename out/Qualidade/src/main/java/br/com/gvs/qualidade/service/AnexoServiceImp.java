package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Anexo;
import br.com.gvs.qualidade.persistence.DaoAnexo;

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
public class AnexoServiceImp implements AnexoService {

	private static final Logger LOGGER = Logger.getLogger(AnexoServiceImp.class);
	
	@Inject
	DaoAnexo daoAnexo;

	@Override
	public Anexo get(Integer id) {
		return daoAnexo.find(id);
	}
	

	@Override
	public Pager<Anexo> all(PaginationParams paginationParams) {
		Pagination<Anexo> pagination = daoAnexo.getAll(paginationParams);
		return new Pager<Anexo>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Anexo> filter(PaginationParams paginationParams) {
		List<Anexo> list = daoAnexo.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Anexo> all() {
		return daoAnexo.getAll();
	}

	@Override
	public List<Anexo> search(String description) {
		return new ArrayList<Anexo>();
	}
	
	public List<Anexo> last(LocalDateTime lastSyncDate){
		return daoAnexo.last(lastSyncDate);
	}
			
	@Override
	public Anexo save(Anexo entity) {
		return daoAnexo.save(entity);
	}

	@Override
	public Anexo update(Anexo entity) {
		return daoAnexo.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoAnexo.delete(id);
	}


}
