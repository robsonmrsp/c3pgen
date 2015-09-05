package br.com.c3pgen.base;

import org.apache.log4j.Logger;

import br.com.c3pgen.model.Application;

public class GenService {
	private static final Logger LOGGER = Logger.getLogger(GenService.class);

	public GenService() {

	}

	public void generate(Application application) {
		ApplicationValidator appValidator = new ApplicationValidator();
		FreeMarkerConfig freeMarkerConfig = new FreeMarkerConfig(application);

		try {
			BaseAppGenerator appGenerator = new BaseAppGenerator(freeMarkerConfig, application);

			EntitiesGenerator entitiesGenerator = new EntitiesGenerator(freeMarkerConfig, application);

			LOGGER.info("Validando arquivo de entidades...");
			boolean validate = appValidator.validate(application);
			LOGGER.info("Finalizada a validação....");

			if (validate) {
				LOGGER.info("Gerando a base da aplicação. Isso pode levar alguns segundos...");
				appGenerator.generate();
				LOGGER.info("Finalizada a geração básica....");
				entitiesGenerator.generate();
				LOGGER.info("Concluida a geração da aplicação");

				if (application.hasMobApp()) {
					appGenerator.generateMobile();
					LOGGER.info("Finalizada a geração básica....");
					entitiesGenerator.generateMobile();

					LOGGER.info("Concluida a geração da aplicação");
				}
			}
		} catch (Exception exception) {
			LOGGER.error("Não foi possivel Gerar o Projeto: ", exception);
		}
	}
}
