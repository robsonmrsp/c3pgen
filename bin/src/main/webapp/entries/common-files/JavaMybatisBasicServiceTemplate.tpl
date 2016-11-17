package ${package}.service;



import java.util.List;
import java.lang.Integer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.apache.log4j.Logger;

import ${application.rootPackage}.model.${entity.name};
import ${application.rootPackage}.model.filter.Filter${entity.name};
import ${application.rootPackage}.persistence.${entity.name}Mapper;

import ${application.corePackage}.pager.PagerConfig;
import ${application.corePackage}.pager.PagerInterface;
import ${application.corePackage}.pager.Pager;
import ${application.corePackage}.pager.PaginationParams;

/**
*  generated: ${.now}
**/
@Component
@Transactional
public class ${entity.name}Service {
	private static final Logger LOGGER = Logger.getLogger(${entity.name}Service.class);

	@Autowired
	private ${entity.name}Mapper mapper;

	public ${entity.name} carrega(Integer id){
		return mapper.carrega(id);
	}
	
	public ${entity.name} carrega${entity.name}(${entity.name} ${firstLower(entity.name)}){
		return mapper.carrega${entity.name}(${firstLower(entity.name)});
	}

	public List<${entity.name}> lista(){
		return mapper.lista();
	}
	
	public List<${entity.name}> filtra(Filter${entity.name} filter ){
	
		return mapper.filtra(filter);
	}
	
	public Pager<${entity.name}> pesquisa(PaginationParams<Filter${entity.name}> paginationParams ){
	
		Filter${entity.name} filter = paginationParams.getFilter();

		PagerConfig config = new PagerConfig(paginationParams.getPageSize(), paginationParams.getPage());

		List<${entity.name}> pesquisar = mapper.pesquisa(filter, config);

		Integer totalRecords = mapper.conta(filter, config);

		return new Pager<${entity.name}>(pesquisar, config.getCurrentPage(), totalRecords);
	}
	
	public ${entity.name} salva(${entity.name} ${firstLower(entity.name)}){
		mapper.salva(${firstLower(entity.name)});
		return ${firstLower(entity.name)};
	}
	
	public ${entity.name} atualiza(${entity.name} ${firstLower(entity.name)}){
		mapper.atualiza(${firstLower(entity.name)});
		return ${firstLower(entity.name)};
	}
	
	public Boolean deleta(Integer id){
		mapper.deleta(id);
		return Boolean.TRUE;
	}
}
