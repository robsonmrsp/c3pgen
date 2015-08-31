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
Entity [name=AttributeType, displayName=null, hasOwner=true, attributes=[Attribute [name=className, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=format, displayName=Formato, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=attribute, model=Attribute, viewAproach=com.mr.codegenerator.entities.ViewAproach@2344fc66, type=OneToOne, displayName=Tipo, implementation=]]]
**/
@Entity
@Audited
@Table(name = "ATTRIBUTE_TYPE")
@SequenceGenerator(name = "ATTRIBUTETYPE_SEQUENCE", sequenceName = "ATTRIBUTETYPE_SEQUENCE")
public class AttributeType extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ATTRIBUTETYPE_SEQUENCE")	
	private Integer id;
		
	@Column(name = "CLASSNAME")
	private String className;  			
		
	@Column(name = "FORMAT")
	private String format;  			
	
	@OneToOne
	@JoinColumn(name = "ID_ATTRIBUTE")
	private Attribute attribute;
	
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;
	
	public  Client getOwner() {
		return owner;
	}
	
	public void setOwner(Client owner) {
		this.owner = owner;
	}
		
	public  AttributeType() {
		
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
	public Attribute getAttribute() {
		return attribute;
	}
	
	public void setAttribute(Attribute attribute) {
		this.attribute = attribute;
	}
	
}
