package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Cbo;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 01/09/2016 17:25:05
**/
public interface CboService {

	Cbo get(Integer id);

	List<Cbo> all();
	
	Pager<Cbo> all(PaginationParams paginationParams);

	List<Cbo> filter(PaginationParams paginationParams);
	
	List<Cbo> search(String searchText);

	Cbo save(Cbo entity);

	Cbo update(Cbo entity);
    List<Cbo> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
