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
*  generated: 30/08/2015 20:23:12
**/
public class FilterRelationship implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String displayName;  			
	
	private String ownerName;  			
	
	private String model;  			
	
	private Boolean uniDirecional;  			

	private Integer entity;		
	private Integer viewApproach;		
	
	public  FilterRelationship() {
		
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
	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}
	public Boolean getUniDirecional() {
		return uniDirecional;
	}

	public void setUniDirecional(Boolean uniDirecional) {
		this.uniDirecional = uniDirecional;
	}
		
	public Integer getEntity() {
		return entity;
	}
	
	public void setEntity(Integer entity) {
		this.entity = entity;
	}
	public Integer getViewApproach() {
		return viewApproach;
	}
	
	public void setViewApproach(Integer viewApproach) {
		this.viewApproach = viewApproach;
	}
	
}