package ${application.rootPackage}.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.LocalDate;
<#if application.multitenancy>
import ${application.corePackage}.model.Owner ;
</#if>

import ${application.rootPackage}.model.${entity.name};
import ${application.rootPackage}.persistence.Dao${entity.name};
import ${application.rootPackage}.model.filter.Filter${entity.name};

import ${application.corePackage}.persistence.pagination.Pager;
import ${application.corePackage}.rs.exception.ValidationException;
import ${application.corePackage}.persistence.pagination.PaginationParams;
import ${application.corePackage}.utils.DateUtil;
import ${application.corePackage}.utils.Util;
/* generated by JSetup ${JSetupVersion} :  at ${.now} */

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

	@Override
	public List<${entity.name}> search(String description) {
		return new ArrayList<${entity.name}>();
	}

<#if application.multitenancy>
	@Override
	public ${entity.name} get(Integer id, Owner  owner) {
		return dao${entity.name}.find(id, owner);
	}

	@Override
	public List<${entity.name}> all(Owner  owner) {
		return dao${entity.name}.getAll(owner);
	}

	@Override
	public Pager<${entity.name}> all(PaginationParams<Filter${entity.name}> paginationParams, Owner  owner) {

		return dao${entity.name}.getAll(paginationParams, owner);
	}
	
	@Override
	public List<${entity.name}> filter(PaginationParams<Filter${entity.name}> paginationParams, Owner  owner) {
		List<${entity.name}> list = dao${entity.name}.filter(paginationParams, owner);
		return list;
	}
	
	@Override
	public List<${entity.name}> filter(PaginationParams<Filter${entity.name}> paginationParams,  Owner  owner, Boolean equals) {
		List<${entity.name}> list = dao${entity.name}.filter(paginationParams, owner, equals);
		return list;
	}
	
	@Override
	public List<${entity.name}> filter(Filter${entity.name} filter${entity.name} , Owner  owner,  Boolean equals) {
		List<${entity.name}> list = dao${entity.name}.filter(filter${entity.name}, owner, equals);
		return list;
	}
<#else>
	@Override
	public List<${entity.name}> all() {
		return dao${entity.name}.getAll();
	}	
	@Override
	public Pager<${entity.name}> all(PaginationParams<Filter${entity.name}> paginationParams) {		
		return dao${entity.name}.getAll(paginationParams);
	} 
	
	@Override
	public List<${entity.name}> filter(PaginationParams<Filter${entity.name}> paginationParams,  Boolean equals) {
		List<${entity.name}> list = dao${entity.name}.filter(paginationParams, equals);
		return list;
	}
	
	@Override
	public List<${entity.name}> filter(Filter${entity.name} filter${entity.name} ,  Boolean equals) {
		List<${entity.name}> list = dao${entity.name}.filter(filter${entity.name}, equals);
		return list;
	}
</#if>

			
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
		Boolean del = Boolean.FALSE;
		try {
			del = dao${entity.name}.delete(id);
		} catch (ConstraintViolationException e) {
			throw new ValidationException(e, "Não é possível remover um registro que já está sendo utilizado por outro.");
		}
		return del;			
	}
}
//generated by JSetup ${JSetupVersion} :  at ${.now}