package com.mr.codegenerator;

import org.apache.log4j.Logger;

import com.mr.codegenerator.entities.Application;
import com.mr.codegenerator.util.Util;

public class Main {
	private static final Logger LOGGER = Logger.getLogger(Main.class);

	public Main() {

	}

	public static void main(String[] args) {
		 generatoToInput("c3pgen");
	}

	public static void generatoToInput(String folderInputName) {
		ApplicationValidator appValidator = new ApplicationValidator();

		Application application = Util.getApplicationFromFolder(folderInputName);
		FreeMarkerConfig freeMarkerConfig = new FreeMarkerConfig(application);

		try {
			LOGGER.info("Validando arquivo de entidades...");
			boolean validate = appValidator.validate(application);
			LOGGER.info("Finalizada a validação....");

			if (validate) {
				LOGGER.info("Gerando a base da aplicação. Isso pode levar alguns segundos...");
				BaseAppGenerator.generate(freeMarkerConfig, application);
				LOGGER.info("Finalizada a geração básica....");
				EntitiesGenerator.generate(freeMarkerConfig, application);
				LOGGER.info("Concluida a geração da aplicação");
				
				if(application.hasMobApp()){
					BaseAppGenerator.generateMobile(freeMarkerConfig, application);
					LOGGER.info("Finalizada a geração básica....");
					EntitiesGenerator.generateMobile(freeMarkerConfig, application);
					
					LOGGER.info("Concluida a geração da aplicação");
				}
			}
		} catch (Exception exception) {
			LOGGER.error("Não foi possivel Gerar o Projeto: ", exception);
		}
	}
}
