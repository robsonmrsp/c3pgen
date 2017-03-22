package br.com.c3pgen.base;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Modulo;
import br.com.c3pgen.utils.DateUtil;
import br.com.c3pgen.utils.ZipUtils;

public class Main {
	private static final Logger LOGGER = Logger.getLogger(Main.class);

	public Main() {

	}

	public static void main(String[] args) throws Exception {
		//
		// generatoToInput("c3pgen", new
		// File("C:\\cyg\\home\\robson\\repos\\gerador\\in\\c3pgen"));
		//
		// generatoToInput("mercado-delivery", new
		// File("C:\\cyg\\home\\robso\\repos\\pizza\\in\\mercado-delivery"));
		// generatoToInput("mercado-delivery", new
		// File("C:\\cyg\\home\\robson\\repos\\gerador\\in\\mercado-delivery"));
		// generatoToInput("idc", new
		// File("C:\\cyg\\home\\robson\\repos\\gerador\\in\\idc"));
		// generatoToInput("gamification", new
		// File("G:\\cyg\\home\\robso\\repos\\pizza\\in\\gamification"));

		// generatoToInput("qualidade4", new
		// File("C:\\cyg\\home\\robson\\repos\\c3pgen\\in\\qualidade4"));

		// generatoToInput("qualidade3", new
		// File("G:\\cyg\\home\\robso\\repos\\c3pgen\\in\\qualidade3"));

		// generatoToInput("handoverTaxi", new
		// File("G:\\cyg\\home\\robso\\repos\\c3pgen\\in\\handoverTaxi"));
		generatoToInput("qualidade", new File("C:\\cyg\\home\\robson\\repos\\c3pgen\\in\\qualidade"));

		//
	}

	public static void generatoToInput(String folderInputName, File generatorFilesFolder) throws Exception {

		if (!generatorFilesFolder.exists()) {
			throw new RuntimeException("Pasta " + generatorFilesFolder.getAbsolutePath() + " Não existe!");
		}

		ApplicationValidator appValidator = new ApplicationValidator();

		Application application = Util.getApplicationFromFolder(folderInputName, generatorFilesFolder);

		FreeMarkerConfig freeMarkerConfig = new FreeMarkerConfig(application);

		GenerateFileInfo fileInfo = new GenerateFileInfo();

		BaseAppGenerator appGenerator = new BaseAppGenerator(freeMarkerConfig, application);

		EntitiesGenerator entitiesGenerator = new EntitiesGenerator(freeMarkerConfig, application);

		try {
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
			} else {
				fileInfo.setApplicationValidatorMessages(validateMessages);
			}
		} catch (Exception exception) {
			LOGGER.error("Não foi possivel Gerar o Projeto: ", exception);
		}
	}
}
