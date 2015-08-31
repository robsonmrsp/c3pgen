package br.com.c3pgen.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 30/08/2015 20:23:12
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonAttribute implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String name;
	private String displayName;
	private Integer maxLen;
	private String tableFieldName;
	private String masc;
	private String defaultValue;
	private String placeholder;
	private Boolean required;
	private Boolean unique;
	private JsonTheEntity entity;		
	private JsonAttributeType type;	
	private JsonViewApproach viewApproach;	
	
	public  JsonAttribute() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
	
	public JsonTheEntity getEntity() {
		return entity;
	}
	
	public void setEntity(JsonTheEntity theEntity) {
		this.entity = theEntity;
	}
	public JsonAttributeType getType() {
		return type;
	}
	
	public void setType(JsonAttributeType attributeType) {
		this.type = attributeType;
	}

	public JsonViewApproach getViewApproach() {
		return viewApproach;
	}
	
	public void setViewApproach(JsonViewApproach viewApproach) {
		this.viewApproach = viewApproach;
	}

	public SyncOperation getSyncOperation (){
		if(syncOperation == null){
			this.syncOperation = SyncOperation.NONE;
		}
		return syncOperation;
	}
	
	public void setSyncOperation (SyncOperation  syncOperation){
		this.syncOperation = syncOperation;
	}
	
}