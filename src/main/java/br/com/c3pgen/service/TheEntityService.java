package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface TheEntityService {

	ApplicationEntity get(Integer id);

	List<ApplicationEntity> all();
	
	Pager<ApplicationEntity> all(PaginationParams paginationParams);

	ApplicationEntity get(Integer id, Client client);

	List<ApplicationEntity> all(Client owner);
	
	List<ApplicationEntity> filter(PaginationParams paginationParams, Client owner);
	
	Pager<ApplicationEntity> all(PaginationParams paginationParams, Client owner);
	
	List<ApplicationEntity> filter(PaginationParams paginationParams);
	
	List<ApplicationEntity> search(String searchText);

	ApplicationEntity save(ApplicationEntity entity);

	ApplicationEntity update(ApplicationEntity entity);
    List<ApplicationEntity> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
