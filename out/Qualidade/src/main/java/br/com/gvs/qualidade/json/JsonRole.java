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
*  generated: 03/09/2016 22:18:34
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonRole implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String authority;
	private String description;
	private ArrayList<JsonSession> sessions = new ArrayList<JsonSession>();	
	private ArrayList<JsonUser> users = new ArrayList<JsonUser>();	
	private ArrayList<JsonPermission> permissions = new ArrayList<JsonPermission>();	
	
	public  JsonRole() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public ArrayList<JsonSession> getSessions() {
		return sessions;
	}
	
	public void setSessions(ArrayList<JsonSession> session) {
		this.sessions = session;
	}

	public ArrayList<JsonUser> getUsers() {
		return users;
	}
	
	public void setUsers(ArrayList<JsonUser> user) {
		this.users = user;
	}

	public ArrayList<JsonPermission> getPermissions() {
		return permissions;
	}
	
	public void setPermissions(ArrayList<JsonPermission> permission) {
		this.permissions = permission;
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