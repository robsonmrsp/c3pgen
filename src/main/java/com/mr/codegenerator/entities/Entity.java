package com.mr.codegenerator.entities;

import java.util.ArrayList;
import java.util.List;

public class Entity {
	private static String CORE_ENTITIES = "BairroCepCidadeEnderecoEstadoPaisClientItemItemTypeOperationPermissionSession";
	private String name;
	private String displayName;
	private String tableName;
	private Boolean hasOwner;
	private Boolean hasMobile = Boolean.FALSE;
	private String text;

	private ArrayList<Attribute> attributes = new ArrayList<Attribute>();
	private ArrayList<Relationship> relationships = new ArrayList<Relationship>();

	public Entity(String name, String displayName, Boolean hasOwner, Boolean hasMobile, String text, ArrayList<Attribute> attributes, ArrayList<Relationship> relationships) {
		super();
		this.name = name;
		this.displayName = displayName;
		this.hasOwner = hasOwner;
		this.hasMobile = hasMobile;
		this.text = text;
		this.attributes = attributes;
		this.relationships = relationships;
	}

	public Entity() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<Attribute> getAttributes() {
		return attributes;
	}

	public void setAttributes(ArrayList<Attribute> attributes) {
		this.attributes = attributes;
	}

	public ArrayList<Relationship> getRelationships() {
		return relationships;
	}

	public void setRelationships(ArrayList<Relationship> relationships) {
		this.relationships = relationships;
	}

	public Boolean getHasOwner() {
		return hasOwner;
	}

	public void setHasOwner(Boolean hasOwner) {
		this.hasOwner = hasOwner;
	}

	public List<Relationship> getModals() {
		List<Relationship> modals = new ArrayList<Relationship>();
		for (Relationship attribute : getRelationships()) {
			if (attribute.getViewAproach().getType().equalsIgnoreCase("modal")) {
				modals.add(attribute);
			}
		}
		return modals;
	}

	public Boolean getHasModal() {
		return getModals().size() > 0;
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

	public Boolean getUniqueConstraints() {

		for (Attribute attribute : getAttributes()) {
			if (attribute.getUnique()) {
				return Boolean.TRUE;
			}
		}
		return Boolean.FALSE;
	}

	public String getText() {
		text = "Entity [name=" + name + ", displayName=" + displayName + ", hasOwner=" + hasOwner + ", attributes=" + attributes + ", relationships=" + relationships + "]";
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
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
		Entity other = (Entity) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	@Override
	public String toString() {

		return name;
	}

	public Boolean getHasMobile() {
		return hasMobile;
	}

	public void setHasMobile(Boolean hasMobile) {
		this.hasMobile = hasMobile;
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

}