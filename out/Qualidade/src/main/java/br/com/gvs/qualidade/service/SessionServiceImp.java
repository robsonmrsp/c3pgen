package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Session;
import br.com.gvs.qualidade.persistence.DaoSession;

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
