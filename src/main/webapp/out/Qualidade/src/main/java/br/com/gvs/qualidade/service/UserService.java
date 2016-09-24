package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.User;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 11:56:38
**/
public interface UserService {

	User get(Integer id);

	List<User> all();
	
	Pager<User> all(PaginationParams paginationParams);

	List<User> filter(PaginationParams paginationParams);
	
	List<User> search(String searchText);

	User save(User entity);

	User update(User entity);
    List<User> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
