package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.Modulo;
import br.com.c3pgen.persistence.DaoModulo;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
 * generated: 05/08/2016 15:23:44
 **/

@Named
@Transactional
public class ModuloServiceImp implements ModuloService {

	private static final Logger LOGGER = Logger.getLogger(ModuloServiceImp.class);

	@Inject
	DaoModulo daoModulo;

	@Override
	public Modulo get(Integer id) {
		return daoModulo.find(id);
	}

	@Override
	public Modulo get(Integer id, Client client) {
		return daoModulo.find(id, client);
	}

	@Override
	public List<Modulo> all(Client client) {
		return daoModulo.getAll(client);
	}

	@Override
	public Pager<Modulo> all(PaginationParams paginationParams, Client owner) {
		Pagination<Modulo> pagination = daoModulo.getAll(paginationParams, owner);
		return new Pager<Modulo>(pagination.getResults(), 0, pagination.getTotalRecords());
	}

	@Override
	public List<Modulo> filter(PaginationParams paginationParams, Client owner) {
		List<Modulo> list = daoModulo.filter(paginationParams, owner);
		return list;
	}

	@Override
	public Pager<Modulo> all(PaginationParams paginationParams) {
		Pagination<Modulo> pagination = daoModulo.getAll(paginationParams);
		return new Pager<Modulo>(pagination.getResults(), 0, pagination.getTotalRecords());
	}

	@Override
	public List<Modulo> filter(PaginationParams paginationParams) {
		List<Modulo> list = daoModulo.filter(paginationParams);
		return list;
	}

	@Override
	public List<Modulo> all() {
		return daoModulo.getAll();
	}

	@Override
	public List<Modulo> search(String description) {
		return new ArrayList<Modulo>();
	}

	public List<Modulo> last(LocalDateTime lastSyncDate) {
		return daoModulo.last(lastSyncDate);
	}

	@Override
	public Modulo save(Modulo entity) {
		return daoModulo.save(entity);
	}

	@Override
	public Modulo update(Modulo entity) {
		return daoModulo.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoModulo.delete(id);
	}

}
