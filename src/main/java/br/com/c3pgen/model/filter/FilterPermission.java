package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:49
**/
public class FilterPermission implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			

	private Integer operation;		
	private Integer item;		
	
	public  FilterPermission() {
		
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
		
	public Integer getOperation() {
		return operation;
	}
	
	public void setOperation(Integer operation) {
		this.operation = operation;
	}
	public Integer getItem() {
		return item;
	}
	
	public void setItem(Integer item) {
		this.item = item;
	}
	
}