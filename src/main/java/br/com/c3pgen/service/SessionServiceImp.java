package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Session;
import br.com.c3pgen.persistence.DaoSession;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:49
**/

@Named
@Transactional
public class SessionServiceImp implements SessionService {

	private static final Logger LOGGER = Logger.getLogger(SessionServiceImp.class);
	
	@Inject
	DaoSession daoSession;

	@Override
	public Session get(Integer id) {
		return daoSession.find(id);
	}
	

	@Override
	public Pager<Session> all(PaginationParams paginationParams) {
		Pagination<Session> pagination = daoSession.getAll(paginationParams);
		return new Pager<Session>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Session> filter(PaginationParams paginationParams) {
		List<Session> list = daoSession.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Session> all() {
		return daoSession.getAll();
	}

	@Override
	public List<Session> search(String description) {
		return new ArrayList<Session>();
	}
	
	public List<Session> last(LocalDateTime lastSyncDate){
		return daoSession.last(lastSyncDate);
	}
			
	@Override
	public Session save(Session entity) {
		return daoSession.save(entity);
	}

	@Override
	public Session update(Session entity) {
		return daoSession.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoSession.delete(id);
	}


}
