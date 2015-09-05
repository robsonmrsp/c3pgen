package com.mr.codegenerator.methods;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class DataTypeMethod implements TemplateMethodModelEx {

	static Map<String, String> dataTypes = new HashMap<String, String>();
	static {
		dataTypes.put("String", "String");
		dataTypes.put("string", "String");
		dataTypes.put("Integer", "Integer");
		dataTypes.put("integer", "Integer");
		dataTypes.put("Double", "Double");
		dataTypes.put("double", "Double");
		dataTypes.put("Long", "Long");
		dataTypes.put("Boolean", "Boolean");
		dataTypes.put("boolean", "Boolean");
		dataTypes.put("long", "Long");
		dataTypes.put("Date", "LocalDate");
		dataTypes.put("date", "LocalDate");
		dataTypes.put("datetime", "LocalDateTime");
		dataTypes.put("Datetime", "LocalDateTime");
		dataTypes.put("DateTime", "LocalDateTime");

	}

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		String type = args.get(0).toString();

		String value = dataTypes.get(type);
		if (value == null) {
			value = type;
		}
		return new SimpleScalar(value);
		// return new SimpleScalar(value == null ? "NONE" : value);
	}
}