package br.com.c3pgen.json;

import java.io.Serializable;
import java.util.ArrayList;

import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 03/09/2015 14:51:47
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonApplication implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String name;
	private String skin;
	private String description;
	private String rootPackage;
	private ArrayList<JsonTheEntity> entities = new ArrayList<JsonTheEntity>();		
	
	public  JsonApplication() {
		
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
	
	public ArrayList<JsonTheEntity> getEntities() {
		return entities;
	}
	
	public void setEntities(ArrayList<JsonTheEntity> theEntity) {
		this.entities = theEntity;
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