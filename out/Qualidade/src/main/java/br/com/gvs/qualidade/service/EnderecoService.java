package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Endereco;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2016 22:18:33
**/
public interface EnderecoService {

	Endereco get(Integer id);

	List<Endereco> all();
	
	Pager<Endereco> all(PaginationParams paginationParams);

	List<Endereco> filter(PaginationParams paginationParams);
	
	List<Endereco> search(String searchText);

	Endereco save(Endereco entity);

	Endereco update(Endereco entity);
    List<Endereco> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
