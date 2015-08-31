package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
**/
public interface AttributeTypeService {

	AttributeType get(Integer id);

	List<AttributeType> all();
	
	Pager<AttributeType> all(PaginationParams paginationParams);

	AttributeType get(Integer id, Client client);

	List<AttributeType> all(Client owner);
	
	List<AttributeType> filter(PaginationParams paginationParams, Client owner);
	
	Pager<AttributeType> all(PaginationParams paginationParams, Client owner);
	
	List<AttributeType> filter(PaginationParams paginationParams);
	
	List<AttributeType> search(String searchText);

	AttributeType save(AttributeType entity);

	AttributeType update(AttributeType entity);
    List<AttributeType> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
