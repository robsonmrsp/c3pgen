package br.com.c3pgen.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.envers.Audited;

@Entity
@Audited
@Table(name = "RELATIONSHIP")
@SequenceGenerator(name = "RELATIONSHIP_SEQUENCE", sequenceName = "RELATIONSHIP_SEQUENCE")
public class Relationship extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	public enum Types {
		ManyToMany, OneToMany, ManyToOne, OneToOne,
	}

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RELATIONSHIP_SEQUENCE")
	private Integer id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "ORIGIN")
	private Boolean origin;

	@Column(name = "TYPE")
	private String type;

	@Column(name = "DISPLAY_NAME")
	private String displayName;

	@Column(name = "OWNER_NAME")
	private String ownerName;

	@Column(name = "MODEL")
	private String model;

	@Column(name = "UNI_DIRECIONAL")
	private Boolean uniDirecional;

	@Column(name = "UNIDIRECIONAL")
	private Boolean showInPages = Boolean.TRUE;

	@Column(name = "FOREING_KEY_NAME")
	private String fk;

	@Column(name = "TABLE_JOIN_FIELD_NAME")
	private String tableJoinFieldName; // mybatis

	@Column(name = "TABLE_FIELD_NAME")
	private String tableFieldName; // mybatis

	@ManyToOne
	@JoinColumn(name = "ID_ENTITY")
	private ApplicationEntity entity;

	@ManyToOne
	@JoinColumn(name = "ID_VIEWAPPROACH")
	@Cascade(CascadeType.ALL)
	private ViewApproach viewApproach;

	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	@ManyToOne
	@Cascade(CascadeType.ALL)
	@JoinColumn(name = "id_target")
	private Relationship target;

	public Relationship(String name, String displayName, String type, String ownerName, String model, Boolean uniDirecional, ViewApproach viewApproach) {
		super();
		this.name = StringUtils.trim(name);
		this.displayName = StringUtils.trim(displayName);
		this.type = StringUtils.trim(type);
		this.ownerName = StringUtils.trim(ownerName);
		this.model = StringUtils.trim(model);
		if (uniDirecional == null) {
			this.uniDirecional = Boolean.FALSE;
		} else {
			this.uniDirecional = uniDirecional;
		}
		this.viewApproach = viewApproach;
	}

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public Relationship() {

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getOwnerName() {

		if (getOrigin() == Boolean.TRUE && ownerName == null && type.equals("ManyToMany")) {
			setOwnerName(name + "s");
		}
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
		if (uniDirecional == null) {
			setUniDirecional(Boolean.FALSE);
		}
		return uniDirecional;
	}

	public void setUniDirecional(Boolean uniDirecional) {
		this.uniDirecional = uniDirecional;
	}

	public ApplicationEntity getEntity() {
		return entity;
	}

	public void setEntity(ApplicationEntity theEntity) {
		this.entity = theEntity;
	}

	public ViewApproach getViewApproach() {
		if (viewApproach == null) {
			setViewApproach(ViewApproach.noneInstance());
		}
		return viewApproach;
	}

	public void setViewApproach(ViewApproach viewApproach) {
		this.viewApproach = viewApproach;
	}

	public Relationship getTarget() {
		return target;
	}

	public void setTarget(Relationship target) {
		this.target = target;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((model == null) ? 0 : model.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
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
		Relationship other = (Relationship) obj;
		if (model == null) {
			if (other.model != null)
				return false;
		} else if (!model.equals(other.model))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	public Boolean getShowInPages() {
		return showInPages;
	}

	public void setShowInPages(Boolean showInPages) {
		this.showInPages = showInPages;
	}

	public String getFk() {
		return fk;
	}

	public void setFk(String fk) {
		this.fk = fk;
	}

	public String getTableJoinFieldName() {
		return tableJoinFieldName;
	}

	public void setTableJoinFieldName(String tableJoinFieldName) {
		this.tableJoinFieldName = tableJoinFieldName;
	}

	public String getTableFieldName() {
		return tableFieldName;
	}

	public void setTableFieldName(String tableFieldName) {
		this.tableFieldName = tableFieldName;
	}

	@Override
	public String toString() {
		return "Relationship [name=" + name + ", displayName=" + displayName + ", ownerName=" + ownerName + "]";
	}

	public Boolean getOrigin() {
		return origin;
	}

	public void setOrigin(Boolean origin) {
		this.origin = origin;
	}

}
