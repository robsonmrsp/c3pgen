package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 05/08/2016 15:23:43
**/
public class FilterItemModulo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String yamlContent;  			

	private Integer modulo;		
	
	public  FilterItemModulo() {
		
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getYamlContent() {
		return yamlContent;
	}

	public void setYamlContent(String yamlContent) {
		this.yamlContent = yamlContent;
	}
		
	public Integer getModulo() {
		return modulo;
	}
	
	public void setModulo(Integer modulo) {
		this.modulo = modulo;
	}
	
}