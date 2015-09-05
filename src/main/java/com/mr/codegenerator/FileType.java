package com.mr.codegenerator;

public enum FileType {
	JAVA("java"), JAVASCRIPT("js"), HTML("html"), FRAGMENT("fra"), XML("xml"), PROPERTIES("properties"), JSP("jsp");
	private final String sufix;

	private FileType(String sufix) {
		this.sufix = sufix;
	}

	public String getSufix() {
		return sufix;
	}

}
