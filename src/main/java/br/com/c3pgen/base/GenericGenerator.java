package br.com.c3pgen.base;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.apache.log4j.Logger;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class GenericGenerator {
	private static final Logger LOGGER = Logger.getLogger(GenericGenerator.class);

	protected Configuration configuration;
	private Application application;

	private FreeMarkerConfig freeMarkerConfig;

	public GenericGenerator(FreeMarkerConfig freeMarkerConfig, Application application) throws IOException {
		this.freeMarkerConfig = freeMarkerConfig;
		this.application = application;
	}

	public void generate(List<FSItemDescription> seeds) throws IOException, TemplateException {
		for (FSItemDescription item : seeds) {
			generate(item);
		}
	}

	private void generate(FSItemDescription item) throws IOException, TemplateException {

		Template template = freeMarkerConfig.getTemplate(getFileTemplateFileName(item));

		String folderName = item.getRootFolder().replace("${entity.name}", Util.firstLowerCase(item.getFileName()));

		String fileName = item.getFileName().replace("${entity.name}", item.getFileName()) + "." + item.getFileType().getSufix();

		new File(folderName).mkdirs();

		FileWriter fileWriter = new FileWriter(folderName + fileName);

		template.process(freeMarkerConfig.preparedObject(application), fileWriter);

		fileWriter.close();

		LOGGER.info("Gerado o arquivo: [" + (folderName + fileName) + "]");
	}

	private String getFileTemplateFileName(FSItemDescription item) {
		if (item.getTemplate().contains(".")) {
			return item.getTemplate();
		} else
			return item.getTemplate() + "." + item.getFileType().getSufix();
	}

}
