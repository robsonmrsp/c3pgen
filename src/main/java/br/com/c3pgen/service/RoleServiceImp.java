package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Role;
import br.com.c3pgen.persistence.DaoRole;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:49
**/

@Named
@Transactional
public class RoleServiceImp implements RoleService {

	private static final Logger LOGGER = Logger.getLogger(RoleServiceImp.class);
	
	@Inject
	DaoRole daoRole;

	@Override
	public Role get(Integer id) {
		return daoRole.find(id);
	}
	

	@Override
	public Pager<Role> all(PaginationParams paginationParams) {
		Pagination<Role> pagination = daoRole.getAll(paginationParams);
		return new Pager<Role>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Role> filter(PaginationParams paginationParams) {
		List<Role> list = daoRole.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Role> all() {
		return daoRole.getAll();
	}

	@Override
	public List<Role> search(String description) {
		return new ArrayList<Role>();
	}
	
	public List<Role> last(LocalDateTime lastSyncDate){
		return daoRole.last(lastSyncDate);
	}
			
	@Override
	public Role save(Role entity) {
		return daoRole.save(entity);
	}

	@Override
	public Role update(Role entity) {
		return daoRole.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoRole.delete(id);
	}


}
