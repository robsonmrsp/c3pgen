package br.com.c3pgen.reverseengineering.crawler;

import java.util.ArrayList;
import java.util.List;

public class DBImportResult {

	private List<String> tableNames = new ArrayList<String>();

	public boolean containsTable(String tableName) {
		return tableNames.contains(tableName);
	}

	private List<String> columnNames = new ArrayList<String>();

	public void addTableName(String element) {
		getTableNames().add(element);
	}

	public void addColumnName(String element) {
		getColumnNames().add(element);
	}

	public List<String> getTableNames() {
		return tableNames;
	}

	public List<String> getColumnNames() {
		return columnNames;
	}

	public boolean hasResult() {

		return getTableNames().size() + getColumnNames().size() > 0;
	}

}
