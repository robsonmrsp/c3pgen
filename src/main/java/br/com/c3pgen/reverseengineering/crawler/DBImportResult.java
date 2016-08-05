package br.com.c3pgen.reverseengineering.crawler;

import java.util.ArrayList;
import java.util.List;

public class DBImportResult {

	private List<TableResult> result = new ArrayList<>();

	public List<TableResult> getResult() {
		return result;
	}

	public void setResult(List<TableResult> result) {
		this.result = result;
	}

	public boolean add(TableResult e) {
		return result.add(e);
	}

}
