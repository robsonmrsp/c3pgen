package br.com.c3pgen.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.model.Role;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:49
**/
public interface RoleService {

	Role get(Integer id);

	List<Role> all();
	
	Pager<Role> all(PaginationParams paginationParams);

	List<Role> filter(PaginationParams paginationParams);
	
	List<Role> search(String searchText);

	Role save(Role entity);

	Role update(Role entity);
    List<Role> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
