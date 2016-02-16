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

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.envers.Audited;

@Entity
@Audited
@Table(name = "ENTITY")
@SequenceGenerator(name = "THEENTITY_SEQUENCE", sequenceName = "THEENTITY_SEQUENCE")
public class ApplicationEntity extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	private static String CORE_ENTITIES = "BairroCepCidadeEnderecoEstadoPaisClientItemItemTypeOperationPermissionSession";

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "THEENTITY_SEQUENCE")
	private Integer id;

	private Integer posX;
	private Integer posY;

	@Column(name = "NAME")
	private String name;

	@Column(name = "NOTES")
	private String notes;

	@Column(name = "DISPLAY_NAME")
	private String displayName;

	@Column(name = "TABLE_NAME")
	private String tableName;

	@Column(name = "HAS_OWNER")
	private Boolean hasOwner = Boolean.FALSE;

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

	public ApplicationEntity() {

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

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Attribute getPrimaryAttribute() {
		if (getAttributes().size() > 0)
			return getAttributes().get(0);
		else
			return null;
	}

	public Attribute getSecondaryAttribute() {
		if (getAttributes().size() > 1)
			return getAttributes().get(1);
		else
			return null;
	}

	public Boolean getIsAppEntity() {
		return !CORE_ENTITIES.contains(getName());
	}

	public Attribute getTertiaryAttribute() {
		if (getAttributes().size() > 2)
			return getAttributes().get(2);
		else
			return null;
	}

	public Boolean getUniqueConstraints() {

		for (Attribute attribute : getAttributes()) {
			if (attribute.getUnique()) {
				return Boolean.TRUE;
			}
		}
		return Boolean.FALSE;
	}

	public Boolean getHasOwner() {
		if (hasOwner == null) {
			setHasOwner(Boolean.FALSE);
		}
		return hasOwner;
	}

	public void setHasOwner(Boolean hasOwner) {
		this.hasOwner = hasOwner;
	}

	@Override
	public String toString() {
		return name;
	}

	public Integer getPosX() {
		return posX;
	}

	public void setPosX(Integer posX) {
		this.posX = posX;
	}

	public Integer getPosY() {
		return posY;
	}

	public void setPosY(Integer posY) {
		this.posY = posY;
	}
}
