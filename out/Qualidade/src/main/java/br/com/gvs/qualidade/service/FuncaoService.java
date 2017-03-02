package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Funcao;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2016 22:18:32
**/
public interface FuncaoService {

	Funcao get(Integer id);

	List<Funcao> all();
	
	Pager<Funcao> all(PaginationParams paginationParams);

	List<Funcao> filter(PaginationParams paginationParams);
	
	List<Funcao> search(String searchText);

	Funcao save(Funcao entity);

	Funcao update(Funcao entity);
    List<Funcao> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}