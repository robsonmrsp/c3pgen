package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Embalagem;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2016 22:18:32
**/
public interface EmbalagemService {

	Embalagem get(Integer id);

	List<Embalagem> all();
	
	Pager<Embalagem> all(PaginationParams paginationParams);

	List<Embalagem> filter(PaginationParams paginationParams);
	
	List<Embalagem> search(String searchText);

	Embalagem save(Embalagem entity);

	Embalagem update(Embalagem entity);
    List<Embalagem> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
