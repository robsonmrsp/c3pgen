package ${application.rootPackage}.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

<#if entity.hasOwner>
import ${application.rootPackage}.model.Client;
</#if>

import ${application.rootPackage}.model.${entity.name};
import ${application.rootPackage}.persistence.Dao${entity.name};

import ${application.corePackage}.persistence.pagination.Pager;
import ${application.corePackage}.persistence.pagination.Pagination;
import ${application.corePackage}.persistence.pagination.PaginationParams;
import ${application.corePackage}.utils.DateUtil;
import ${application.corePackage}.utils.Util;

/**
*  generated: ${.now}
**/

@Named
@Transactional
public class ${entity.name}ServiceImp implements ${entity.name}Service {

	private static final Logger LOGGER = Logger.getLogger(${entity.name}ServiceImp.class);
	
	@Inject
	Dao${entity.name} dao${entity.name};

	@Override
	public ${entity.name} get(Integer id) {
		return dao${entity.name}.find(id);
	}
	
	<#if entity.hasOwner>
	@Override
	public ${entity.name} get(Integer id, Client client) {
		return dao${entity.name}.find(id, client);
	}

	@Override
	public List<${entity.name}> all(Client client) {
		return dao${entity.name}.getAll(client);
	}
	
	

	@Override
	public Pager<${entity.name}> all(PaginationParams paginationParams, Client owner) {
		Pagination<${entity.name}> pagination = dao${entity.name}.getAll(paginationParams, owner);
		return new Pager<${entity.name}>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
		@Override
	public List<${entity.name}> filter(PaginationParams paginationParams, Client owner) {
		List<${entity.name}> list = dao${entity.name}.filter(paginationParams, owner);
		return list;
	}
	
	</#if>

	@Override
	public Pager<${entity.name}> all(PaginationParams paginationParams) {
		Pagination<${entity.name}> pagination = dao${entity.name}.getAll(paginationParams);
		return new Pager<${entity.name}>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<${entity.name}> filter(PaginationParams paginationParams) {
		List<${entity.name}> list = dao${entity.name}.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<${entity.name}> all() {
		return dao${entity.name}.getAll();
	}

	@Override
	public List<${entity.name}> search(String description) {
		return new ArrayList<${entity.name}>();
	}
	
	public List<${entity.name}> last(LocalDateTime lastSyncDate){
		return dao${entity.name}.last(lastSyncDate);
	}
			
	@Override
	public ${entity.name} save(${entity.name} entity) {
		return dao${entity.name}.save(entity);
	}

	@Override
	public ${entity.name} update(${entity.name} entity) {
		return dao${entity.name}.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return dao${entity.name}.delete(id);
	}


}
