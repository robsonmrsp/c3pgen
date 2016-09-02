package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.model.Departamento;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 02/09/2016 16:23:48
**/
public interface DepartamentoService {

	Departamento get(Integer id);

	List<Departamento> all();
	
	Pager<Departamento> all(PaginationParams paginationParams);

	Departamento get(Integer id, Client client);

	List<Departamento> all(Client owner);
	
	List<Departamento> filter(PaginationParams paginationParams, Client owner);
	
	Pager<Departamento> all(PaginationParams paginationParams, Client owner);
	
	List<Departamento> filter(PaginationParams paginationParams);
	
	List<Departamento> search(String searchText);

	Departamento save(Departamento entity);

	Departamento update(Departamento entity);
    List<Departamento> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
