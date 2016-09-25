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
*  generated: 24/09/2016 12:52:18
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonSession implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String name;
	private String creationDate;
	private ArrayList<JsonRole> roles = new ArrayList<JsonRole>();	
	private JsonUser user;		
	
	public  JsonSession() {
		
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
	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}				
	
	public ArrayList<JsonRole> getRoles() {
		return roles;
	}
	
	public void setRoles(ArrayList<JsonRole> role) {
		this.roles = role;
	}

	public JsonUser getUser() {
		return user;
	}
	
	public void setUser(JsonUser user) {
		this.user = user;
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