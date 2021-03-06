package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Pais;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface PaisService {

	Pais get(Integer id);

	List<Pais> all();
	
	Pager<Pais> all(PaginationParams paginationParams);

	List<Pais> filter(PaginationParams paginationParams);
	
	List<Pais> search(String searchText);

	Pais save(Pais entity);

	Pais update(Pais entity);
    List<Pais> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
