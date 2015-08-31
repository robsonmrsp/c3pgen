package br.com.c3pgen.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Type;
import org.hibernate.envers.Audited;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import br.com.c3pgen.serialization.CustomLocalDateSerializer;
import br.com.c3pgen.serialization.CustomLocalDateTimeSerializer;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

/**
* generated: 30/08/2015 20:23:12
Entity [name=ViewApproach, displayName=null, hasOwner=true, attributes=[Attribute [name=type, displayName=Tipo, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=comboId, displayName=Id visto no combo, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=comboName, displayName=Nome visto no combo, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=comboVal, displayName=Valor visto no combo, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=textField, displayName=Campo de texto no modal, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=hiddenField, displayName=Campo de escondido do modal, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=attribute, model=Attribute, viewAproach=com.mr.codegenerator.entities.ViewAproach@6a2bcfcb, type=OneToOne, displayName=Atributo, implementation=], Relationship [name=relationship, model=Relationship, viewAproach=com.mr.codegenerator.entities.ViewAproach@4de8b406, type=OneToOne, displayName=Relacionamento, implementation=]]]
**/
@Entity
@Audited
@Table(name = "VIEW_APPROACH")
@SequenceGenerator(name = "VIEWAPPROACH_SEQUENCE", sequenceName = "VIEWAPPROACH_SEQUENCE")
public class ViewApproach extends AbstractTimestampEntity{
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
	
	@OneToOne
	@JoinColumn(name = "ID_ATTRIBUTE")
	private Attribute attribute;
	
	@OneToOne
	@JoinColumn(name = "ID_RELATIONSHIP")
	private Relationship relationship;
	
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;
	
	public  Client getOwner() {
		return owner;
	}
	
	public void setOwner(Client owner) {
		this.owner = owner;
	}
		
	public  ViewApproach() {
		
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
	public Attribute getAttribute() {
		return attribute;
	}
	
	public void setAttribute(Attribute attribute) {
		this.attribute = attribute;
	}
	public Relationship getRelationship() {
		return relationship;
	}
	
	public void setRelationship(Relationship relationship) {
		this.relationship = relationship;
	}
	
}
