package br.com.c3pgen.base;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import br.com.c3pgen.base.methods.DataInputFormatMethod;
import br.com.c3pgen.base.methods.DataTypeMethod;
import br.com.c3pgen.base.methods.FirstLowerCaseMethod;
import br.com.c3pgen.base.methods.FirstUpperCaseMethod;
import br.com.c3pgen.base.methods.IsNumericMethod;
import br.com.c3pgen.base.methods.IsRequiredMethod;
import br.com.c3pgen.base.methods.MaxLenMethod;
import br.com.c3pgen.base.methods.SnakeCaseStringMethod;
import br.com.c3pgen.base.methods.ToKebabCaseMethod;
import br.com.c3pgen.base.methods.ToLowerCaseMethod;
import br.com.c3pgen.base.methods.ToStringMethod;
import br.com.c3pgen.base.methods.ToUpperCaseMethod;
import br.com.c3pgen.base.methods.GetMaskVueMethod;
import br.com.c3pgen.base.methods.getOwnerNameMethod;
import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import freemarker.cache.FileTemplateLoader;
import freemarker.cache.MultiTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateExceptionHandler;
import freemarker.template.Version;

//criar um para cada skin

//NOTA IMPORTANTE: aquele erro do template not found acontece quando voce pasa um caminho que não existe para a gerencia dos templates. Arranquei as pastas de templates mobile e deu erro, foi quando arranquei as definições que apontavam pra lá e volou a funcionar.
public class FreeMarkerConfig {

	static Map<String, Configuration> POOL = new HashMap<String, Configuration>();

	private static final Logger LOGGER = Logger.getLogger(FreeMarkerConfig.class);
	private static Configuration configuration;

	public static FreeMarkerConfig getInstance(Application application) {
		String lowerCase = application.getSkin().toLowerCase();
		configuration = initConfiguration(lowerCase);
		return new FreeMarkerConfig();
	}

	private static Configuration initConfiguration(String skin) {
		Configuration configuration = new Configuration();
		try {
			MultiTemplateLoader loader = new MultiTemplateLoader(getLoaders(skin));
			configuration = new Configuration();
			configuration.setTemplateLoader(loader);
			configuration.setObjectWrapper(new DefaultObjectWrapper());
			configuration.setDefaultEncoding("UTF-8");
			configuration.setTemplateExceptionHandler(TemplateExceptionHandler.HTML_DEBUG_HANDLER);
			configuration.setIncompatibleImprovements(new Version(2, 3, 20));
		} catch (Exception e) {
			LOGGER.error("Problemas ao obter configuracao.", e);
		}

		return configuration;
	}

	public Object preparedObject(Application application) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("firstLower", new FirstLowerCaseMethod());
		data.put("firstUpper", new FirstUpperCaseMethod());
		data.put("snakeCase", new SnakeCaseStringMethod());
		data.put("uppercase", new ToUpperCaseMethod());

		data.put("kebabCase", new ToKebabCaseMethod());

		data.put("lowercase", new ToLowerCaseMethod());
		data.put("isNumeric", new IsNumericMethod());
		data.put("getRequiredClass", new IsRequiredMethod());
		data.put("getMaxLen", new MaxLenMethod());
		data.put("getVueMask", new GetMaskVueMethod());
		data.put("getDataInputFormat", new DataInputFormatMethod());
		data.put("dataType", new DataTypeMethod());
		data.put("toListString", new ToStringMethod());
		data.put("application", application);
		data.put("package", application.getRootPackage());
		data.put("getOwnerName", new getOwnerNameMethod());
		data.put("JSetupVersion", Util.JSETUP_VERSION);
		return data;
	}

	private static FileTemplateLoader[] getLoaders(String skin) {
		ArrayList<TemplateLoader> loaders = new ArrayList<>();

		List<String> paths = new ArrayList<String>();
		String entriesPath                 = Util.currentDir() + File.separator + "entries" + File.separator;
		String commonFilesPathName         = entriesPath + File.separator + "common-files" + File.separator;
		String commonPathNameNodeExpress   = commonFilesPathName + "appbaseNodeExpress" + File.separator;
		String testTemplates               = commonFilesPathName + File.separator + "tests" + File.separator;
		String templatePathName            = entriesPath + "templates" + File.separator + skin + File.separator;
		String templateVuePathName         = templatePathName + "vue-files";
		String templateReactPathName       = templatePathName + "react16-files";
		String templateReact16PathName     = entriesPath + "templates" + File.separator + "mui" + File.separator + "react16-files";
		String templateCorePathName        = entriesPath + "templates" + File.separator + skin + File.separator + "appbase" + File.separator + "core" + File.separator;

		paths.add(commonPathNameNodeExpress);
		paths.add(templateVuePathName);
		paths.add(templateReactPathName);
		paths.add(templateReact16PathName);
		paths.add(testTemplates);
		paths.add(templateCorePathName);
		paths.add(commonFilesPathName);
		paths.add(commonFilesPathName + "appbase");
		paths.add(commonFilesPathName + "appbase/produ");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/audit");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/json");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/config");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/model");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/persistence");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/persistence/pagination");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/reports");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/rs");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/rs/exception");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/security");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/serialization");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/service");
		paths.add(commonFilesPathName + "appbase/src/main/java/br/com/app/utils");
		paths.add(commonFilesPathName + "appbase/src/main/resources");
		paths.add(commonFilesPathName + "appbase/src/main/resources/db");
		paths.add(commonFilesPathName + "appbase/src/main/webapp");
		paths.add(commonFilesPathName + "appbase/src/main/webapp/WEB-INF");
		paths.add(commonFilesPathName + "appbase/src/test/resources");
		paths.add(commonFilesPathName + "appbase/src/test/java/br/com/app");
		for (String path : paths) {
			File file = new File(path);
			try {
				if (file.exists()) {
					loaders.add(new FileTemplateLoader(file));
				} else {
					System.out.println("FreeMarkerConfig.getLoaders()" + path);
				}
			} catch (IOException e) {
			}
		}
		return loaders.toArray(new FileTemplateLoader[loaders.size()]);
	}

	public Template getTemplate(String templateName) throws IOException {
		return configuration.getTemplate(templateName);
	}
}
