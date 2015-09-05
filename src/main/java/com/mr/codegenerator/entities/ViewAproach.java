package com.mr.codegenerator.entities;

import java.util.List;

public class ViewAproach {
	private String type = "textfield"; // Datepicker , Combo , Radio, Check,
										// RadioGroup, CheckGroup, Modal
	private String contentType;

	private String comboId = "id";
	private String comboName = "name";
	private String comboVal = "name";

	// para o modal
	// returnValues : valores devolvidos pelo modal que deveriam ser
	// aproveitados.

	private String textField;
	private String hiddenField;
	private List<String> outputValues;

	// usado em casos de checkgroup ou radiogroup
	private List<String> values;

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

	public List<String> getValues() {
		return values;
	}

	public void setValues(List<String> values) {
		this.values = values;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public List<String> getOutputValues() {
		return outputValues;
	}

	public void setOutputValues(List<String> outputValues) {
		this.outputValues = outputValues;
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

	public String getComboVal() {
		return comboVal;
	}

	public void setComboVal(String comboVal) {
		this.comboVal = comboVal;
	}
}
