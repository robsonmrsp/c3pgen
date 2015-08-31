package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.c3pgen.model.Operation;
import br.com.c3pgen.persistence.DaoOperation;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.utils.DateUtil;
import br.com.c3pgen.utils.Util;

/**
*  generated: 30/08/2015 20:23:12
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
