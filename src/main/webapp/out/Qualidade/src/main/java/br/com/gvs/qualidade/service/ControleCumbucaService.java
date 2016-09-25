package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.ControleCumbuca;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 12:52:13
**/
public interface ControleCumbucaService {

	ControleCumbuca get(Integer id);

	List<ControleCumbuca> all();
	
	Pager<ControleCumbuca> all(PaginationParams paginationParams);

	List<ControleCumbuca> filter(PaginationParams paginationParams);
	
	List<ControleCumbuca> search(String searchText);

	ControleCumbuca save(ControleCumbuca entity);

	ControleCumbuca update(ControleCumbuca entity);
    List<ControleCumbuca> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
