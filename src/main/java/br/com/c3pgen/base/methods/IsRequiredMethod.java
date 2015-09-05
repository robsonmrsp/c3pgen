package br.com.c3pgen.base.methods;

import java.util.List;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateBooleanModel;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class IsRequiredMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		Boolean required = Boolean.FALSE;
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		if (args != null && args.size() > 0 && args.get(0) != null) {
			try {

				TemplateBooleanModel a = (TemplateBooleanModel) args.get(0);
				required = new Boolean(a.getAsBoolean());

			} catch (Exception e) {
			}
		}
		if (required) {
			return new SimpleScalar(" validate[required]");
		}
		return new SimpleScalar(" ");
	}
}