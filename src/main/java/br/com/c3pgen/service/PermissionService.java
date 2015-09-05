package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Permission;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:49
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
