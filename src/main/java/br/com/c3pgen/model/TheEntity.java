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
 * generated: 03/09/2015 14:51:48 Entity [name=TheEntity, displayName=Entidade,
 * hasOwner=true, attributes=[Attribute [name=name, displayName=null,
 * type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy,
 * placeholder=null, validationRules=null], Attribute [name=displayName,
 * displayName=null, type=AttributeType [className=String], mask=,
 * dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute
 * [name=tableName, displayName=null, type=AttributeType [className=String],
 * mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null],
 * Attribute [name=hasOwner, displayName=null, type=AttributeType
 * [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null,
 * validationRules=null], Attribute [name=hasMobile, displayName=null,
 * type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy,
 * placeholder=null, validationRules=null]], relationships=[Relationship
 * [name=application, model=Application,
 * viewAproach=com.mr.codegenerator.entities.ViewAproach@2669b199,
 * type=ManyToOne, displayName=Aplicação, implementation=], Relationship
 * [name=attributes, model=Attribute,
 * viewAproach=com.mr.codegenerator.entities.ViewAproach@2344fc66,
 * type=OneToMany, displayName=Atributo, implementation=], Relationship
 * [name=relationships, model=Relationship,
 * viewAproach=com.mr.codegenerator.entities.ViewAproach@458ad742,
 * type=OneToMany, displayName=Relacionamento, implementation=]]]
 **/
@Entity
@Audited
@Table(name = "ENTITY")
@SequenceGenerator(name = "THEENTITY_SEQUENCE", sequenceName = "THEENTITY_SEQUENCE")
public class TheEntity extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "THEENTITY_SEQUENCE")
	private Integer id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "DISPLAY_NAME")
	private String displayName;

	@Column(name = "TABLE_NAME")
	private String tableName;

	@Column(name = "HAS_OWNER")
	private Boolean hasOwner;

	@Column(name = "HAS_MOBILE")
	private Boolean hasMobile;

	@ManyToOne
	@JoinColumn(name = "ID_APPLICATION")
	private Application application;

	@OneToMany(mappedBy = "entity")
	@Cascade(CascadeType.ALL)
	private List<Attribute> attributes;

	@OneToMany(mappedBy = "entity")
	@Cascade(CascadeType.ALL)
	private List<Relationship> relationships;

	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public TheEntity() {

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

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public Boolean getHasOwner() {
		return hasOwner;
	}

	public void setHasOwner(Boolean hasOwner) {
		this.hasOwner = hasOwner;
	}

	public Boolean getHasMobile() {
		return hasMobile;
	}

	public void setHasMobile(Boolean hasMobile) {
		this.hasMobile = hasMobile;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public void setAttributes(List<Attribute> attributes) {
		this.attributes = attributes;
	}

	public List<Attribute> getAttributes() {
		if (this.attributes == null) {
			setAttributes(new ArrayList<Attribute>());
		}
		return this.attributes;
	}

	public boolean addAttributes(Attribute attribute) {
		attribute.setEntity(this);
		return getAttributes().add(attribute);
	}

	public boolean removeAttributes(Attribute attribute) {
		attribute.setEntity(null);
		return getAttributes().remove(attribute);
	}

	public void setRelationships(List<Relationship> relationships) {
		this.relationships = relationships;
	}

	public List<Relationship> getRelationships() {
		if (this.relationships == null) {
			setRelationships(new ArrayList<Relationship>());
		}
		return this.relationships;
	}

	public boolean addRelationships(Relationship relationship) {
		relationship.setEntity(this);
		return getRelationships().add(relationship);
	}

	public boolean removeRelationships(Relationship relationship) {
		relationship.setEntity(null);
		return getRelationships().remove(relationship);
	}

}
