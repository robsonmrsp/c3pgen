package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Session;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 12:52:18
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
