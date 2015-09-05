package com.mr.codegenerator.methods;

import java.util.List;

import com.mr.codegenerator.util.Util;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class ToLowerCaseMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		if (args != null && args.size() > 0 && args.get(0) != null)
			return new SimpleScalar(args.get(0).toString().toLowerCase());
		return new SimpleScalar(Util.firstLowerCase("NO_NAME"));
	}
}