package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.Cargo;
import br.com.gvs.qualidade.persistence.DaoCargo;

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
public class CargoServiceImp implements CargoService {

	private static final Logger LOGGER = Logger.getLogger(CargoServiceImp.class);
	
	@Inject
	DaoCargo daoCargo;

	@Override
	public Cargo get(Integer id) {
		return daoCargo.find(id);
	}
	

	@Override
	public Pager<Cargo> all(PaginationParams paginationParams) {
		Pagination<Cargo> pagination = daoCargo.getAll(paginationParams);
		return new Pager<Cargo>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Cargo> filter(PaginationParams paginationParams) {
		List<Cargo> list = daoCargo.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Cargo> all() {
		return daoCargo.getAll();
	}

	@Override
	public List<Cargo> search(String description) {
		return new ArrayList<Cargo>();
	}
	
	public List<Cargo> last(LocalDateTime lastSyncDate){
		return daoCargo.last(lastSyncDate);
	}
			
	@Override
	public Cargo save(Cargo entity) {
		return daoCargo.save(entity);
	}

	@Override
	public Cargo update(Cargo entity) {
		return daoCargo.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoCargo.delete(id);
	}


}
