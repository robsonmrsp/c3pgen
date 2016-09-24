package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Cliente;
import br.com.gvs.qualidade.persistence.DaoCliente;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 11:56:33
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
