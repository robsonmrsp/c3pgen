package com.mr.codegenerator.entities;

public class AttributeType {
	private String className;
	
	//money, e-mail, 
	private String format;

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	@Override
	public String toString() {
		return "AttributeType [className=" + className + "]";
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
}
