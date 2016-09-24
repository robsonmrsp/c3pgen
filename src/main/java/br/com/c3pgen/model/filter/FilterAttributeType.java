package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterAttributeType implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String className;  			
	
	private String format;  			

	
	public  FilterAttributeType() {
		
	}
	

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}
	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
		
	
}