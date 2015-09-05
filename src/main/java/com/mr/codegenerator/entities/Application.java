package com.mr.codegenerator.entities;

import java.util.List;

public class Application {
	private String appName;
	private String skin;
	private String rootPackage;

	private List<Entity> entities;

	
	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getRootPackage() {
		return rootPackage;
	}

	public void setRootPackage(String rootPackage) {
		this.rootPackage = rootPackage;
	}

	public List<Entity> getEntities() {
		return entities;
	}

	public void setEntities(List<Entity> entities) {
		this.entities = entities;
	}

	public String getSkin() {
		return skin;
	}

	public void setSkin(String skin) {
		this.skin = skin;
	}

	public Boolean hasMobApp() {
		if (entities != null) {
			for (Entity e : entities) {
				if (e.getHasMobile()) {
					return Boolean.TRUE;
				}
			}
		}
		return Boolean.FALSE;
	}
}
