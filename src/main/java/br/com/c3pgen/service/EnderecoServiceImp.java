package br.com.c3pgen.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.c3pgen.model.Endereco;
import br.com.c3pgen.persistence.DaoEndereco;
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
public class EnderecoServiceImp implements EnderecoService {

	private static final Logger LOGGER = Logger.getLogger(EnderecoServiceImp.class);
	
	@Inject
	DaoEndereco daoEndereco;

	@Override
	public Endereco get(Integer id) {
		return daoEndereco.find(id);
	}
	

	@Override
	public Pager<Endereco> all(PaginationParams paginationParams) {
		Pagination<Endereco> pagination = daoEndereco.getAll(paginationParams);
		return new Pager<Endereco>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Endereco> filter(PaginationParams paginationParams) {
		List<Endereco> list = daoEndereco.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Endereco> all() {
		return daoEndereco.getAll();
	}

	@Override
	public List<Endereco> search(String description) {
		return new ArrayList<Endereco>();
	}
	
	public List<Endereco> last(LocalDateTime lastSyncDate){
		return daoEndereco.last(lastSyncDate);
	}
			
	@Override
	public Endereco save(Endereco entity) {
		return daoEndereco.save(entity);
	}

	@Override
	public Endereco update(Endereco entity) {
		return daoEndereco.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoEndereco.delete(id);
	}


}
