package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.User;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2015 14:51:49
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
