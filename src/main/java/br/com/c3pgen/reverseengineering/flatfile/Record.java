package br.com.c3pgen.reverseengineering.flatfile;

import java.util.ArrayList;
import java.util.List;

public class Record {
	String name;
	List<Field> fields = new ArrayList<>();

	public void addField(String name, String type, String offSet, String length) {
		this.fields.add(new Field(name, type, new Integer(offSet), new Integer(length)));
	}

	@Override
	public String toString() {
		return "Record [name=" + name + ", fields=" + fields + "]";
	}

}