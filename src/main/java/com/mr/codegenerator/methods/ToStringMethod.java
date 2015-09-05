package com.mr.codegenerator.methods;

import java.util.List;

import freemarker.template.SimpleScalar;
import freemarker.template.SimpleSequence;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class ToStringMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		String returnList = "[";
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		if (args.get(0) instanceof SimpleSequence) {
			SimpleSequence seq = (SimpleSequence) args.get(0);
			for (Object object : seq.toList()) {
				returnList += "'" + object.toString() + "', ";
			}
		}
		returnList += "]";
		return new SimpleScalar(returnList);
	}
}