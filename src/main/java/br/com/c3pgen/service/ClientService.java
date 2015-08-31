package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
**/
public interface ClientService {

	Client get(Integer id);

	List<Client> all();
	
	Pager<Client> all(PaginationParams paginationParams);

	List<Client> filter(PaginationParams paginationParams);
	
	List<Client> search(String searchText);

	Client save(Client entity);

	Client update(Client entity);
    List<Client> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
