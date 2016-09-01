package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.ItemType;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 01/09/2016 17:25:05
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
