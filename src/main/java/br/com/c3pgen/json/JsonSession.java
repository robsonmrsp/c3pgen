package br.com.c3pgen.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 03/09/2015 14:51:49
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