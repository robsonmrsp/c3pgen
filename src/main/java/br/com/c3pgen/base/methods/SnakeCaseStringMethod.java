package br.com.c3pgen.base.methods;

import java.util.List;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class SnakeCaseStringMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		String camelCaseString = args.get(0).toString();
		String returnString = camelCaseString;

		for (int index = 0; index < camelCaseString.length(); index++) {
			char charAt = camelCaseString.charAt(index);
			if (Character.isUpperCase(charAt)) {
				String charStr = "" + camelCaseString.charAt(index);
				returnString = returnString.replace(charStr, "_" + charStr.toLowerCase());
			}
		}
		return new SimpleScalar(returnString);
	}
}