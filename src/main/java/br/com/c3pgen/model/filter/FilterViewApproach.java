package br.com.c3pgen.model.filter;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;


import br.com.c3pgen.serialization.CustomLocalDateSerializer;
import br.com.c3pgen.serialization.CustomLocalDateDeserializer;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import br.com.c3pgen.serialization.CustomLocalDateTimeSerializer;
import br.com.c3pgen.serialization.CustomLocalDateTimeDeserializer;


/**
*  generated: 30/08/2015 20:23:12
**/
public class FilterViewApproach implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String type;  			
	
	private String comboId;  			
	
	private String comboName;  			
	
	private String comboVal;  			
	
	private String textField;  			
	
	private String hiddenField;  			

	
	public  FilterViewApproach() {
		
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
		
	
}