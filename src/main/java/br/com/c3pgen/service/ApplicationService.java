package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.base.GenerateFileInfo;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.reverseengineering.crawler.DBImportResult;

/**
 * generated: 03/09/2015 14:51:47
 **/
public interface ApplicationService {

	Application get(Integer id);

	List<Application> all();

	Pager<Application> all(PaginationParams paginationParams);

	Application get(Integer id, Client client);

	List<Application> all(Client owner);

	List<Application> filter(PaginationParams paginationParams, Client owner);

	Pager<Application> all(PaginationParams paginationParams, Client owner);

	List<Application> filter(PaginationParams paginationParams);

	List<Application> search(String searchText);

	GenerateFileInfo save(Application entity);

	Application update(Application entity);

	List<Application> last(LocalDateTime lastSyncDate);

	Boolean delete(Integer id);


	Boolean ping(String url, String username, String password, String databaseType) throws Exception;

	Application generateAppFromDataBase(String url, String username, String password, String databasetype, String supressPrefix, String tableRegex, String columnRegex, String string) throws Exception;

	DBImportResult generateYamlFromDataBase(String url, String username, String password, String databaseType, String supressPrefix, String tableRegex, String columnRegex) throws Exception;

	Application saveOnlyApplication(Application application);


}
