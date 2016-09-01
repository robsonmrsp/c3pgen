package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Client;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 01/09/2016 17:25:05
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
