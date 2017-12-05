package br.com.c3pgen.base.methods;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class DataInputFormatMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		if (args != null && args.size() > 2 && args.get(0) != null) {
			try {
				String inputAs = args.get(0).toString();
				String className = args.get(1).toString();
				String mask = args.get(2).toString();
				
				String plugin = "";
				if (inputAs.equals("cpf")) {
					plugin = "cpf";
				}
				if (inputAs.equals("cnpj")) {
					plugin = "cnpj";
				}
				if (inputAs.equals("fone") || inputAs.equals("telephone") || inputAs.equals("telefone")) {
					plugin = "fone";
				}
				if (inputAs.equals("date") || className.equals("Date")) {
					plugin = "date";
				}
				if (inputAs.equals("datetime") || className.equals("Datetime")) {
					plugin = "dateTime";
				}
				if (inputAs.equals("percent") || inputAs.equals("percentagem") || inputAs.equals("decimal") || className.equals("Double' || ") || inputAs.equals("monetario")) {
					plugin = "decimal";
				}
				if (inputAs.equals("integer") || className.equals("Integer")) {
					plugin = "integer";
				}
				if (plugin.isEmpty()) {
					return new SimpleScalar("jsetup-data-input [inputAs]=\"'" + plugin + "'\" ");
				} else if (!mask.isEmpty()) {
					return new SimpleScalar("jsetup-data-input [mask]=\"'" + mask + "'\" ");
				}
			} catch (Exception e) {

			}
		}
		return new SimpleScalar(" ");
	}
}
