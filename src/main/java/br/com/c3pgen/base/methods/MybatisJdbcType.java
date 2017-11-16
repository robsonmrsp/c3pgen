package br.com.c3pgen.base.methods;

import java.util.List;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class MybatisJdbcType implements TemplateMethodModelEx {

	
	public TemplateModel exec(List args) throws TemplateModelException {
		String retorno = "VARCHAR";
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		String type = args.get(0).toString();

		String value = DataTypeMethod.dataTypes.get(type);
		if (isNumeric(value)) {
			retorno = "NUMERIC";
			
		} else if (isText(value)) {
			retorno = "VARCHAR";
		} else if (isDate(value)) {
			retorno = "DATE";
		}

		return new SimpleScalar(retorno);
	}

	private boolean isDate(String value) {
		if (value.equalsIgnoreCase("LocalDateTime") || value.equalsIgnoreCase("LocalDate"))
			return true;
		return false;
	}

	private boolean isText(String value) {
		if (value.equalsIgnoreCase("String"))
			return true;
		return false;
	}

	private boolean isNumeric(String value) {
		if (value.equalsIgnoreCase("Boolean") || value.equalsIgnoreCase("Long") || value.equalsIgnoreCase("Integer") || value.equalsIgnoreCase("Double"))
			return true;
		return false;
	}
}