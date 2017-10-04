package br.com.c3pgen.base.methods;

import java.util.List;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import freemarker.ext.beans.StringModel;
import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class getOwnerNameMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		Application a = (Application) ((StringModel) args.get(2)).getWrappedObject();
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		if (args != null && args.size() > 0 && args.get(0) != null)
			return new SimpleScalar(Util.firstLowerCase(args.get(0).toString()));
		return new SimpleScalar(Util.firstLowerCase("NO_NAME"));
	}
}