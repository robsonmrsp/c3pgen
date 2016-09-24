package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterAttribute implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String displayName;  			
	
	private Integer maxLen;  			
	
	private String tableFieldName;  			
	
	private String masc;  			
	
	private String defaultValue;  			
	
	private String placeholder;  			
	
	private Boolean required;  			
	
	private Boolean unique;  			

	private Integer entity;		
	private Integer type;		
	private Integer viewApproach;		
	
	public  FilterAttribute() {
		
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
	public Integer getMaxLen() {
		return maxLen;
	}

	public void setMaxLen(Integer maxLen) {
		this.maxLen = maxLen;
	}
	public String getTableFieldName() {
		return tableFieldName;
	}

	public void setTableFieldName(String tableFieldName) {
		this.tableFieldName = tableFieldName;
	}
	public String getMasc() {
		return masc;
	}

	public void setMasc(String masc) {
		this.masc = masc;
	}
	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}
	public String getPlaceholder() {
		return placeholder;
	}

	public void setPlaceholder(String placeholder) {
		this.placeholder = placeholder;
	}
	public Boolean getRequired() {
		return required;
	}

	public void setRequired(Boolean required) {
		this.required = required;
	}
	public Boolean getUnique() {
		return unique;
	}

	public void setUnique(Boolean unique) {
		this.unique = unique;
	}
		
	public Integer getEntity() {
		return entity;
	}
	
	public void setEntity(Integer entity) {
		this.entity = entity;
	}
	public Integer getType() {
		return type;
	}
	
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getViewApproach() {
		return viewApproach;
	}
	
	public void setViewApproach(Integer viewApproach) {
		this.viewApproach = viewApproach;
	}
	
}