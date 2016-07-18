package br.com.c3pgen.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.persistence.DaoApplication;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.reverseengineering.crawler.DBImportResult;
import br.com.c3pgen.reverseengineering.crawler.DBImporterEntities;
import br.com.c3pgen.reverseengineering.crawler.DBImporterOptions;

/**
 * generated: 03/09/2015 14:51:47
 **/

@Named
@Transactional
public class ApplicationServiceImp implements ApplicationService {

	private static final Logger LOGGER = Logger.getLogger(ApplicationServiceImp.class);

	@Inject
	DaoApplication daoApplication;
	@Inject
	RelationshipService relationshipService;
	@Inject
	TheEntityService entityService;

	@Override
	public Application get(Integer id) {
		return daoApplication.find(id);
	}

	@Override
	public Application get(Integer id, Client client) {
		return daoApplication.find(id, client);
	}

	@Override
	public List<Application> all(Client client) {
		return daoApplication.getAll(client);
	}

	@Override
	public Pager<Application> all(PaginationParams paginationParams, Client owner) {
		Pagination<Application> pagination = daoApplication.getAll(paginationParams, owner);
		return new Pager<Application>(pagination.getResults(), 0, pagination.getTotalRecords());
	}

	@Override
	public List<Application> filter(PaginationParams paginationParams, Client owner) {
		List<Application> list = daoApplication.filter(paginationParams, owner);
		return list;
	}

	@Override
	public Pager<Application> all(PaginationParams paginationParams) {
		Pagination<Application> pagination = daoApplication.getAll(paginationParams);
		return new Pager<Application>(pagination.getResults(), 0, pagination.getTotalRecords());
	}

	@Override
	public List<Application> filter(PaginationParams paginationParams) {
		List<Application> list = daoApplication.filter(paginationParams);
		return list;
	}

	@Override
	public List<Application> all() {
		return daoApplication.getAll();
	}

	@Override
	public List<Application> search(String description) {
		return new ArrayList<Application>();
	}

	public List<Application> last(LocalDateTime lastSyncDate) {
		return daoApplication.last(lastSyncDate);
	}

	@Override
	public Application save(Application application) {
		List<ApplicationEntity> entities = application.getEntities();
		for (ApplicationEntity entity : entities) {
			entityService.save(entity);
		}
		Set<ApplicationRelationship> applicationRelationships = application.getApplicationRelationships();
		for (ApplicationRelationship applicationRelationship : applicationRelationships) {
			relationshipService.save(applicationRelationship.getSource());
			relationshipService.save(applicationRelationship.getTarget());
		}
		return daoApplication.save(application);
	}

	@Override
	public Application update(Application entity) {

		return daoApplication.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoApplication.delete(id);
	}

	@Override
	public Application generateAppFromDataBase(String url, String username, String password, String databasetype, String supressPrefix, String tableRegex, String columnRegex) throws Exception {

		LOGGER.info("Start extraction [ " + Arrays.asList("url= " + url, "username= " + username, "databasetype= " + databasetype, "supressPrefix= " + supressPrefix, "tabeRegex= " + tableRegex, "columnRegex= " + columnRegex) + " ]");
		DBImporterEntities dbImporterEntities = new DBImporterEntities(url, username, password, databasetype);

		DBImporterOptions options = new DBImporterOptions();
		options.addInclusionSchemaName("public");
		options.addExclusionColumnNamePatterns(columnRegex.split(";"));
		options.addExclusionTableNamePatterns(tableRegex.split(";"));

		// options.addExclusionColumnNamePatterns("(.*)create_datetime(.*)");
		//
		// options.addExclusionColumnNamePatterns("(.*)create_datetime(.*)");
		// options.addExclusionColumnNamePatterns("(.*)last_update_datetime(.*)");
		// options.addExclusionColumnNamePatterns("(.*)user_change(.*)");
		// options.addExclusionColumnNamePatterns("(.*)user_create(.*)");
		//
		// options.addExclusionTableNamePatterns("(.*)AUD", "(.*)aud");
		// options.addExclusionTableNamePatterns("public.RBAC(.*)", "public.Rbac(.*)", "public.rbac(.*)");
		//
		// options.addExclusionTableNamePatterns("(.*)AUD", "(.*)aud", "(.*)revinfo(.*)");

		options.setPrefixToSupress(supressPrefix);

		Application application = dbImporterEntities.extractToApplication(options);
		
		LOGGER.info("End extraction [ " + Arrays.asList("url= " + url, "username= " + username, "databasetype= " + databasetype, "supressPrefix= " + supressPrefix, "tabeRegex= " + tableRegex, "columnRegex= " + columnRegex) + " ]");
		
		return application;
	}

	@Override
	public Boolean ping(String url, String username, String password, String databaseType) throws Exception {
		DBImporterEntities dbImporterEntities = new DBImporterEntities(url, username, password, databaseType);
		return dbImporterEntities.ping();
	}
}
