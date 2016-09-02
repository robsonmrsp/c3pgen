package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import br.com.gvs.qualidade.model.Client;

import br.com.gvs.qualidade.model.Departamento;
import br.com.gvs.qualidade.persistence.DaoDepartamento;

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
public class DepartamentoServiceImp implements DepartamentoService {

	private static final Logger LOGGER = Logger.getLogger(DepartamentoServiceImp.class);
	
	@Inject
	DaoDepartamento daoDepartamento;

	@Override
	public Departamento get(Integer id) {
		return daoDepartamento.find(id);
	}
	
	@Override
	public Departamento get(Integer id, Client client) {
		return daoDepartamento.find(id, client);
	}

	@Override
	public List<Departamento> all(Client client) {
		return daoDepartamento.getAll(client);
	}
	
	

	@Override
	public Pager<Departamento> all(PaginationParams paginationParams, Client owner) {
		Pagination<Departamento> pagination = daoDepartamento.getAll(paginationParams, owner);
		return new Pager<Departamento>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<Departamento> filter(PaginationParams paginationParams, Client owner) {
		List<Departamento> list = daoDepartamento.filter(paginationParams, owner);
		return list;
	}
	

	@Override
	public Pager<Departamento> all(PaginationParams paginationParams) {
		Pagination<Departamento> pagination = daoDepartamento.getAll(paginationParams);
		return new Pager<Departamento>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Departamento> filter(PaginationParams paginationParams) {
		List<Departamento> list = daoDepartamento.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Departamento> all() {
		return daoDepartamento.getAll();
	}

	@Override
	public List<Departamento> search(String description) {
		return new ArrayList<Departamento>();
	}
	
	public List<Departamento> last(LocalDateTime lastSyncDate){
		return daoDepartamento.last(lastSyncDate);
	}
			
	@Override
	public Departamento save(Departamento entity) {
		return daoDepartamento.save(entity);
	}

	@Override
	public Departamento update(Departamento entity) {
		return daoDepartamento.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoDepartamento.delete(id);
	}


}
