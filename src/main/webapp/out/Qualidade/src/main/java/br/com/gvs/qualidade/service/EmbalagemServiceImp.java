package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Embalagem;
import br.com.gvs.qualidade.persistence.DaoEmbalagem;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 11:56:34
**/

@Named
@Transactional
public class EmbalagemServiceImp implements EmbalagemService {

	private static final Logger LOGGER = Logger.getLogger(EmbalagemServiceImp.class);
	
	@Inject
	DaoEmbalagem daoEmbalagem;

	@Override
	public Embalagem get(Integer id) {
		return daoEmbalagem.find(id);
	}
	

	@Override
	public Pager<Embalagem> all(PaginationParams paginationParams) {
		Pagination<Embalagem> pagination = daoEmbalagem.getAll(paginationParams);
		return new Pager<Embalagem>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Embalagem> filter(PaginationParams paginationParams) {
		List<Embalagem> list = daoEmbalagem.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Embalagem> all() {
		return daoEmbalagem.getAll();
	}

	@Override
	public List<Embalagem> search(String description) {
		return new ArrayList<Embalagem>();
	}
	
	public List<Embalagem> last(LocalDateTime lastSyncDate){
		return daoEmbalagem.last(lastSyncDate);
	}
			
	@Override
	public Embalagem save(Embalagem entity) {
		return daoEmbalagem.save(entity);
	}

	@Override
	public Embalagem update(Embalagem entity) {
		return daoEmbalagem.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoEmbalagem.delete(id);
	}


}
