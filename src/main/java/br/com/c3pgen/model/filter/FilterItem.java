package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterItem implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String description;  			

	private Integer type;		
	
	public  FilterItem() {
		
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
		
	public Integer getType() {
		return type;
	}
	
	public void setType(Integer type) {
		this.type = type;
	}
	
}