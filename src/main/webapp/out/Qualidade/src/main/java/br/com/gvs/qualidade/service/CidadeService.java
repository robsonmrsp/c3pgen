package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Cidade;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 11:56:36
**/
public interface CidadeService {

	Cidade get(Integer id);

	List<Cidade> all();
	
	Pager<Cidade> all(PaginationParams paginationParams);

	List<Cidade> filter(PaginationParams paginationParams);
	
	List<Cidade> search(String searchText);

	Cidade save(Cidade entity);

	Cidade update(Cidade entity);
    List<Cidade> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
