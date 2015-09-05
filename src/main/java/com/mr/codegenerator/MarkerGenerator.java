package com.mr.codegenerator;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.mr.codegenerator.entities.Application;
import com.mr.codegenerator.entities.Entity;
import com.mr.codegenerator.methods.DataTypeMethod;
import com.mr.codegenerator.methods.FirstLowerCaseMethod;
import com.mr.codegenerator.methods.FirstUpperCaseMethod;
import com.mr.codegenerator.methods.IsNumericMethod;
import com.mr.codegenerator.methods.IsRequiredMethod;
import com.mr.codegenerator.methods.SnakeCaseStringMethod;
import com.mr.codegenerator.methods.ToLowerCaseMethod;
import com.mr.codegenerator.methods.ToStringMethod;
import com.mr.codegenerator.methods.ToUpperCaseMethod;
import com.mr.codegenerator.util.Util;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import freemarker.template.Version;

public class MarkerGenerator {
	private static final Logger LOGGER = Logger.getLogger(MarkerGenerator.class);

	static {
		// init();
	}

	private FileType fileType;

	private String destinationFolder;

	private String templateName;

	private String templateFileName;

	private Application application;

	FreeMarkerConfig freeMarkerConfig;

	public MarkerGenerator(FreeMarkerConfig freeMarkerConfig, Application application, String template, String destinationFolder, String templateFileName, FileType fileType) {

		this.application = application;

		this.destinationFolder = destinationFolder;

		this.templateFileName = templateFileName;
		this.fileType = fileType;
		this.templateName = template;
		this.freeMarkerConfig = freeMarkerConfig;

	}

	private void tryCreateFolder(String string) {
		new File(string).mkdirs();
	}

	public Boolean generateEntityFile(Application application, Entity entity) throws IOException, TemplateException {

		Template template = freeMarkerConfig.getTemplate(templateName);
		String folderName = destinationFolder.replace("${entity.name}", Util.firstLowerCase(entity.getName()));
		String fileName = templateFileName.replace("${entity.name}", entity.getName()) + "." + fileType.getSufix();
		tryCreateFolder(folderName);
		String finalName = folderName + File.separator + fileName;
		FileWriter fileWriter = new FileWriter(finalName);

		try {
			template.process(adjustData(application, entity), fileWriter);
		} catch (Exception e) {
			LOGGER.error("Erro gerando entidade " + entity.getName() + " Arquivo: " + fileName, e);
		}

		fileWriter.close();
		LOGGER.info("Gerado o arquivo: [" + (finalName) + "]");
		return Boolean.TRUE;
	}

	private Object adjustData(Application application, Entity object) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("firstLower", new FirstLowerCaseMethod());
		data.put("firstUpper", new FirstUpperCaseMethod());
		data.put("snakeCase", new SnakeCaseStringMethod());
		data.put("uppercase", new ToUpperCaseMethod());
		data.put("lowercase", new ToLowerCaseMethod());
		data.put("isNumeric", new IsNumericMethod());
		data.put("getRequiredClass", new IsRequiredMethod());
		data.put("dataType", new DataTypeMethod());
		data.put("package", application.getRootPackage());
		data.put("toListString", new ToStringMethod());
		data.put("entity", object);
		data.put("application", application);
		return data;
	}

	private Object adjustData(List<Entity> object) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("firstLower", new FirstLowerCaseMethod());
		data.put("firstUpper", new FirstUpperCaseMethod());
		data.put("isNumeric", new IsNumericMethod());
		data.put("snakeCase", new SnakeCaseStringMethod());
		data.put("toListString", new ToStringMethod());
		data.put("getRequiredClass", new IsRequiredMethod());
		data.put("uppercase", new ToUpperCaseMethod());
		data.put("lowercase", new ToLowerCaseMethod());
		data.put("dataType", new DataTypeMethod());
		data.put("package", ApplicationConfiguration.MAIN_PACKAGE);
		data.put("entities", object);
		return data;
	}

	// TODO Melhorar mais um pouco
	private static Boolean init() {
		String base = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator);
		String persistence = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "persistence";
		String service = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "service";
		String model = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "model";
		String filter = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "model" + File.separator + "filter";
		String json = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "json";
		String rs = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "rs";
		String baseJs = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator;
		String baseJSViews = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "views";
		String baseJSCollections = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "collections";
		String baseJSModel = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "models";
		String tpl = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "tpl";

		LOGGER.info("Criando a estrutura de diretorios" + base);
		LOGGER.info("Criando a estrutura de diretorios" + persistence);
		LOGGER.info("Criando a estrutura de diretorios" + service);
		LOGGER.info("Criando a estrutura de diretorios" + model);
		LOGGER.info("Criando a estrutura de diretorios" + filter);
		LOGGER.info("Criando a estrutura de diretorios" + json);
		LOGGER.info("Criando a estrutura de diretorios" + rs);
		LOGGER.info("Criando a estrutura de diretorios" + baseJs);
		new File(persistence).mkdirs();
		new File(service).mkdirs();
		new File(model).mkdirs();
		new File(filter).mkdirs();
		new File(json).mkdirs();
		new File(rs).mkdirs();

		// ESTRUTURA DE PACOTES JAVASCRIPT
		new File(baseJs).mkdirs();
		new File(baseJSViews).mkdirs();
		new File(baseJSCollections).mkdirs();
		new File(baseJSModel).mkdirs();
		new File(tpl).mkdirs();
		return Boolean.TRUE;
	}

	public Boolean generate(Application aplication) throws IOException, TemplateException {
		Template template = freeMarkerConfig.getTemplate(templateName);
		tryCreateFolder(destinationFolder);
		FileWriter fileWriter = new FileWriter(destinationFolder + templateFileName.replace("${entity.name}", "Fragment") + "." + fileType.getSufix());
		template.process(adjustData(aplication, null), fileWriter);
		fileWriter.close();
		return Boolean.FALSE;
	}

	public Boolean generateAppFragmentFile(List<Entity> entities) throws IOException, TemplateException {
		Template template = freeMarkerConfig.getTemplate(templateName);
		tryCreateFolder(destinationFolder);
		FileWriter fileWriter = new FileWriter(destinationFolder + templateFileName.replace("${entity.name}", "Fragment") + "." + fileType.getSufix());
		template.process(adjustData(entities), fileWriter);
		fileWriter.close();
		return Boolean.FALSE;
	}

}
