package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Cabine;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 02/09/2016 16:23:48
**/
public interface CabineService {

	Cabine get(Integer id);

	List<Cabine> all();
	
	Pager<Cabine> all(PaginationParams paginationParams);

	List<Cabine> filter(PaginationParams paginationParams);
	
	List<Cabine> search(String searchText);

	Cabine save(Cabine entity);

	Cabine update(Cabine entity);
    List<Cabine> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
