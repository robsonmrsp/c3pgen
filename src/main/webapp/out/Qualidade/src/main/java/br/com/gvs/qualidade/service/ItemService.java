package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Item;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 12:52:17
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
