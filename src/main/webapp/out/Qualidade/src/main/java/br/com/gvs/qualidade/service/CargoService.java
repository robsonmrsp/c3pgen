package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Cargo;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 11:56:33
**/
public interface CargoService {

	Cargo get(Integer id);

	List<Cargo> all();
	
	Pager<Cargo> all(PaginationParams paginationParams);

	List<Cargo> filter(PaginationParams paginationParams);
	
	List<Cargo> search(String searchText);

	Cargo save(Cargo entity);

	Cargo update(Cargo entity);
    List<Cargo> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
