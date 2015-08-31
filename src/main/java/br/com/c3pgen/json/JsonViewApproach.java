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
public class JsonViewApproach implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String type;
	private String comboId;
	private String comboName;
	private String comboVal;
	private String textField;
	private String hiddenField;
	private JsonAttribute attribute;	
	private JsonRelationship relationship;	
	
	public  JsonViewApproach() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	public String getComboId() {
		return comboId;
	}

	public void setComboId(String comboId) {
		this.comboId = comboId;
	}
	public String getComboName() {
		return comboName;
	}

	public void setComboName(String comboName) {
		this.comboName = comboName;
	}
	public String getComboVal() {
		return comboVal;
	}

	public void setComboVal(String comboVal) {
		this.comboVal = comboVal;
	}
	public String getTextField() {
		return textField;
	}

	public void setTextField(String textField) {
		this.textField = textField;
	}
	public String getHiddenField() {
		return hiddenField;
	}

	public void setHiddenField(String hiddenField) {
		this.hiddenField = hiddenField;
	}
	
	public JsonAttribute getAttribute() {
		return attribute;
	}
	
	public void setAttribute(JsonAttribute attribute) {
		this.attribute = attribute;
	}

	public JsonRelationship getRelationship() {
		return relationship;
	}
	
	public void setRelationship(JsonRelationship relationship) {
		this.relationship = relationship;
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