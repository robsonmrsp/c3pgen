package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Generador;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 12:52:14
**/
public interface GeneradorService {

	Generador get(Integer id);

	List<Generador> all();
	
	Pager<Generador> all(PaginationParams paginationParams);

	List<Generador> filter(PaginationParams paginationParams);
	
	List<Generador> search(String searchText);

	Generador save(Generador entity);

	Generador update(Generador entity);
    List<Generador> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
