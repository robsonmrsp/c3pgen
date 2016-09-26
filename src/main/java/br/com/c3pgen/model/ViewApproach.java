package br.com.c3pgen.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

/**
 * generated: 03/09/2015 14:51:48 Entity [name=ViewApproach, displayName=Modo de
 * Exibição, hasOwner=true, attributes=[Attribute [name=type, displayName=Tipo,
 * type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy,
 * placeholder=null, validationRules=null], Attribute [name=comboId,
 * displayName=Id visto no combo, type=AttributeType [className=String], mask=,
 * dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute
 * [name=comboName, displayName=Nome visto no combo, type=AttributeType
 * [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null,
 * validationRules=null], Attribute [name=comboVal, displayName=Valor visto no
 * combo, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy,
 * placeholder=null, validationRules=null], Attribute [name=textField,
 * displayName=Campo de texto no modal, type=AttributeType [className=String],
 * mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null],
 * Attribute [name=hiddenField, displayName=Campo de escondido do modal,
 * type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy,
 * placeholder=null, validationRules=null]], relationships=[]]
 **/
@Entity
@Audited
@Table(name = "VIEW_APPROACH")
@SequenceGenerator(name = "VIEWAPPROACH_SEQUENCE", sequenceName = "VIEWAPPROACH_SEQUENCE")
public class ViewApproach extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "VIEWAPPROACH_SEQUENCE")
	private Integer id;

	@Column(name = "TYPE")
	private String type;

	@Column(name = "COMBO_ID")
	private String comboId;

	@Column(name = "COMBO_NAME")
	private String comboName;

	@Column(name = "COMBO_VAL")
	private String comboVal;

	@Column(name = "TEXT_FIELD")
	private String textField;

	@Column(name = "HIDDEN_FIELD")
	private String hiddenField;
	
	
	
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	public Client getOwner() {
		return owner;
	}

	public static ViewApproach comboInstance(String comboId, String comboVal) {
		ViewApproach approach = new ViewApproach();
		approach.setType("combo");
		approach.setComboId(comboId);
		approach.setComboVal(comboVal);
		return approach;
	}

	public static ViewApproach noneInstance() {
		ViewApproach approach = new ViewApproach();
		approach.setType("none");
		return approach;
	}

	public static ViewApproach multiselectInstance() {
		ViewApproach approach = new ViewApproach();
		approach.setType("multiselect");
		return approach;
	}

	public static ViewApproach modalInstance(String textField, String hiddenField) {
		ViewApproach approach = new ViewApproach();
		approach.setType("modal");
		approach.setHiddenField(hiddenField);
		approach.setTextField(textField);
		return approach;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public ViewApproach() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		if (type == null) {
			setType("NONE");
		}
		if(type.equalsIgnoreCase("DateTimepicker")){
			setType("datepicker");
		}
		
		return type.toLowerCase();
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
