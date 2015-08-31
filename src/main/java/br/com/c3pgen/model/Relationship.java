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
Entity [name=Relationship, displayName=null, hasOwner=true, attributes=[Attribute [name=name, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=displayName, displayName=Nome apresentado na tela, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=ownerName, displayName=Dono do relacionamento, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=model, displayName=Modelo, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=uniDirecional, displayName=É unidirecional, type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=entity, model=TheEntity, viewAproach=com.mr.codegenerator.entities.ViewAproach@7921b0a2, type=ManyToOne, displayName=Entidade, implementation=], Relationship [name=viewApproach, model=ViewApproach, viewAproach=com.mr.codegenerator.entities.ViewAproach@174d20a, type=ManyToOne, displayName=Tipo, implementation=]]]
**/
@Entity
@Audited
@Table(name = "RELATIONSHIP")
@SequenceGenerator(name = "RELATIONSHIP_SEQUENCE", sequenceName = "RELATIONSHIP_SEQUENCE")
public class Relationship extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RELATIONSHIP_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;  			
		
	@Column(name = "DISPLAY_NAME")
	private String displayName;  			
		
	@Column(name = "OWNER_NAME")
	private String ownerName;  			
		
	@Column(name = "MODEL")
	private String model;  			
		
	@Column(name = "UNIDIRECIONAL")
	private Boolean uniDirecional;  			
	
	@ManyToOne
	@JoinColumn(name = "ID_ENTITY")
	private TheEntity entity;		
	
	@ManyToOne
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
		
	public  Relationship() {
		
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
	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}
	public Boolean getUniDirecional() {
		return uniDirecional;
	}

	public void setUniDirecional(Boolean uniDirecional) {
		this.uniDirecional = uniDirecional;
	}
	public TheEntity getEntity() {
		return entity;
	}
	
	public void setEntity(TheEntity theEntity) {
		this.entity = theEntity;
	}
	
	public ViewApproach getViewApproach() {
		return viewApproach;
	}
	
	public void setViewApproach(ViewApproach viewApproach) {
		this.viewApproach = viewApproach;
	}
	
	
}
