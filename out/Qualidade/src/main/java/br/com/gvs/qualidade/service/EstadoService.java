package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Estado;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 02/09/2016 16:23:48
**/
public interface EstadoService {

	Estado get(Integer id);

	List<Estado> all();
	
	Pager<Estado> all(PaginationParams paginationParams);

	List<Estado> filter(PaginationParams paginationParams);
	
	List<Estado> search(String searchText);

	Estado save(Estado entity);

	Estado update(Estado entity);
    List<Estado> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
