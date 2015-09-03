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
* generated: 03/09/2015 14:51:48
Entity [name=ItemType, displayName=Tipo de Item, hasOwner=false, attributes=[Attribute [name=name, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=description, displayName=Descrição, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[]]
**/
@Entity
@Audited
@Table(name = "RBAC_ITEM_TYPE")
@SequenceGenerator(name = "ITEMTYPE_SEQUENCE", sequenceName = "ITEMTYPE_SEQUENCE")
public class ItemType extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ITEMTYPE_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;  			
		
	@Column(name = "DESCRIPTION")
	private String description;  			
	
		
	public  ItemType() {
		
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
	
}
