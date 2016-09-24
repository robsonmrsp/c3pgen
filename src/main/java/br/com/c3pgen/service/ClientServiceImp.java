package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.persistence.DaoClient;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
*  generated: 03/09/2015 14:51:48
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
