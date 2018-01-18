package br.com.c3pgen.base.methods;

import java.util.List;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class ReplaceAllMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 3) {
			throw new TemplateModelException("Wrong arguments");
		}
		String value = (String) args.get(0).toString();
		String replace = (String) args.get(1).toString();
		String replaced = (String) args.get(2).toString();

		return new SimpleScalar(value.replaceAll(replace, replaced));
	}
}