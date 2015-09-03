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
public class FilterTheEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String displayName;  			
	
	private String tableName;  			
	
	private Boolean hasOwner;  			
	
	private Boolean hasMobile;  			

	private Integer application;		
	
	public  FilterTheEntity() {
		
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public Boolean getHasOwner() {
		return hasOwner;
	}

	public void setHasOwner(Boolean hasOwner) {
		this.hasOwner = hasOwner;
	}
	public Boolean getHasMobile() {
		return hasMobile;
	}

	public void setHasMobile(Boolean hasMobile) {
		this.hasMobile = hasMobile;
	}
		
	public Integer getApplication() {
		return application;
	}
	
	public void setApplication(Integer application) {
		this.application = application;
	}
	
}