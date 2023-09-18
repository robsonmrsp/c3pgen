package br.com.c3pgen.base;

public enum FileType {
	JAVA("java"),
	JAVASCRIPT("js"),
	JSX("jsx"),
	VUE("vue"),
	HTML("html"),
	FRAGMENT("fra"),
	XML("xml"),
	PROPERTIES("properties"), JSP("jsp"), SQL("sql"), TYPESCRIPT("ts"), CONFIG("config"), YML("YML");
	private final String sufix;

	private FileType(String sufix) {
		this.sufix = sufix;
	}

	public String getSufix() {
		return sufix;
	}

}
