package br.com.c3pgen.base;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

import br.com.c3pgen.base.util.Util;

public class ApplicationConfiguration {
	private static final Logger LOGGER = Logger.getLogger(ApplicationConfiguration.class);
	static final Properties prop = new Properties();
	static final InputStream in = ApplicationConfiguration.class.getClassLoader().getResourceAsStream("codeGenerator.properties");

	static {
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			LOGGER.error("Error reading file gateway.properties");
		}
	}

	// TODO mesmo tendo sido deito na base do control + c + control +v, é
	// importante que seja reduzido o codigo repetido abaixo.
	public static final String PACKAGE = getProperty("package", "com.mr.application");
	public static final String DEST_FOLDER = getProperty("dest.folder", "c:\\temp");

	// public static final String TEMPLATES_FOLDER_NAME =
	// getProperty("templates.folder.name", "ace");;
	public static final String MAIN_PACKAGE = getProperty("main.package", "br.com.jsetup.app");
	public static final String BASE_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator;
	public static final String PERSISTENCE_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "persistence" + File.separator;
	public static final String SERVICE_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "service" + File.separator;
	public static final String MODEL_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "model" + File.separator;
	public static final String JSON_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "json" + File.separator;
	public static final String RS_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "rs" + File.separator;

	public static final String BASE_JS_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + File.separator;
	public static final String JS_VIEWS_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "views" + File.separator + "${entity.name}" + File.separator;
	public static final String JS_VIEWS_TPL_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "views" + File.separator + "${entity.name}" + File.separator + "tpl" + File.separator;
	public static final String JS_COLLECTIONS_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "collections" + File.separator;
	public static final String JS_MODEL_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "models" + File.separator;
	public static final String FRAGMENTS = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "fragment" + File.separator;

	public static final String JS_VIEWS_MODAL_TPL_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "views" + File.separator + "modalComponents" + File.separator + "tpl" + File.separator;
	public static final String JS_VIEWS_MODAL_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "views" + File.separator + "modalComponents" + File.separator;
	public static final String FILTER_MODEL_FOLDER = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "model" + File.separator + "filter" + File.separator;

	private static String getProperty(String key, String defaultValue) {
		return prop.getProperty(key, defaultValue);
	}

	private static Boolean booleanValue(String value) {
		return Boolean.valueOf(value);
	}

	private static int integerValue(String value) {
		int parseInt = 0;
		try {
			parseInt = Integer.parseInt(value);
		} catch (Exception e) {
		}
		return parseInt;
	}
}
