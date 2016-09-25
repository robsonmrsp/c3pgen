package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Variedade;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 12:52:15
**/
public interface VariedadeService {

	Variedade get(Integer id);

	List<Variedade> all();
	
	Pager<Variedade> all(PaginationParams paginationParams);

	List<Variedade> filter(PaginationParams paginationParams);
	
	List<Variedade> search(String searchText);

	Variedade save(Variedade entity);

	Variedade update(Variedade entity);
    List<Variedade> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
