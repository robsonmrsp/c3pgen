package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:49
**/
public class FilterItemType implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String description;  			

	
	public  FilterItemType() {
		
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
		
	
}