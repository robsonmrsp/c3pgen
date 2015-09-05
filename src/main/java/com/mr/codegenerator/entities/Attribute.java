package com.mr.codegenerator.entities;

import java.util.List;

import com.mr.codegenerator.util.Util;

public class Attribute {
	private String name;
	private String displayName;
	private String tableFieldName;
	private Integer maxLen;
	private Boolean required = Boolean.FALSE;
	private Boolean unique = Boolean.FALSE;

	private AttributeType type;
	private String mask = "";
	private String dateFormat = "dd/MM/yyyy";
	private ViewAproach viewAproach = new ViewAproach();
	private String defaultValue = "";
	private String placeholder;
	
	private List<ValidationRule> validationRules;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public AttributeType getType() {
		return type;
	}

	public void setType(AttributeType type) {
		this.type = type;
	}

	public String getMask() {
		return mask;
	}

	public void setMask(String mask) {
		this.mask = mask;
	}

	public String getPlaceholder() {
		if (placeholder == null) {
			setPlaceholder(getDisplayName());
		}
		return placeholder;
	}

	public void setPlaceholder(String placeholder) {
		this.placeholder = placeholder;
	}

	public String getDisplayName() {
		if (displayName == null) {
			setDisplayName(Util.firstUpperCase(getName()));
		}
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public List<ValidationRule> getValidationRules() {
		return validationRules;
	}

	public void setValidationRules(List<ValidationRule> validationRules) {
		this.validationRules = validationRules;
	}

	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

	@Override
	public String toString() {
		return "Attribute [name=" + name + ", displayName=" + displayName + ", type=" + type + ", mask=" + mask + ", dateFormat=" + dateFormat + ", placeholder=" + placeholder + ", validationRules=" + validationRules + "]";
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public ViewAproach getViewAproach() {
		return viewAproach;
	}

	public void setViewAproach(ViewAproach viewAproach) {
		this.viewAproach = viewAproach;
	}

	public String getTableFieldName() {
		return tableFieldName;
	}

	public void setTableFieldName(String tableFieldName) {
		this.tableFieldName = tableFieldName;
	}

	public Integer getMaxLen() {
		return maxLen;
	}

	public void setMaxLen(Integer maxLen) {
		this.maxLen = maxLen;
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
}
