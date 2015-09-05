package br.com.c3pgen.base;

import java.io.IOException;

import br.com.c3pgen.model.Application;
import freemarker.template.TemplateException;

public abstract class FSGenerator {

	public abstract void generate(Application application) throws IOException, TemplateException;
}
