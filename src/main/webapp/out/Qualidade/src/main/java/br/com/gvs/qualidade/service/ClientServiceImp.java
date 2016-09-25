package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.persistence.DaoClient;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 12:52:12
**/

@Named
@Transactional
public class ClientServiceImp implements ClientService {

	private static final Logger LOGGER = Logger.getLogger(ClientServiceImp.class);
	
	@Inject
	DaoClient daoClient;

	@Override
	public Client get(Integer id) {
		return daoClient.find(id);
	}
	

	@Override
	public Pager<Client> all(PaginationParams paginationParams) {
		Pagination<Client> pagination = daoClient.getAll(paginationParams);
		return new Pager<Client>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Client> filter(PaginationParams paginationParams) {
		List<Client> list = daoClient.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Client> all() {
		return daoClient.getAll();
	}

	@Override
	public List<Client> search(String description) {
		return new ArrayList<Client>();
	}
	
	public List<Client> last(LocalDateTime lastSyncDate){
		return daoClient.last(lastSyncDate);
	}
			
	@Override
	public Client save(Client entity) {
		return daoClient.save(entity);
	}

	@Override
	public Client update(Client entity) {
		return daoClient.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoClient.delete(id);
	}


}
