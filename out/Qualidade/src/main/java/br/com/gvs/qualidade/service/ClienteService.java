package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Cliente;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 01/09/2016 17:25:05
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
