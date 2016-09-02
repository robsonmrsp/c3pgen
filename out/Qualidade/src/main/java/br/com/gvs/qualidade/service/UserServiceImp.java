package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.User;
import br.com.gvs.qualidade.persistence.DaoUser;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 02/09/2016 16:23:49
**/

@Named
@Transactional
public class UserServiceImp implements UserService {

	private static final Logger LOGGER = Logger.getLogger(UserServiceImp.class);
	
	@Inject
	DaoUser daoUser;

	@Override
	public User get(Integer id) {
		return daoUser.find(id);
	}
	

	@Override
	public Pager<User> all(PaginationParams paginationParams) {
		Pagination<User> pagination = daoUser.getAll(paginationParams);
		return new Pager<User>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<User> filter(PaginationParams paginationParams) {
		List<User> list = daoUser.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<User> all() {
		return daoUser.getAll();
	}

	@Override
	public List<User> search(String description) {
		return new ArrayList<User>();
	}
	
	public List<User> last(LocalDateTime lastSyncDate){
		return daoUser.last(lastSyncDate);
	}
			
	@Override
	public User save(User entity) {
		return daoUser.save(entity);
	}

	@Override
	public User update(User entity) {
		return daoUser.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoUser.delete(id);
	}


}
