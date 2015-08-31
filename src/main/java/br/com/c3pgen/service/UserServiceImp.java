package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.c3pgen.model.User;
import br.com.c3pgen.persistence.DaoUser;
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
