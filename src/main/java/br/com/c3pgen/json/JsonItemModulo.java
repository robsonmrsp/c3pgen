package br.com.c3pgen.json;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;


/**
*  generated: 05/08/2016 15:23:43
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonItemModulo implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String name;
	private String yamlContent;
	private JsonModulo modulo;		
	
	public  JsonItemModulo() {
		
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
	public String getYamlContent() {
		return yamlContent;
	}

	public void setYamlContent(String yamlContent) {
		this.yamlContent = yamlContent;
	}
	
	public JsonModulo getModulo() {
		return modulo;
	}
	
	public void setModulo(JsonModulo modulo) {
		this.modulo = modulo;
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