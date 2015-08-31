package br.com.c3pgen.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.model.Endereco;
import br.com.c3pgen.persistence.pagination.Pager;
import br.com.c3pgen.persistence.pagination.PaginationParams;
/**
*  generated: 30/08/2015 20:23:12
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
