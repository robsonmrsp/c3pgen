package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Cor;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2016 22:18:31
**/
public interface CorService {

	Cor get(Integer id);

	List<Cor> all();
	
	Pager<Cor> all(PaginationParams paginationParams);

	List<Cor> filter(PaginationParams paginationParams);
	
	List<Cor> search(String searchText);

	Cor save(Cor entity);

	Cor update(Cor entity);
    List<Cor> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
