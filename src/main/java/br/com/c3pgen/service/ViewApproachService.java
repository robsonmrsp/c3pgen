package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.ViewApproach;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
**/
public interface ViewApproachService {

	ViewApproach get(Integer id);

	List<ViewApproach> all();
	
	Pager<ViewApproach> all(PaginationParams paginationParams);

	ViewApproach get(Integer id, Client client);

	List<ViewApproach> all(Client owner);
	
	List<ViewApproach> filter(PaginationParams paginationParams, Client owner);
	
	Pager<ViewApproach> all(PaginationParams paginationParams, Client owner);
	
	List<ViewApproach> filter(PaginationParams paginationParams);
	
	List<ViewApproach> search(String searchText);

	ViewApproach save(ViewApproach entity);

	ViewApproach update(ViewApproach entity);
    List<ViewApproach> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
