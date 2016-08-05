package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.Modulo;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 05/08/2016 15:23:44
**/
public interface ModuloService {

	Modulo get(Integer id);

	List<Modulo> all();
	
	Pager<Modulo> all(PaginationParams paginationParams);

	Modulo get(Integer id, Client client);

	List<Modulo> all(Client owner);
	
	List<Modulo> filter(PaginationParams paginationParams, Client owner);
	
	Pager<Modulo> all(PaginationParams paginationParams, Client owner);
	
	List<Modulo> filter(PaginationParams paginationParams);
	
	List<Modulo> search(String searchText);

	Modulo save(Modulo entity);

	Modulo update(Modulo entity);
    List<Modulo> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
