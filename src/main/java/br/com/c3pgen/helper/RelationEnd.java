package br.com.c3pgen.helper;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Root;

@Root(name = "RELATION_END", strict = false)
public class RelationEnd {
	@Attribute(name = "ID")
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}