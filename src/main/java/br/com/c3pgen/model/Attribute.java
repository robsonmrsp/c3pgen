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

	@Column(name = "INPUT_AS")
	private String inputAs;

	@Column(name = "DEFAULT_VALUE")
	private String defaultValue;

	@Column(name = "PLACEHOLDER")
	private String placeholder;

	@Column(name = "DATE_FORMAT")
	private String dateFormat;

	@Column(name = "REQUIRED")
	private Boolean required;

	@Column(name = "UNIQUE_FIELD")
	private Boolean unique;

	@Column(name = "SHOW_IN_PAGES")
	private Boolean showInPages;

	@Column(name = "BASIC_SEARCH")
	private Boolean basicSearch;

	@ManyToOne
	@JoinColumn(name = "ID_ENTITY")
	private ApplicationEntity entity;

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

	public Attribute(String attributeName, String dataBaseFieldName, Boolean required, boolean unique, boolean showInPages, AttributeType type) {
		this.name = attributeName;
		this.tableFieldName = dataBaseFieldName;
		this.required = required;
		this.unique = unique;
		this.showInPages = showInPages;
		this.type = type;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		if (name != null) {
			return name.trim();
		}
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
		if (required == null) {
			setRequired(Boolean.FALSE);
		}
		return required;
	}

	public void setRequired(Boolean required) {
		this.required = required;
	}

	public Boolean getUnique() {
		if (unique == null) {
			setUnique(Boolean.FALSE);
		}
		return unique;
	}

	public void setUnique(Boolean unique) {
		this.unique = unique;
	}

	public ApplicationEntity getEntity() {
		return entity;
	}

	public void setEntity(ApplicationEntity theEntity) {
		this.entity = theEntity;
	}

	public AttributeType getType() {
		return type;
	}

	public void setType(AttributeType attributeType) {
		this.type = attributeType;
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

	public String getDisplayName() {
		if (displayName == null) {
			setDisplayName(Util.firstUpperCase(getName()));
		}
		return displayName;
	}

	public Boolean getShowInPages() {
		if (showInPages == null) {
			setShowInPages(Boolean.TRUE);
		}
		return showInPages;
	}

	public void setShowInPages(Boolean showInPages) {
		this.showInPages = showInPages;
	}

	public String getDateFormat() {
		if (dateFormat == null) {
			if (getType().getClassName().equalsIgnoreCase("Date")) {
				setDateFormat("DD/MM/YYYY");
			}
			if (getType().getClassName().equalsIgnoreCase("Datetime")) {
				setDateFormat("DD/MM/YYYY HH:MM");
			}
		}
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

	public Boolean getBasicSearch() {
		if (this.basicSearch == null) {
			setBasicSearch(Boolean.FALSE);
		}
		return basicSearch;
	}

	public void setBasicSearch(Boolean basicSearch) {
		this.basicSearch = basicSearch;
	}

	public String getInputAs() {

//		if (inputAs == null) {
//			if (getType().getClassName().equalsIgnoreCase("Double") || getType().getClassName().equalsIgnoreCase("Float"))
//				setInputAs("decimal");
//			else if (getType().getClassName().equalsIgnoreCase("date"))
//				setInputAs("date");
//			else if (getType().getClassName().equalsIgnoreCase("datetime"))
//				setInputAs("datetime");
//			else
//				setInputAs("text");
//		}
		return inputAs;
	}

	public void setInputAs(String inputAs) {
		this.inputAs = inputAs;
	}

	@Override
	public String toString() {
		return getName();
	}
}
