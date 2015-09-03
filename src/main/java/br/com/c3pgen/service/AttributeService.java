package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface AttributeService {

	Attribute get(Integer id);

	List<Attribute> all();
	
	Pager<Attribute> all(PaginationParams paginationParams);

	Attribute get(Integer id, Client client);

	List<Attribute> all(Client owner);
	
	List<Attribute> filter(PaginationParams paginationParams, Client owner);
	
	Pager<Attribute> all(PaginationParams paginationParams, Client owner);
	
	List<Attribute> filter(PaginationParams paginationParams);
	
	List<Attribute> search(String searchText);

	Attribute save(Attribute entity);

	Attribute update(Attribute entity);
    List<Attribute> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
