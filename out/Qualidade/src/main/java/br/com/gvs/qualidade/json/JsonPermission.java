package br.com.gvs.qualidade.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.gvs.core.json.SyncOperation;
import br.com.gvs.core.serialization.CustomSyncObjectIdDeserializer;
import br.com.gvs.core.serialization.CustomDoubleDeserializer;

/**
*  generated: 02/09/2016 16:23:49
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonPermission implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String name;
	private ArrayList<JsonRole> roles = new ArrayList<JsonRole>();	
	private JsonOperation operation;		
	private JsonItem item;		
	
	public  JsonPermission() {
		
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
	
	public ArrayList<JsonRole> getRoles() {
		return roles;
	}
	
	public void setRoles(ArrayList<JsonRole> role) {
		this.roles = role;
	}

	public JsonOperation getOperation() {
		return operation;
	}
	
	public void setOperation(JsonOperation operation) {
		this.operation = operation;
	}
	public JsonItem getItem() {
		return item;
	}
	
	public void setItem(JsonItem item) {
		this.item = item;
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