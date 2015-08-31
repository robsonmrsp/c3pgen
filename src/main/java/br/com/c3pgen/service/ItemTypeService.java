package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.ItemType;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
**/
public interface ItemTypeService {

	ItemType get(Integer id);

	List<ItemType> all();
	
	Pager<ItemType> all(PaginationParams paginationParams);

	List<ItemType> filter(PaginationParams paginationParams);
	
	List<ItemType> search(String searchText);

	ItemType save(ItemType entity);

	ItemType update(ItemType entity);
    List<ItemType> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
