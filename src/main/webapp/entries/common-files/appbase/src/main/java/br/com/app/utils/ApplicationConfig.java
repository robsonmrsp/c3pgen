package ${application.corePackage}.utils;

import java.io.IOException;

import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class ApplicationConfig {
	private static final Logger LOGGER = Logger.getLogger(ApplicationConfig.class);
	public static String UPLOADS_FOLDER_LOCATION = null;
	static Properties properties;
	static {
		properties = readConfig();
		loadProperties();
	}

	private static Properties readConfig() {

		InputStream inputStream = ApplicationConfig.class.getClassLoader().getResourceAsStream("config.properties");
		Properties properties = new Properties();
		try {
			properties.load(inputStream);
		} catch (IOException e) {

			LOGGER.error("Não foi possível carregar o arquivo de configuração!", e);
			throw new RuntimeException("Não foi possível carregar o arquivo de configuração!");
		}
		return properties;
	}

	/**
	 * Faz a carga do conteudo do arquivo folderlistener.properties e define os
	 * valores de todos os atributos desta classe.
	 */
	private static void loadProperties() {
		UPLOADS_FOLDER_LOCATION = getProperty("uploads.folder.location");
	}

	public static void resume() {

		LOGGER.info(">>> Configurações da aplicacao <<<");
		LOGGER.info("(veja arquivo folderlistener.properties)");
	}

	private static String getProperty(String propName) {
		return properties.getProperty(propName, "Null");
	}
}
