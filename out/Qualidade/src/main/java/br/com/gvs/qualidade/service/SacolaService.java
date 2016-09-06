package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Sacola;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2016 22:18:32
**/
public interface SacolaService {

	Sacola get(Integer id);

	List<Sacola> all();
	
	Pager<Sacola> all(PaginationParams paginationParams);

	List<Sacola> filter(PaginationParams paginationParams);
	
	List<Sacola> search(String searchText);

	Sacola save(Sacola entity);

	Sacola update(Sacola entity);
    List<Sacola> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
