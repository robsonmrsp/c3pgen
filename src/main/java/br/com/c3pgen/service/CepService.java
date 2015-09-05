package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Cep;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface CepService {

	Cep get(Integer id);

	List<Cep> all();
	
	Pager<Cep> all(PaginationParams paginationParams);

	List<Cep> filter(PaginationParams paginationParams);
	
	List<Cep> search(String searchText);

	Cep save(Cep entity);

	Cep update(Cep entity);
    List<Cep> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
