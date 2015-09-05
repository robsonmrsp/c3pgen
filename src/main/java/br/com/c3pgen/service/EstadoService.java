package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Estado;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface EstadoService {

	Estado get(Integer id);

	List<Estado> all();
	
	Pager<Estado> all(PaginationParams paginationParams);

	List<Estado> filter(PaginationParams paginationParams);
	
	List<Estado> search(String searchText);

	Estado save(Estado entity);

	Estado update(Estado entity);
    List<Estado> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
