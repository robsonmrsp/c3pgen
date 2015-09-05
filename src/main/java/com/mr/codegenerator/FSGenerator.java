package com.mr.codegenerator;

import java.io.IOException;

import com.mr.codegenerator.entities.Application;

import freemarker.template.TemplateException;

public abstract class FSGenerator {

	public abstract void generate(Application application) throws IOException, TemplateException;
}
