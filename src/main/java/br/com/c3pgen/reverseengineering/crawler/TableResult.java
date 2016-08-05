package br.com.c3pgen.reverseengineering.crawler;

public class TableResult {
	private String name;
	private String yamlContent;

	public TableResult(String name, String yamlContent) {
		this.name = name;
		this.yamlContent = yamlContent;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getYamlContent() {
		return yamlContent;
	}

	public void setYamlContent(String yamlContent) {
		this.yamlContent = yamlContent;
	}

}
