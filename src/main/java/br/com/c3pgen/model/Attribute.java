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
Entity [name=Attribute, displayName=null, hasOwner=true, attributes=[Attribute [name=name, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=displayName, displayName=Nome apresentado na tela, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=maxLen, displayName=Tamanho máximo, type=AttributeType [className=Integer], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=tableFieldName, displayName=Nome da coluna na tabela, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=masc, displayName=Formato de Máscara, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=defaultValue, displayName=Valor padrão, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=placeholder, displayName=Placeholder, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=required, displayName=Obrigatório, type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=unique, displayName=Único, type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=entity, model=TheEntity, viewAproach=com.mr.codegenerator.entities.ViewAproach@6276ae34, type=ManyToOne, displayName=Entidade, implementation=], Relationship [name=type, model=AttributeType, viewAproach=com.mr.codegenerator.entities.ViewAproach@7946e1f4, type=OneToOne, displayName=Tipo, implementation=], Relationship [name=viewApproach, model=ViewApproach, viewAproach=com.mr.codegenerator.entities.ViewAproach@3c09711b, type=OneToOne, displayName=Tipo, implementation=]]]
**/
@Entity
@Audited
@Table(name = "ATTRIBUTE")
@SequenceGenerator(name = "ATTRIBUTE_SEQUENCE", sequenceName = "ATTRIBUTE_SEQUENCE")
public class Attribute extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ATTRIBUTE_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;  			
		
	@Column(name = "DISPLAY_NAME")
	private String displayName;  			
		
	@Column(name = "MAX_LEN")
	private Integer maxLen;  			
		
	@Column(name = "TABLE_FIELD_NAME")
	private String tableFieldName;  			
		
	@Column(name = "MASK")
	private String masc;  			
		
	@Column(name = "DEFAULT_VALUE")
	private String defaultValue;  			
		
	@Column(name = "PLACEHOLDER")
	private String placeholder;  			
		
	@Column(name = "REQUIRED")
	private Boolean required;  			
		
	@Column(name = "UNIQUE_FIELD")
	private Boolean unique;  			
	
	@ManyToOne
	@JoinColumn(name = "ID_ENTITY")
	private TheEntity entity;		
	
	@OneToOne(optional=false, mappedBy="attribute")
	@JoinColumn(name = "ID_TYPE")
	private AttributeType type;
	
	@OneToOne(optional=false, mappedBy="attribute")
	@JoinColumn(name = "ID_VIEWAPPROACH")
	private ViewApproach viewApproach;
	
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;
	
	public  Client getOwner() {
		return owner;
	}
	
	public void setOwner(Client owner) {
		this.owner = owner;
	}
		
	public  Attribute() {
		
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
	public Integer getMaxLen() {
		return maxLen;
	}

	public void setMaxLen(Integer maxLen) {
		this.maxLen = maxLen;
	}
	public String getTableFieldName() {
		return tableFieldName;
	}

	public void setTableFieldName(String tableFieldName) {
		this.tableFieldName = tableFieldName;
	}
	public String getMasc() {
		return masc;
	}

	public void setMasc(String masc) {
		this.masc = masc;
	}
	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}
	public String getPlaceholder() {
		return placeholder;
	}

	public void setPlaceholder(String placeholder) {
		this.placeholder = placeholder;
	}
	public Boolean getRequired() {
		return required;
	}

	public void setRequired(Boolean required) {
		this.required = required;
	}
	public Boolean getUnique() {
		return unique;
	}

	public void setUnique(Boolean unique) {
		this.unique = unique;
	}
	public TheEntity getEntity() {
		return entity;
	}
	
	public void setEntity(TheEntity theEntity) {
		this.entity = theEntity;
	}
	
	public AttributeType getType() {
		return type;
	}
	
	public void setType(AttributeType attributeType) {
		this.type = attributeType;
	}
	public ViewApproach getViewApproach() {
		return viewApproach;
	}
	
	public void setViewApproach(ViewApproach viewApproach) {
		this.viewApproach = viewApproach;
	}
	
}
