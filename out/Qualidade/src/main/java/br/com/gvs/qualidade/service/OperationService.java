package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Operation;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 02/09/2016 16:23:49
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
