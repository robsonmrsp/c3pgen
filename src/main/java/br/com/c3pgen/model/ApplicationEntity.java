package br.com.c3pgen.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
// @Audited
@Table(name = "ENTITY")
@SequenceGenerator(name = "THEENTITY_SEQUENCE", sequenceName = "THEENTITY_SEQUENCE")
public class ApplicationEntity extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	private static String CORE_ENTITIES = "BairroCepCidadeEstadoPaisClientOperationSession";

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "THEENTITY_SEQUENCE")
	private Integer id;

	@Column(name = "POS_X")
	private Integer posX;

	@Column(name = "POS_Y")
	private Integer posY;

	@Column(name = "NAME")
	private String name;

	@Column(name = "COLOR")
	private String color;

	@Column(name = "NOTES")
	private String notes;

	@Column(name = "DISPLAY_NAME")
	private String displayName;

	@Column(name = "SEQUENCE_NAME")
	private String sequence;

	@Column(name = "PRIMARY_KEY_NAME")
	private String pk;

	@Column(name = "TABLE_NAME")
	private String tableName;

	@Column(name = "HAS_OWNER")
	private Boolean hasOwner = Boolean.FALSE;

	@Column(name = "HAS_MOBILE")
	private Boolean hasMobile;

	@ManyToOne
	@JoinColumn(name = "ID_APPLICATION")
	private Application application;

	@OneToMany(mappedBy = "entity", cascade = { javax.persistence.CascadeType.ALL }, orphanRemoval = true)
	@Cascade(CascadeType.ALL)
	private List<Attribute> attributes;

	@OneToMany
	@JoinTable(name = "REL_ENT", joinColumns = @JoinColumn(name = "ENT_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "REL_ID", referencedColumnName = "ID"))
	@Cascade(value = CascadeType.ALL)
	private List<Relationship> relationships;

	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	private Boolean multitenancy;

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;

		for (Attribute attribute : getAttributes()) {
			attribute.setOwner(owner);
		}
		for (Relationship relationship : getRelationships()) {
			relationship.setOwner(owner);
		}
	}

	public ApplicationEntity(String name, String displayName, String tableName) {
		this(name, displayName, tableName, true);
	}

	public ApplicationEntity(String name, String displayName, String tableName, Boolean multitenancy) {
		this(name, tableName);
		this.displayName = displayName;
		this.setMultitenancy(multitenancy);
	}

	public ApplicationEntity(String name, String tableName) {
		super();
		this.name = name;
		this.tableName = tableName;
		this.hasMobile = Boolean.FALSE;
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
		if (displayName == null) {
			setDisplayName(getName());
		}
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getTableName() {
		if (tableName.equalsIgnoreCase("user")) {
			setTableName("TB_USER");
		}
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public Boolean getHasMobile() {
		if (hasMobile == null) {
			setHasMobile(Boolean.FALSE);
		}
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

	public Attribute getPrimaryStringAttribute() {
		for (Attribute a : getAttributes()) {
			if (a.getType().getClassName().contains("String"))
				return a;
		}
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

	public Boolean getCompleteSearch() {
		int relationsCount = 0;
		for (Relationship relationship : getRelationships()) {
			if (!relationship.getType().equalsIgnoreCase("OneToMany") && !relationship.getType().equalsIgnoreCase("ManyToMany")) {
				relationsCount++;
			}
		}

		return (relationsCount + getCompleteSearches().size()) > 0;
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

	// pra começar vamos devolver apenas 1
	public List<Attribute> getBasicSearches() {
		List<Attribute> retAttr = new ArrayList<Attribute>();

		for (Attribute attribute : getAttributes()) {
			if (attribute.getBasicSearch() && !attribute.getType().getClassName().equalsIgnoreCase("Boolean") && !attribute.getViewApproach().getType().equalsIgnoreCase("upload")) {
				retAttr.add(attribute);
				return retAttr;
			}
		}

		for (Attribute attribute : getAttributes()) {
			if (!attribute.getType().getClassName().equalsIgnoreCase("Boolean") && !attribute.getViewApproach().getType().equalsIgnoreCase("upload")) {
				retAttr.add(attribute);
				return retAttr;
			}
		}
		return retAttr;
	}

	public List<Attribute> getAdvancedSearches() {
		List<Attribute> retAttr = new ArrayList<Attribute>();

		for (Attribute attribute : getAttributes()) {
			if (!getBasicSearches().contains(attribute)) {
				retAttr.add(attribute);
			}
		}
		return retAttr;
	}

	public List<Attribute> getCompleteSearches() {
		List<Attribute> retAttr = new ArrayList<Attribute>();

		for (Attribute attribute : getAttributes()) {
			if (!attribute.getBasicSearch()) {
				retAttr.add(attribute);
			}
		}
		return retAttr;
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

	public void addAttrs(Attribute... attr) {
		for (Attribute attribute : attr) {
			getAttributes().add(attribute);
		}
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((application == null) ? 0 : application.getAppName().hashCode());
		result = prime * result + ((displayName == null) ? 0 : displayName.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((tableName == null) ? 0 : tableName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ApplicationEntity other = (ApplicationEntity) obj;
		if (application == null) {
			if (other.application != null)
				return false;
		} else if (!application.getAppName().equals(other.application.getAppName()))
			return false;
		if (displayName == null) {
			if (other.displayName != null)
				return false;
		} else if (!displayName.equals(other.displayName))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (tableName == null) {
			if (other.tableName != null)
				return false;
		} else if (!tableName.equals(other.tableName))
			return false;
		return true;
	}

	public String getPk() {
		if (pk == null) {
			setPk("ID_" + getTableName().toUpperCase());
		}
		return pk.toUpperCase();
	}

	public String getSequence() {
		if (sequence == null) {
			setSequence("GSH_SEQ_" + getTableName().toUpperCase());
		}
		return sequence.toUpperCase();
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	public void setPk(String pk) {
		this.pk = pk;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Boolean getMultitenancy() {
		if (multitenancy == null) {
			setMultitenancy(Boolean.TRUE);
		}
		return multitenancy;
	}

	public void setMultitenancy(Boolean multitenancy) {
		this.multitenancy = multitenancy;
	}

}
