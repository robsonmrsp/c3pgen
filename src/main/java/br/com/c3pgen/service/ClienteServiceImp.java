package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.c3pgen.model.Cliente;
import br.com.c3pgen.persistence.DaoCliente;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.utils.DateUtil;
import br.com.c3pgen.utils.Util;

/**
*  generated: 03/09/2015 14:51:48
**/

@Named
@Transactional
public class ClienteServiceImp implements ClienteService {

	private static final Logger LOGGER = Logger.getLogger(ClienteServiceImp.class);
	
	@Inject
	DaoCliente daoCliente;

	@Override
	public Cliente get(Integer id) {
		return daoCliente.find(id);
	}
	

	@Override
	public Pager<Cliente> all(PaginationParams paginationParams) {
		Pagination<Cliente> pagination = daoCliente.getAll(paginationParams);
		return new Pager<Cliente>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Cliente> filter(PaginationParams paginationParams) {
		List<Cliente> list = daoCliente.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Cliente> all() {
		return daoCliente.getAll();
	}

	@Override
	public List<Cliente> search(String description) {
		return new ArrayList<Cliente>();
	}
	
	public List<Cliente> last(LocalDateTime lastSyncDate){
		return daoCliente.last(lastSyncDate);
	}
			
	@Override
	public Cliente save(Cliente entity) {
		return daoCliente.save(entity);
	}

	@Override
	public Cliente update(Cliente entity) {
		return daoCliente.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoCliente.delete(id);
	}


}
