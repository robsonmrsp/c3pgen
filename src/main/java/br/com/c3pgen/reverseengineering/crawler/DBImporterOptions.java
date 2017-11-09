package br.com.c3pgen.reverseengineering.crawler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DBImporterOptions {

	private List<String> excludeTableNames = new ArrayList<String>();
	private List<String> tableNamesToImport = new ArrayList<String>();
	private List<String> excludeColumnNames = new ArrayList<String>();
	private List<String> includeSchemaNames = new ArrayList<String>();
	private List<String> tables = new ArrayList<String>();

	private String sufixToSupress = "";
	private String prefixToSupress = "";
	private String textToSupress = "";

	public String getSufixToSupress() {
		return sufixToSupress;
	}

	public void setSufixToSupress(String sufixToSupress) {
		this.sufixToSupress = sufixToSupress;
	}

	public String getPrefixToSupress() {
		return prefixToSupress;
	}

	public void setPrefixToSupress(String prefixToSupress) {
		this.prefixToSupress = prefixToSupress;
	}

	public String getTextToSupress() {
		return textToSupress;
	}

	public void setTextToSupress(String textToSupress) {
		this.textToSupress = textToSupress;
	}

	public boolean addInclusionSchemaName(String... e) {
		return getIncludeSchemaNames().addAll(Arrays.asList(e));
	}

	public boolean addExclusionTableNamePatterns(String... e) {
		return getExcludeTableNamePatterns().addAll(Arrays.asList(e));
	}

	public boolean addExclusionColumnNamePatterns(String... e) {
		return getExcludeColumnNamePatterns().addAll(Arrays.asList(e));
	}

	public List<String> getExcludeTableNamePatterns() {
		return excludeTableNames;
	}

	public List<String> getExcludeColumnNamePatterns() {
		return excludeColumnNames;
	}

	public List<String> getIncludeSchemaNames() {
		return includeSchemaNames;
	}

	public void addTableNamesToImport(String... e) {
		getTableNamesToImport().addAll(Arrays.asList(e));
	}

	public List<String> getTableNamesToImport() {
		return tableNamesToImport;
	}

	public void setTableNamesToImport(List<String> tableNamesToImport) {
		this.tableNamesToImport = tableNamesToImport;
	}

	public void addTables(String... tables) {
		this.getTables().addAll(Arrays.asList(tables));
	}

	public List<String> getTables() {
		return tables;
	}

	public void setTables(List<String> tables) {
		this.tables = tables;
	}

}
