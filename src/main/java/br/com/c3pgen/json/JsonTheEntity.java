package br.com.c3pgen.json;

import java.io.Serializable;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;

/**
 * generated: 03/09/2015 14:51:48
 **/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonTheEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private Integer posX;
	private Integer posY;
	private String viewId;

	private SyncOperation syncOperation;

	private String name;
	private String color;
	private String notes;
	private String hash;
	private String displayName;
	private String tableName;
	private Boolean hasOwner;
	private Boolean hasMobile;

	private JsonApplication application;
	private ArrayList<JsonAttribute> attributes = new ArrayList<JsonAttribute>();
	private ArrayList<JsonRelationship> relationships = new ArrayList<JsonRelationship>();

	public JsonTheEntity() {

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

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public Boolean getHasOwner() {
		return hasOwner;
	}

	public void setHasOwner(Boolean hasOwner) {
		this.hasOwner = hasOwner;
	}

	public Boolean getHasMobile() {
		return hasMobile;
	}

	public void setHasMobile(Boolean hasMobile) {
		this.hasMobile = hasMobile;
	}

	public JsonApplication getApplication() {
		return application;
	}

	public void setApplication(JsonApplication application) {
		this.application = application;
	}

	public ArrayList<JsonAttribute> getAttributes() {
		return attributes;
	}

	public void setAttributes(ArrayList<JsonAttribute> attribute) {
		this.attributes = attribute;
	}

	public ArrayList<JsonRelationship> getRelationships() {
		return relationships;
	}

	public void setRelationships(ArrayList<JsonRelationship> relationship) {
		this.relationships = relationship;
	}

	public SyncOperation getSyncOperation() {
		if (syncOperation == null) {
			this.syncOperation = SyncOperation.NONE;
		}
		return syncOperation;
	}

	public void setSyncOperation(SyncOperation syncOperation) {
		this.syncOperation = syncOperation;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Integer getPosX() {
		return posX;
	}

	public void setPosX(Integer posX) {
		this.posX = posX;
	}

	public Integer getPosY() {
		return posY;
	}

	public void setPosY(Integer posY) {
		this.posY = posY;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getHash() {
		if (hash == null) {
			setHash(notes);
		}
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getViewId() {
		return viewId;
	}

	public void setViewId(String viewId) {
		this.viewId = viewId;
	}
}