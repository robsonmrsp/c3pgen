package br.com.gvs.qualidade.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gvs.qualidade.model.ControleCumbuca;
import br.com.gvs.qualidade.persistence.DaoControleCumbuca;

import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.utils.DateUtil;
import br.com.gvs.core.utils.Util;

/**
*  generated: 24/09/2016 12:52:13
**/

@Named
@Transactional
public class ControleCumbucaServiceImp implements ControleCumbucaService {

	private static final Logger LOGGER = Logger.getLogger(ControleCumbucaServiceImp.class);
	
	@Inject
	DaoControleCumbuca daoControleCumbuca;

	@Override
	public ControleCumbuca get(Integer id) {
		return daoControleCumbuca.find(id);
	}
	

	@Override
	public Pager<ControleCumbuca> all(PaginationParams paginationParams) {
		Pagination<ControleCumbuca> pagination = daoControleCumbuca.getAll(paginationParams);
		return new Pager<ControleCumbuca>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<ControleCumbuca> filter(PaginationParams paginationParams) {
		List<ControleCumbuca> list = daoControleCumbuca.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<ControleCumbuca> all() {
		return daoControleCumbuca.getAll();
	}

	@Override
	public List<ControleCumbuca> search(String description) {
		return new ArrayList<ControleCumbuca>();
	}
	
	public List<ControleCumbuca> last(LocalDateTime lastSyncDate){
		return daoControleCumbuca.last(lastSyncDate);
	}
			
	@Override
	public ControleCumbuca save(ControleCumbuca entity) {
		return daoControleCumbuca.save(entity);
	}

	@Override
	public ControleCumbuca update(ControleCumbuca entity) {
		return daoControleCumbuca.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoControleCumbuca.delete(id);
	}


}
