package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Cep;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
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
