package br.com.c3pgen.helper;

import java.util.Collection;

import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

@Root(name = "METADATA ", strict = false)
public class Metadata {

	@ElementList(required = false, name = "RELATIONS")
	private Collection<Relation> relations;

	@ElementList(required = false, name = "TABLES")
	private Collection<Table> tables;

	public Collection<Table> getTables() {
		return tables;
	}

	public void setTables(Collection<Table> tables) {
		this.tables = tables;
	}

	public Collection<Relation> getRelations() {
		return relations;
	}

	public void setRelations(Collection<Relation> relations) {
		this.relations = relations;
	}

}
