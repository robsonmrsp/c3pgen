package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Anexo;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 01/09/2016 17:25:05
**/
public interface AnexoService {

	Anexo get(Integer id);

	List<Anexo> all();
	
	Pager<Anexo> all(PaginationParams paginationParams);

	List<Anexo> filter(PaginationParams paginationParams);
	
	List<Anexo> search(String searchText);

	Anexo save(Anexo entity);

	Anexo update(Anexo entity);
    List<Anexo> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
