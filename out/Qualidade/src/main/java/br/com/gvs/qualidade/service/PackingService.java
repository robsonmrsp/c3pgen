package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.model.Packing;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 02/09/2016 16:23:48
**/
public interface PackingService {

	Packing get(Integer id);

	List<Packing> all();
	
	Pager<Packing> all(PaginationParams paginationParams);

	Packing get(Integer id, Client client);

	List<Packing> all(Client owner);
	
	List<Packing> filter(PaginationParams paginationParams, Client owner);
	
	Pager<Packing> all(PaginationParams paginationParams, Client owner);
	
	List<Packing> filter(PaginationParams paginationParams);
	
	List<Packing> search(String searchText);

	Packing save(Packing entity);

	Packing update(Packing entity);
    List<Packing> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
