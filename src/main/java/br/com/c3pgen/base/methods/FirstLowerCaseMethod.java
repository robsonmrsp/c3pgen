package br.com.c3pgen.base.methods;

import java.util.List;

import br.com.c3pgen.base.util.Util;
import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class FirstLowerCaseMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		if (args != null && args.size() > 0 && args.get(0) != null)
			return new SimpleScalar(Util.firstLowerCase(args.get(0).toString()));
		return new SimpleScalar(Util.firstLowerCase("NO_NAME"));
	}
}