package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:49
**/
public class FilterRole implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String authority;  			
	
	private String description;  			

	
	public  FilterRole() {
		
	}
	

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
		
	
}