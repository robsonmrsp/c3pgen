package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import br.com.gvs.qualidade.model.Client;

import br.com.gvs.qualidade.model.Funcionario;
import br.com.gvs.qualidade.persistence.DaoFuncionario;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 02/09/2016 16:23:48
**/

@Named
@Transactional
public class FuncionarioServiceImp implements FuncionarioService {

	private static final Logger LOGGER = Logger.getLogger(FuncionarioServiceImp.class);
	
	@Inject
	DaoFuncionario daoFuncionario;

	@Override
	public Funcionario get(Integer id) {
		return daoFuncionario.find(id);
	}
	
	@Override
	public Funcionario get(Integer id, Client client) {
		return daoFuncionario.find(id, client);
	}

	@Override
	public List<Funcionario> all(Client client) {
		return daoFuncionario.getAll(client);
	}
	
	

	@Override
	public Pager<Funcionario> all(PaginationParams paginationParams, Client owner) {
		Pagination<Funcionario> pagination = daoFuncionario.getAll(paginationParams, owner);
		return new Pager<Funcionario>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<Funcionario> filter(PaginationParams paginationParams, Client owner) {
		List<Funcionario> list = daoFuncionario.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<Funcionario> all(PaginationParams paginationParams) {
		Pagination<Funcionario> pagination = daoFuncionario.getAll(paginationParams);
		return new Pager<Funcionario>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Funcionario> filter(PaginationParams paginationParams) {
		List<Funcionario> list = daoFuncionario.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Funcionario> all() {
		return daoFuncionario.getAll();
	}

	@Override
	public List<Funcionario> search(String description) {
		return new ArrayList<Funcionario>();
	}
	
	public List<Funcionario> last(LocalDateTime lastSyncDate){
		return daoFuncionario.last(lastSyncDate);
	}
			
	@Override
	public Funcionario save(Funcionario entity) {
		return daoFuncionario.save(entity);
	}

	@Override
	public Funcionario update(Funcionario entity) {
		return daoFuncionario.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoFuncionario.delete(id);
	}


}
