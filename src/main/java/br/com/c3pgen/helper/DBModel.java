package br.com.c3pgen.helper;

import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

@Root(name = "DBMODEL",strict=false)
public class DBModel {
	@Element(name = "METADATA")
	private Metadata metadata;

	public Metadata getMetadata() {
		return metadata;
	}

	public void setMetadata(Metadata metadata) {
		this.metadata = metadata;
	}


}
