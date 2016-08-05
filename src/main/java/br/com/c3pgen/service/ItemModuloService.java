package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.ItemModulo;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 05/08/2016 15:23:43
**/
public interface ItemModuloService {

	ItemModulo get(Integer id);

	List<ItemModulo> all();
	
	Pager<ItemModulo> all(PaginationParams paginationParams);

	ItemModulo get(Integer id, Client client);

	List<ItemModulo> all(Client owner);
	
	List<ItemModulo> filter(PaginationParams paginationParams, Client owner);
	
	Pager<ItemModulo> all(PaginationParams paginationParams, Client owner);
	
	List<ItemModulo> filter(PaginationParams paginationParams);
	
	List<ItemModulo> search(String searchText);

	ItemModulo save(ItemModulo entity);

	ItemModulo update(ItemModulo entity);
    List<ItemModulo> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
