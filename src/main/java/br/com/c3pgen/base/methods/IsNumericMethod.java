package br.com.c3pgen.base.methods;

import java.util.List;

import freemarker.ext.beans.BeansWrapper;
import freemarker.ext.beans.BooleanModel;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class IsNumericMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		if (args != null && args.size() > 0 && args.get(0) != null) {

			String objec = args.get(0).toString();
			if (objec.equalsIgnoreCase("integer") || objec.equalsIgnoreCase("long") || objec.equalsIgnoreCase("double") || objec.equalsIgnoreCase("int") || objec.equalsIgnoreCase("float"))
				return new BooleanModel(Boolean.TRUE, new BeansWrapper());

		}
		return new BooleanModel(Boolean.FALSE, new BeansWrapper());
	}
}