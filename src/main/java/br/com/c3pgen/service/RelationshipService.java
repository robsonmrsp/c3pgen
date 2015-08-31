package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
**/
public interface RelationshipService {

	Relationship get(Integer id);

	List<Relationship> all();
	
	Pager<Relationship> all(PaginationParams paginationParams);

	Relationship get(Integer id, Client client);

	List<Relationship> all(Client owner);
	
	List<Relationship> filter(PaginationParams paginationParams, Client owner);
	
	Pager<Relationship> all(PaginationParams paginationParams, Client owner);
	
	List<Relationship> filter(PaginationParams paginationParams);
	
	List<Relationship> search(String searchText);

	Relationship save(Relationship entity);

	Relationship update(Relationship entity);
    List<Relationship> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
