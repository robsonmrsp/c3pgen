package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterRelationship implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String type;  			
	
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
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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