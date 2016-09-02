package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.model.Latada;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 02/09/2016 16:23:48
**/
public interface LatadaService {

	Latada get(Integer id);

	List<Latada> all();
	
	Pager<Latada> all(PaginationParams paginationParams);

	Latada get(Integer id, Client client);

	List<Latada> all(Client owner);
	
	List<Latada> filter(PaginationParams paginationParams, Client owner);
	
	Pager<Latada> all(PaginationParams paginationParams, Client owner);
	
	List<Latada> filter(PaginationParams paginationParams);
	
	List<Latada> search(String searchText);

	Latada save(Latada entity);

	Latada update(Latada entity);
    List<Latada> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
