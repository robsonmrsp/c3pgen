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
import javax.persistence.UniqueConstraint;		

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
* generated: 30/08/2015 20:23:11
Entity [name=Application, displayName=null, hasOwner=true, attributes=[Attribute [name=name, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=skin, displayName=Template, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=rootPackage, displayName=Pacote raiz, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=entities, model=TheEntity, viewAproach=com.mr.codegenerator.entities.ViewAproach@153f5a29, type=OneToMany, displayName=Entidades, implementation=]]]
**/
@Entity
@Audited

@Table(name = "APPLICATION", uniqueConstraints = {
		@UniqueConstraint(name = "APPLICATION_SKIN", columnNames = { "SKIN" }), 
		@UniqueConstraint(name = "APPLICATION_ROOT_PACKAGE", columnNames = { "ROOT_PACKAGE" }), 
})
@SequenceGenerator(name = "APPLICATION_SEQUENCE", sequenceName = "APPLICATION_SEQUENCE")
public class Application extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "APPLICATION_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;  			
		
	@Column(name = "SKIN")
	private String skin;  			
		
	@Column(name = "ROOT_PACKAGE")
	private String rootPackage;  			
	
	@OneToMany(mappedBy="application")
	private List<TheEntity> entities;		
	
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;
	
	public  Client getOwner() {
		return owner;
	}
	
	public void setOwner(Client owner) {
		this.owner = owner;
	}
		
	public  Application() {
		
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
	public String getSkin() {
		return skin;
	}

	public void setSkin(String skin) {
		this.skin = skin;
	}
	public String getRootPackage() {
		return rootPackage;
	}

	public void setRootPackage(String rootPackage) {
		this.rootPackage = rootPackage;
	}
	public void setEntities(List<TheEntity> entities){
		this.entities = entities;
	}
	
	public List<TheEntity>  getEntities() {
		if(this.entities == null){
			setEntities(new ArrayList<TheEntity>());
		}
		return this.entities;
	}
		
	public boolean addEntities(TheEntity theEntity){
		theEntity.setApplication(this);
		return getEntities().add(theEntity);
	}
	
	public boolean removeEntities(TheEntity theEntity){
		theEntity.setApplication(null);
		return getEntities().remove(theEntity);
	}
	
	
}
