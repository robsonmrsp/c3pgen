package br.com.c3pgen.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 30/08/2015 20:23:12
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonAttributeType implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String className;
	private String format;
	private JsonAttribute attribute;	
	
	public  JsonAttributeType() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}
	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
	
	public JsonAttribute getAttribute() {
		return attribute;
	}
	
	public void setAttribute(JsonAttribute attribute) {
		this.attribute = attribute;
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