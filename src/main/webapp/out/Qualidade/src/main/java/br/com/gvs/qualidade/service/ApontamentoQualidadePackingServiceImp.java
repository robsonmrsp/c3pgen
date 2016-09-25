package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.ApontamentoQualidadePacking;
import br.com.gvs.qualidade.persistence.DaoApontamentoQualidadePacking;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 12:52:11
**/

@Named
@Transactional
public class ApontamentoQualidadePackingServiceImp implements ApontamentoQualidadePackingService {

	private static final Logger LOGGER = Logger.getLogger(ApontamentoQualidadePackingServiceImp.class);
	
	@Inject
	DaoApontamentoQualidadePacking daoApontamentoQualidadePacking;

	@Override
	public ApontamentoQualidadePacking get(Integer id) {
		return daoApontamentoQualidadePacking.find(id);
	}
	

	@Override
	public Pager<ApontamentoQualidadePacking> all(PaginationParams paginationParams) {
		Pagination<ApontamentoQualidadePacking> pagination = daoApontamentoQualidadePacking.getAll(paginationParams);
		return new Pager<ApontamentoQualidadePacking>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<ApontamentoQualidadePacking> filter(PaginationParams paginationParams) {
		List<ApontamentoQualidadePacking> list = daoApontamentoQualidadePacking.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<ApontamentoQualidadePacking> all() {
		return daoApontamentoQualidadePacking.getAll();
	}

	@Override
	public List<ApontamentoQualidadePacking> search(String description) {
		return new ArrayList<ApontamentoQualidadePacking>();
	}
	
	public List<ApontamentoQualidadePacking> last(LocalDateTime lastSyncDate){
		return daoApontamentoQualidadePacking.last(lastSyncDate);
	}
			
	@Override
	public ApontamentoQualidadePacking save(ApontamentoQualidadePacking entity) {
		return daoApontamentoQualidadePacking.save(entity);
	}

	@Override
	public ApontamentoQualidadePacking update(ApontamentoQualidadePacking entity) {
		return daoApontamentoQualidadePacking.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoApontamentoQualidadePacking.delete(id);
	}


}
