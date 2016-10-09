package br.com.c3pgen.base.methods;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;

public class MaxLenMethod implements TemplateMethodModelEx {

	public TemplateModel exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments");
		}
		if (args != null && args.size() > 0 && args.get(0) != null) {
			try {
				String maxLen = args.get(0).toString();
				if (StringUtils.isNumeric(maxLen)) {
					return new SimpleScalar(" maxlength=\"" + maxLen + "\" ");

				}
			} catch (Exception e) {
			}
		}
		return new SimpleScalar(" ");
	}
}