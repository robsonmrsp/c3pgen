package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.persistence.DaoTheEntity;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;

/**
 * generated: 03/09/2015 14:51:48
 **/

@Named
@Transactional
public class TheEntityServiceImp implements TheEntityService {

	private static final Logger LOGGER = Logger.getLogger(TheEntityServiceImp.class);

	@Inject
	DaoTheEntity daoTheEntity;
	@Inject
	RelationshipService applicationRelationshipService;

	@Override
	public ApplicationEntity get(Integer id) {
		return daoTheEntity.find(id);
	}

	@Override
	public ApplicationEntity get(Integer id, Client client) {
		return daoTheEntity.find(id, client);
	}

	@Override
	public List<ApplicationEntity> all(Client client) {
		return daoTheEntity.getAll(client);
	}

	@Override
	public Pager<ApplicationEntity> all(PaginationParams paginationParams, Client owner) {
		Pagination<ApplicationEntity> pagination = daoTheEntity.getAll(paginationParams, owner);
		return new Pager<ApplicationEntity>(pagination.getResults(), 0, pagination.getTotalRecords());
	}

	@Override
	public List<ApplicationEntity> filter(PaginationParams paginationParams, Client owner) {
		List<ApplicationEntity> list = daoTheEntity.filter(paginationParams, owner);
		return list;
	}

	@Override
	public Pager<ApplicationEntity> all(PaginationParams paginationParams) {
		Pagination<ApplicationEntity> pagination = daoTheEntity.getAll(paginationParams);
		return new Pager<ApplicationEntity>(pagination.getResults(), 0, pagination.getTotalRecords());
	}

	@Override
	public List<ApplicationEntity> filter(PaginationParams paginationParams) {
		List<ApplicationEntity> list = daoTheEntity.filter(paginationParams);
		return list;
	}

	@Override
	public List<ApplicationEntity> all() {
		return daoTheEntity.getAll();
	}

	@Override
	public List<ApplicationEntity> search(String description) {
		return new ArrayList<ApplicationEntity>();
	}

	public List<ApplicationEntity> last(LocalDateTime lastSyncDate) {
		return daoTheEntity.last(lastSyncDate);
	}

	@Override
	public ApplicationEntity save(ApplicationEntity entity) {
		return daoTheEntity.save(entity);
	}

	@Override
	public ApplicationEntity update(ApplicationEntity entity) {
		return daoTheEntity.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		ApplicationEntity entity = get(id);

		applicationRelationshipService.deleteByEntity(entity);

		return daoTheEntity.delete(id);
	}

}
