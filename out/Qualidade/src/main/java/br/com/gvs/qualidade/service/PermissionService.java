package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Permission;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 02/09/2016 16:23:49
**/
public interface PermissionService {

	Permission get(Integer id);

	List<Permission> all();
	
	Pager<Permission> all(PaginationParams paginationParams);

	List<Permission> filter(PaginationParams paginationParams);
	
	List<Permission> search(String searchText);

	Permission save(Permission entity);

	Permission update(Permission entity);
    List<Permission> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
