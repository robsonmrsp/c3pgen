package ${application.rootPackage}.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.ibatis.annotations.Param;

import ${application.corePackage}.pager.PagerConfig;

import ${application.rootPackage}.model.${entity.name};
import ${application.rootPackage}.model.filter.Filter${entity.name};


/**
*  generated: ${.now}
**/
public interface ${entity.name}Mapper {

	public ${entity.name} carrega(Integer id);
	
	public ${entity.name} carrega${entity.name}(${entity.name} ${firstLower(entity.name)});

	public List<${entity.name}> lista();
		
	public List<${entity.name}> pesquisa(@Param("${firstLower(entity.name)}") Filter${entity.name}  ${firstLower(entity.name)}, @Param("config") PagerConfig config);
	
	public Integer conta(@Param("${firstLower(entity.name)}")  Filter${entity.name} ${entity.name}, @Param("config") PagerConfig config);

	public void salva(${entity.name} ${firstLower(entity.name)});
	
	public void atualiza(${entity.name} ${firstLower(entity.name)});
	
	public void deleta(Integer id);
	
	public List<${entity.name}> filtra(Filter${entity.name} filter);

}