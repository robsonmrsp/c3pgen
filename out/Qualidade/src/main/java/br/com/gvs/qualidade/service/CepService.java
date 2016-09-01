package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Cep;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 01/09/2016 17:25:05
**/
public interface CepService {

	Cep get(Integer id);

	List<Cep> all();
	
	Pager<Cep> all(PaginationParams paginationParams);

	List<Cep> filter(PaginationParams paginationParams);
	
	List<Cep> search(String searchText);

	Cep save(Cep entity);

	Cep update(Cep entity);
    List<Cep> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
