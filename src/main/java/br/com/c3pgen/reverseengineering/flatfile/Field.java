package br.com.c3pgen.reverseengineering.flatfile;

public class Field {
	private Integer offset;

	private Integer length;

	private String name;

	private String type;

	public Field(String name, String type, Integer offSet, Integer length) {
		this.setName(name);
		this.setType(type);
		this.offset = offSet;
		this.length = length;
	}

	public Integer getLength() {
		return length;
	}

	public void setLength(Integer length) {
		this.length = length;
	}

	public Integer getOffset() {
		return offset;
	}

	public void setOffset(Integer offset) {
		this.offset = offset;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Field [name=" + name + ", length=" + length + ", offset=" + offset + ", type=" + type + "]";
	}

}
