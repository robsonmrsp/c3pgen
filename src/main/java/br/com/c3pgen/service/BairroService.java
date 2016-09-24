package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Bairro;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface BairroService {

	Bairro get(Integer id);

	List<Bairro> all();
	
	Pager<Bairro> all(PaginationParams paginationParams);

	List<Bairro> filter(PaginationParams paginationParams);
	
	List<Bairro> search(String searchText);

	Bairro save(Bairro entity);

	Bairro update(Bairro entity);
    List<Bairro> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
