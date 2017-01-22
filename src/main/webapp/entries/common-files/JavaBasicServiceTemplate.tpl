package ${package}.service;

import java.util.List;
import org.joda.time.LocalDateTime;
<#if entity.hasOwner?? && entity.hasOwner>
import ${application.rootPackage}.model.Client;
</#if>
import ${application.rootPackage}.model.${entity.name};
import ${application.rootPackage}.model.filter.Filter${entity.name};

import ${application.corePackage}.persistence.pagination.Pager;
import ${application.corePackage}.persistence.pagination.PaginationParams;
/**
*  generated: ${.now}
**/
public interface ${entity.name}Service {

	${entity.name} get(Integer id);

	List<${entity.name}> all();
	
	Pager<${entity.name}> all(PaginationParams paginationParams);

	<#if entity.hasOwner?? &&  entity.hasOwner>
	${entity.name} get(Integer id, Client client);

	List<${entity.name}> all(Client owner);
	
	List<${entity.name}> filter(PaginationParams paginationParams, Client owner);
	
	Pager<${entity.name}> all(PaginationParams paginationParams, Client owner);
	</#if>
	List<${entity.name}> filter(Filter${entity.name} filter${entity.name});
	
	List<${entity.name}> filter(PaginationParams paginationParams, Boolean equals);
	
	List<${entity.name}> search(String searchText);

	${entity.name} save(${entity.name} entity);

	${entity.name} update(${entity.name} entity);
	
    List<${entity.name}> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
