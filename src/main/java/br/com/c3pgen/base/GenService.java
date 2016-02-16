package br.com.c3pgen.base;

import java.io.File;
import java.util.Arrays;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.utils.DateUtil;
import br.com.c3pgen.utils.ZipUtils;

public class GenService {
	private static final Logger LOGGER = Logger.getLogger(GenService.class);

	public GenService() {

	}

	public ApplicationValidatorMessages Validate(Application application) throws Exception {
		ApplicationValidator appValidator = new ApplicationValidator();
		GenerateFileInfo fileInfo = new GenerateFileInfo();
		LOGGER.info("Validando arquivo de entidades...");

		ApplicationValidatorMessages validateMessages = appValidator.validate(application);
		LOGGER.info("Finalizada a validação....");

		return validateMessages;
	}

	public GenerateFileInfo generate(Application application) throws Exception {
		ApplicationValidator appValidator = new ApplicationValidator();
		FreeMarkerConfig freeMarkerConfig = new FreeMarkerConfig(application);
		GenerateFileInfo fileInfo = new GenerateFileInfo();

		BaseAppGenerator appGenerator = new BaseAppGenerator(freeMarkerConfig, application);

		EntitiesGenerator entitiesGenerator = new EntitiesGenerator(freeMarkerConfig, application);

		LOGGER.info("Validando arquivo de entidades...");
		ApplicationValidatorMessages validateMessages = appValidator.validate(application);
		LOGGER.info("Finalizada a validação....");

		if (validateMessages.isEmpty()) {
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
			String a = Util.currentDir() + File.separator + "out/" + application.getAppName();
			String webPath = "out/" + application.getAppName() + DateUtil.asString(LocalDateTime.now(), "_dd_MM_yyyy_HH_mm_ss") + ".zip";
			String zip = Util.currentDir() + File.separator + webPath;

			ZipUtils.zipFiles(Arrays.asList(new File(a)), new File(zip));
			fileInfo.setRealFilePath(zip);
			fileInfo.setStaticFilePath(webPath);
			fileInfo.setGenerateSuccess(true);

		} else {
			fileInfo.setApplicationValidatorMessages(validateMessages);
		}

		return fileInfo;
	}
}
