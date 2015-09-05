package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Permission;
import br.com.c3pgen.persistence.DaoPermission;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:49
**/

@Named
@Transactional
public class PermissionServiceImp implements PermissionService {

	private static final Logger LOGGER = Logger.getLogger(PermissionServiceImp.class);
	
	@Inject
	DaoPermission daoPermission;

	@Override
	public Permission get(Integer id) {
		return daoPermission.find(id);
	}
	

	@Override
	public Pager<Permission> all(PaginationParams paginationParams) {
		Pagination<Permission> pagination = daoPermission.getAll(paginationParams);
		return new Pager<Permission>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Permission> filter(PaginationParams paginationParams) {
		List<Permission> list = daoPermission.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Permission> all() {
		return daoPermission.getAll();
	}

	@Override
	public List<Permission> search(String description) {
		return new ArrayList<Permission>();
	}
	
	public List<Permission> last(LocalDateTime lastSyncDate){
		return daoPermission.last(lastSyncDate);
	}
			
	@Override
	public Permission save(Permission entity) {
		return daoPermission.save(entity);
	}

	@Override
	public Permission update(Permission entity) {
		return daoPermission.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoPermission.delete(id);
	}


}
