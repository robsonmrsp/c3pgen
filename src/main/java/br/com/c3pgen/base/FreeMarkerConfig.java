package br.com.c3pgen.base;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import br.com.c3pgen.base.methods.DataTypeMethod;
import br.com.c3pgen.base.methods.FirstLowerCaseMethod;
import br.com.c3pgen.base.methods.FirstUpperCaseMethod;
import br.com.c3pgen.base.methods.IsNumericMethod;
import br.com.c3pgen.base.methods.IsRequiredMethod;
import br.com.c3pgen.base.methods.MaxLenMethod;
import br.com.c3pgen.base.methods.MybatisJdbcType;
import br.com.c3pgen.base.methods.SnakeCaseStringMethod;
import br.com.c3pgen.base.methods.ToLowerCaseMethod;
import br.com.c3pgen.base.methods.ToStringMethod;
import br.com.c3pgen.base.methods.ToUpperCaseMethod;
import br.com.c3pgen.base.methods.UpperSnakeCaseStringMethod;
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
public class FreeMarkerConfig {

	static Map<String, Configuration> POOL = new HashMap<String, Configuration>();

	private static final Logger LOGGER = Logger.getLogger(FreeMarkerConfig.class);
	private Configuration configuration;

	public FreeMarkerConfig(Application application) {
		if (!POOL.containsKey(application.getSkin())) {
			POOL.put(application.getSkin(), initConfiguration(application.getSkin()));
		}
		configuration = POOL.get(application.getSkin());
	}

	private Configuration initConfiguration(String skin) {
		Configuration configuration = new Configuration();
		try {
			String commonPathName = Util.currentDir() + File.separator + "entries" + File.separator + "common-files" + File.separator;
			String commonMobilePathName = Util.currentDir() + File.separator + "entries" + File.separator + "mobile-common-files" + File.separator;
			String testTemplates = Util.currentDir() + File.separator + "entries" + File.separator + "common-files" + File.separator + "tests" + File.separator;

			String templateCorePathName = Util.currentDir() + File.separator + "entries" + File.separator + "templates" + File.separator + skin + File.separator + "appbase" + File.separator + "core" + File.separator;
			String mobileTemplateCorePathName = Util.currentDir() + File.separator + "entries" + File.separator + "mobile-templates" + File.separator + "nativedroid" + File.separator + "appbase" + File.separator + "core" + File.separator;

			FileTemplateLoader ftl1 = new FileTemplateLoader(new File(commonPathName));
			FileTemplateLoader ftlMobileCommon = new FileTemplateLoader(new File(commonMobilePathName));
			FileTemplateLoader ftlMobileTemplateCommon = new FileTemplateLoader(new File(mobileTemplateCorePathName));
			FileTemplateLoader ftlTests = new FileTemplateLoader(new File(testTemplates));

			FileTemplateLoader fileTemplateBase = new FileTemplateLoader(new File(templateCorePathName));

			FileTemplateLoader fileTemplateroot = new FileTemplateLoader(new File(commonPathName + "appbase"));
			FileTemplateLoader fileTemplateProdu = new FileTemplateLoader(new File(commonPathName + "appbase/produ"));
			FileTemplateLoader fileTemplateAudit = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/audit"));
			FileTemplateLoader fileTemplateJson = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/json"));
			FileTemplateLoader fileTemplateConfig = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/config"));
			FileTemplateLoader fileTemplateModel = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/model"));
			FileTemplateLoader fileTemplatePersistence = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/persistence"));
			FileTemplateLoader fileTemplatePersistencePagination = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/persistence/pagination"));
			FileTemplateLoader fileTemplateReports = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/reports"));

			FileTemplateLoader fileTemplateRs = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/rs"));
			FileTemplateLoader fileTemplateRsException = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/rs/exception"));
			FileTemplateLoader fileTemplateSecuriy = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/security"));
			FileTemplateLoader fileTemplateSerialization = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/serialization"));
			FileTemplateLoader fileTemplateService = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/service"));
			FileTemplateLoader fileTemplateUtils = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/java/br/com/app/utils"));
			FileTemplateLoader fileTemplateResources = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/resources"));

			FileTemplateLoader fileTemplateWebApp = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/webapp"));
			FileTemplateLoader fileTemplateWEB_INF = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/webapp/WEB-INF"));

			// FileTemplateLoader fileTemplateRestClientTests = new FileTemplateLoader(new File(commonPathName + "appbase/src/test/java/br/com/app/restclientes"));
			FileTemplateLoader fileTemplateTestResources = new FileTemplateLoader(new File(commonPathName + "appbase/src/test/resources"));
			FileTemplateLoader fileTemplateBaseTests = new FileTemplateLoader(new File(commonPathName + "appbase/src/test/java/br/com/app"));

			//quando adiciona esse rtemplate a geração para de funcionar, por isso foi removido
			// FileTemplateLoader fileTemplateRestControllerTests = new FileTemplateLoader(new File(commonPathName + "appbase/src/test/java/br/com/app/integration/controller"));

			TemplateLoader[] loaders = new TemplateLoader[] { ftl1, ftlMobileCommon, ftlMobileTemplateCommon, ftlTests, fileTemplateBase, fileTemplateroot, fileTemplateProdu, fileTemplateAudit, fileTemplateJson,fileTemplateConfig, fileTemplateModel, fileTemplatePersistence,
					fileTemplatePersistencePagination, fileTemplateReports, fileTemplateRs, fileTemplateRsException, fileTemplateSecuriy, fileTemplateSerialization, fileTemplateService, fileTemplateUtils, fileTemplateResources, fileTemplateWebApp, fileTemplateWEB_INF,
					fileTemplateTestResources, fileTemplateBaseTests };

			MultiTemplateLoader loader = new MultiTemplateLoader(loaders);
			configuration = new Configuration();
			configuration.setTemplateLoader(loader);
			configuration.setObjectWrapper(new DefaultObjectWrapper());
			configuration.setDefaultEncoding("UTF-8");
			configuration.setTemplateExceptionHandler(TemplateExceptionHandler.HTML_DEBUG_HANDLER);
			configuration.setIncompatibleImprovements(new Version(2, 3, 20));
		} catch (IOException e) {

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
		data.put("lowercase", new ToLowerCaseMethod());
		data.put("isNumeric", new IsNumericMethod());
		data.put("getRequiredClass", new IsRequiredMethod());
		data.put("getMaxLen", new MaxLenMethod());
		data.put("dataType", new DataTypeMethod());
		data.put("package", application.getRootPackage());
		data.put("toListString", new ToStringMethod());
		data.put("application", application);
		data.put("getMybatisJdbcType", new MybatisJdbcType());
		data.put("package", application.getRootPackage());
		data.put("getOwnerName", new getOwnerNameMethod());
		data.put("upperSnakeCase", new UpperSnakeCaseStringMethod());
		data.put("JSetupVersion", Util.JSETUP_VERSION);
		return data;
	}

	public Template getTemplate(String templateName) throws IOException {
		return configuration.getTemplate(templateName);
	}
}
