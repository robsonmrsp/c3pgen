package br.com.c3pgen.model.filter;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;


import br.com.c3pgen.serialization.CustomLocalDateSerializer;
import br.com.c3pgen.serialization.CustomLocalDateDeserializer;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.serialization.CustomLocalDateTimeSerializer;
import br.com.c3pgen.serialization.CustomLocalDateTimeDeserializer;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterApplication implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String skin;  			
	
	private String description;  			
	
	private String rootPackage;  			

	
	public  FilterApplication() {
		
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getSkin() {
		return skin;
	}

	public void setSkin(String skin) {
		this.skin = skin;
	}
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	public String getRootPackage() {
		return rootPackage;
	}

	public void setRootPackage(String rootPackage) {
		this.rootPackage = rootPackage;
	}
		
	
}