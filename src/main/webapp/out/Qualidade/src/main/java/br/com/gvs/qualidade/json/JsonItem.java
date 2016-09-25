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
*  generated: 24/09/2016 12:52:17
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonItem implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String name;
	private String description;
	private JsonItemType type;		
	private ArrayList<JsonPermission> permissions = new ArrayList<JsonPermission>();		
	
	public  JsonItem() {
		
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
	
	public JsonItemType getType() {
		return type;
	}
	
	public void setType(JsonItemType itemType) {
		this.type = itemType;
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