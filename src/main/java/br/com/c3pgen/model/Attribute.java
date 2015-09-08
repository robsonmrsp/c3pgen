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

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.envers.Audited;

import br.com.c3pgen.base.util.Util;


@Entity
@Audited
@Table(name = "ATTRIBUTE")
@SequenceGenerator(name = "ATTRIBUTE_SEQUENCE", sequenceName = "ATTRIBUTE_SEQUENCE")
public class Attribute extends AbstractTimestampEntity {
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
	private String mask;

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

	@ManyToOne
	@JoinColumn(name = "ID_TYPE")
	@Cascade(CascadeType.ALL)
	private AttributeType type;

	@ManyToOne
	@JoinColumn(name = "ID_VIEWAPPROACH")
	@Cascade(CascadeType.ALL)
	private ViewApproach viewApproach;

	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public Attribute() {

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

	public String getMask() {
		return mask;
	}

	public void setMask(String mask) {
		this.mask = mask;
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

	public String getDisplayName() {
		if (displayName == null) {
			setDisplayName(Util.firstUpperCase(getName()));
		}
		return displayName;
	}

}
