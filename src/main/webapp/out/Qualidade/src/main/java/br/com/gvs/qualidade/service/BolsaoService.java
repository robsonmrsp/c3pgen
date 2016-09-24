package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Bolsao;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 11:56:32
**/
public interface BolsaoService {

	Bolsao get(Integer id);

	List<Bolsao> all();
	
	Pager<Bolsao> all(PaginationParams paginationParams);

	List<Bolsao> filter(PaginationParams paginationParams);
	
	List<Bolsao> search(String searchText);

	Bolsao save(Bolsao entity);

	Bolsao update(Bolsao entity);
    List<Bolsao> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
