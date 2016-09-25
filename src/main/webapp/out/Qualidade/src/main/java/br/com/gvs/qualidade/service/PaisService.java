package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Pais;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 12:52:16
**/
public interface PaisService {

	Pais get(Integer id);

	List<Pais> all();
	
	Pager<Pais> all(PaginationParams paginationParams);

	List<Pais> filter(PaginationParams paginationParams);
	
	List<Pais> search(String searchText);

	Pais save(Pais entity);

	Pais update(Pais entity);
    List<Pais> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
