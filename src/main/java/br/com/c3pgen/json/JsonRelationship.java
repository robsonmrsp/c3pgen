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
public class JsonRelationship implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String name;
	private String displayName;
	private String ownerName;
	private String model;
	private Boolean uniDirecional;
	private JsonTheEntity entity;		
	private JsonViewApproach viewApproach;		
	
	public  JsonRelationship() {
		
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
	
	public JsonTheEntity getEntity() {
		return entity;
	}
	
	public void setEntity(JsonTheEntity theEntity) {
		this.entity = theEntity;
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