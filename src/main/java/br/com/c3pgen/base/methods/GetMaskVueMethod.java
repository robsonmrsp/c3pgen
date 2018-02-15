package br.com.c3pgen.base.methods;

import java.util.List;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Attribute;
import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class GetMaskVueMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments, getMaskVueMethod");
		}
		if (args != null && args.size() > 0 && args.get(0) != null) {
			Attribute att = (Attribute) args.get(0);
			if (att.getType().getClassName().equalsIgnoreCase("integer") || att.getType().getClassName().equalsIgnoreCase("long")) {
				return new SimpleScalar("v-mask=\"'integer'\"");
			} else if (att.getType().getClassName().equalsIgnoreCase("double") || att.getType().getClassName().equalsIgnoreCase("float")) {
				return new SimpleScalar("v-mask=\"'integer'\"");
			} else if (att.getType().getClassName().equalsIgnoreCase("date")) {
				return new SimpleScalar("v-mask=\"'date'\"");
			} else if (att.getType().getClassName().equalsIgnoreCase("datetime")) {
				return new SimpleScalar("v-mask=\"'datetime'\"");
			}
		}

		return new SimpleScalar("");
	}
}