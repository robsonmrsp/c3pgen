package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Cidade;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface CidadeService {

	Cidade get(Integer id);

	List<Cidade> all();
	
	Pager<Cidade> all(PaginationParams paginationParams);

	List<Cidade> filter(PaginationParams paginationParams);
	
	List<Cidade> search(String searchText);

	Cidade save(Cidade entity);

	Cidade update(Cidade entity);
    List<Cidade> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
