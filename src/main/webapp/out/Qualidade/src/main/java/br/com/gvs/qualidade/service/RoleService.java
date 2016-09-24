package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Role;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 11:56:38
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
