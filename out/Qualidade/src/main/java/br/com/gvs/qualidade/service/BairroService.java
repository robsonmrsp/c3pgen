package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Bairro;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 01/09/2016 17:25:05
**/
public interface BairroService {

	Bairro get(Integer id);

	List<Bairro> all();
	
	Pager<Bairro> all(PaginationParams paginationParams);

	List<Bairro> filter(PaginationParams paginationParams);
	
	List<Bairro> search(String searchText);

	Bairro save(Bairro entity);

	Bairro update(Bairro entity);
    List<Bairro> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
