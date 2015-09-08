package br.com.c3pgen.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.envers.Audited;

/**
 * generated: 03/09/2015 14:51:47 Entity [name=Application,
 * displayName=Aplicação, hasOwner=true, attributes=[Attribute [name=name,
 * displayName=Nome, type=AttributeType [className=String], mask=,
 * dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute
 * [name=skin, displayName=Template, type=AttributeType [className=String],
 * mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null],
 * Attribute [name=description, displayName=Descrição, type=AttributeType
 * [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null,
 * validationRules=null], Attribute [name=rootPackage, displayName=Pacote raiz,
 * type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy,
 * placeholder=null, validationRules=null]], relationships=[Relationship
 * [name=entities, model=TheEntity,
 * viewApproach=com.mr.codegenerator.entities.ViewApproach@26f67b76,
 * type=OneToMany, displayName=Entidades, implementation=]]]
 **/
@Entity
@Audited
@Table(name = "APPLICATION", uniqueConstraints = { @UniqueConstraint(name = "APPLICATION_SKIN", columnNames = { "SKIN" }), @UniqueConstraint(name = "APPLICATION_ROOT_PACKAGE", columnNames = { "ROOT_PACKAGE" }), })
@SequenceGenerator(name = "APPLICATION_SEQUENCE", sequenceName = "APPLICATION_SEQUENCE")
public class Application extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "APPLICATION_SEQUENCE")
	private Integer id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "SKIN")
	private String skin;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "ROOT_PACKAGE")
	private String rootPackage;

	@OneToMany(mappedBy = "application")
	@Cascade(CascadeType.ALL)
	private List<TheEntity> entities;

	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public Application() {

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRootPackage() {
		return rootPackage;
	}

	public void setRootPackage(String rootPackage) {
		this.rootPackage = rootPackage;
	}

	public void setEntities(List<TheEntity> entities) {
		this.entities = entities;
	}

	public List<TheEntity> getEntities() {
		if (this.entities == null) {
			setEntities(new ArrayList<TheEntity>());
		}
		return this.entities;
	}

	public boolean addEntities(TheEntity theEntity) {
		theEntity.setApplication(this);
		return getEntities().add(theEntity);
	}

	public boolean removeEntities(TheEntity theEntity) {
		theEntity.setApplication(null);
		return getEntities().remove(theEntity);
	}

	public boolean hasMobApp() {
		
		return false;
	}

}
