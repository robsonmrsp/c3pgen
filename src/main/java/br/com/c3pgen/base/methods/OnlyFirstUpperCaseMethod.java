package br.com.c3pgen.base.methods;

import java.util.List;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class OnlyFirstUpperCaseMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		String palavra = "";
		try {

			palavra = args.get(0).toString();
			palavra = palavra.substring(0, 1).toUpperCase() + palavra.substring(1).toLowerCase();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new SimpleScalar(palavra);
	}
}