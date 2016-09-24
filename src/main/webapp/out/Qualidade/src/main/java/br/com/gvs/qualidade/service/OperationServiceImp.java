package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Operation;
import br.com.gvs.qualidade.persistence.DaoOperation;

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
public class OperationServiceImp implements OperationService {

	private static final Logger LOGGER = Logger.getLogger(OperationServiceImp.class);
	
	@Inject
	DaoOperation daoOperation;

	@Override
	public Operation get(Integer id) {
		return daoOperation.find(id);
	}
	

	@Override
	public Pager<Operation> all(PaginationParams paginationParams) {
		Pagination<Operation> pagination = daoOperation.getAll(paginationParams);
		return new Pager<Operation>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Operation> filter(PaginationParams paginationParams) {
		List<Operation> list = daoOperation.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Operation> all() {
		return daoOperation.getAll();
	}

	@Override
	public List<Operation> search(String description) {
		return new ArrayList<Operation>();
	}
	
	public List<Operation> last(LocalDateTime lastSyncDate){
		return daoOperation.last(lastSyncDate);
	}
			
	@Override
	public Operation save(Operation entity) {
		return daoOperation.save(entity);
	}

	@Override
	public Operation update(Operation entity) {
		return daoOperation.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoOperation.delete(id);
	}


}
