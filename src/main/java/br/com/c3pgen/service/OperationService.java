package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Operation;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
**/
public interface OperationService {

	Operation get(Integer id);

	List<Operation> all();
	
	Pager<Operation> all(PaginationParams paginationParams);

	List<Operation> filter(PaginationParams paginationParams);
	
	List<Operation> search(String searchText);

	Operation save(Operation entity);

	Operation update(Operation entity);
    List<Operation> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
