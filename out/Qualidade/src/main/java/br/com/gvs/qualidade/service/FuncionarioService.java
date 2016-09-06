package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.model.Funcionario;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 03/09/2016 22:18:32
**/
public interface FuncionarioService {

	Funcionario get(Integer id);

	List<Funcionario> all();
	
	Pager<Funcionario> all(PaginationParams paginationParams);

	Funcionario get(Integer id, Client client);

	List<Funcionario> all(Client owner);
	
	List<Funcionario> filter(PaginationParams paginationParams, Client owner);
	
	Pager<Funcionario> all(PaginationParams paginationParams, Client owner);
	
	List<Funcionario> filter(PaginationParams paginationParams);
	
	List<Funcionario> search(String searchText);

	Funcionario save(Funcionario entity);

	Funcionario update(Funcionario entity);
    List<Funcionario> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
