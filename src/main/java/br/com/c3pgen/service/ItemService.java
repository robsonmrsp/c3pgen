package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Item;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:48
**/
public interface ItemService {

	Item get(Integer id);

	List<Item> all();
	
	Pager<Item> all(PaginationParams paginationParams);

	List<Item> filter(PaginationParams paginationParams);
	
	List<Item> search(String searchText);

	Item save(Item entity);

	Item update(Item entity);
    List<Item> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
