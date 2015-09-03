package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Cliente;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface ClienteService {

	Cliente get(Integer id);

	List<Cliente> all();
	
	Pager<Cliente> all(PaginationParams paginationParams);

	List<Cliente> filter(PaginationParams paginationParams);
	
	List<Cliente> search(String searchText);

	Cliente save(Cliente entity);

	Cliente update(Cliente entity);
    List<Cliente> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
