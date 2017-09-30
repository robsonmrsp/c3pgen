package br.com.c3pgen.json;

import java.io.Serializable;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;

/**
*  generated: 03/09/2015 14:51:49
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonOperation implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String name;
	private Boolean canEdit;
	private Boolean canRead;
	private Boolean canUpdate;
	private Boolean canDelete;
	private Boolean canExecute;
	private ArrayList<JsonPermission> permissions = new ArrayList<JsonPermission>();		
	
	public  JsonOperation() {
		
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
	public Boolean getCanEdit() {
		return canEdit;
	}

	public void setCanEdit(Boolean canEdit) {
		this.canEdit = canEdit;
	}
	public Boolean getCanRead() {
		return canRead;
	}

	public void setCanRead(Boolean canRead) {
		this.canRead = canRead;
	}
	public Boolean getCanUpdate() {
		return canUpdate;
	}

	public void setCanUpdate(Boolean canUpdate) {
		this.canUpdate = canUpdate;
	}
	public Boolean getCanDelete() {
		return canDelete;
	}

	public void setCanDelete(Boolean canDelete) {
		this.canDelete = canDelete;
	}
	public Boolean getCanExecute() {
		return canExecute;
	}

	public void setCanExecute(Boolean canExecute) {
		this.canExecute = canExecute;
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