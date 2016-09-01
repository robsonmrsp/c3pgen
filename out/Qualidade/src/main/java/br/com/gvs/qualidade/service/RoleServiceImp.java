package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Role;
import br.com.gvs.qualidade.persistence.DaoRole;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 01/09/2016 17:25:06
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
