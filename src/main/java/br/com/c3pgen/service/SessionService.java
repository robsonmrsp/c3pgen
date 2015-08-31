package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Session;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
**/
public interface SessionService {

	Session get(Integer id);

	List<Session> all();
	
	Pager<Session> all(PaginationParams paginationParams);

	List<Session> filter(PaginationParams paginationParams);
	
	List<Session> search(String searchText);

	Session save(Session entity);

	Session update(Session entity);
    List<Session> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
