package com.mr.codegenerator.entities;

public class Relationship {
	private String name;
	private String model;
	private String ownerName;
	private Boolean uniDirecional;
	private ViewAproach viewAproach = new ViewAproach();
	private String type;
	private String displayName = "";
	private String implementation = "";

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getImplementation() {
		return implementation;
	}

	public void setImplementation(String implementation) {
		this.implementation = implementation;
	}

	@Override
	public String toString() {
		return "Relationship [name=" + name + ", model=" + model + ", viewAproach=" + viewAproach + ", type=" + type + ", displayName=" + displayName + ", implementation=" + implementation + "]";
	}

	public ViewAproach getViewAproach() {
		return viewAproach;
	}

	public void setViewAproach(ViewAproach viewAproach) {
		this.viewAproach = viewAproach;
	}

	public String getDisplayName() {
		if (displayName == null || displayName.length() == 0) {
			displayName = name;
		}
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public Boolean getUniDirecional() {
		if (uniDirecional == null)
			return Boolean.FALSE;
		return uniDirecional;
	}

	public void setUniDirecional(Boolean uniDirecional) {
		this.uniDirecional = uniDirecional;
	}

}
