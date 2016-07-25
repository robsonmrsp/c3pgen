package br.com.c3pgen.model.filter;

import java.io.Serializable;

/**
 * generated: 03/09/2015 14:51:48
 **/
public class FilterExtrationTools implements Serializable {
	private static final long serialVersionUID = 1L;

	private String url;
	private String username;
	private String password;
	private String databaseType;
	private String tableRegex;
	private String columnRegex;
	private String supressPrefix;

	public FilterExtrationTools() {

	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDatabaseType() {
		return databaseType;
	}

	public void setDatabaseType(String databaseType) {
		this.databaseType = databaseType;
	}

	public String getTableRegex() {
		if (tableRegex == null) {
			setTableRegex("");
		}
		return tableRegex;
	}

	public void setTableRegex(String tableRegex) {
		this.tableRegex = tableRegex;
	}

	public String getColumnRegex() {
		if (columnRegex == null) {
			setColumnRegex("");
		}
		return columnRegex;
	}

	public void setColumnRegex(String columnRegex) {
		this.columnRegex = columnRegex;
	}

	public String getSupressPrefix() {
		return supressPrefix;
	}

	public void setSupressPrefix(String supressPrefix) {
		this.supressPrefix = supressPrefix;
	}

}