package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.TheEntity;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface TheEntityService {

	TheEntity get(Integer id);

	List<TheEntity> all();
	
	Pager<TheEntity> all(PaginationParams paginationParams);

	TheEntity get(Integer id, Client client);

	List<TheEntity> all(Client owner);
	
	List<TheEntity> filter(PaginationParams paginationParams, Client owner);
	
	Pager<TheEntity> all(PaginationParams paginationParams, Client owner);
	
	List<TheEntity> filter(PaginationParams paginationParams);
	
	List<TheEntity> search(String searchText);

	TheEntity save(TheEntity entity);

	TheEntity update(TheEntity entity);
    List<TheEntity> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
