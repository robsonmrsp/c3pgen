package br.com.c3pgen.json;

import java.io.Serializable;

import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 03/09/2015 14:51:48
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonItemType implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String name;
	private String description;
	
	public  JsonItemType() {
		
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
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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