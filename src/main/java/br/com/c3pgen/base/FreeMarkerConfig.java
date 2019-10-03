package br.com.c3pgen.base;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
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
	private Configuration configuration;

	public FreeMarkerConfig(Application application) {
		String lowerCase = application.getSkin().toLowerCase();
		if (!POOL.containsKey(lowerCase)) {
			POOL.put(lowerCase, initConfiguration(lowerCase));
		}
		configuration = POOL.get(lowerCase);
	}

	private Configuration initConfiguration(String skin) {
		Configuration configuration = new Configuration();
		try {
			String commonPathName = Util.currentDir() + File.separator + "entries" + File.separator + "common-files" + File.separator;
			String commonPathNameAngular = commonPathName + "angular-files" + File.separator;
			String commonPathNameNodeExpress = commonPathName + "appbaseNodeExpress" + File.separator;

			String commonPathNameVue = commonPathName + "angular-files" + File.separator;

			// String commonMobilePathName = Util.currentDir() + File.separator + "entries" + File.separator + "mobile-common-files" + File.separator;
			String testTemplates = Util.currentDir() + File.separator + "entries" + File.separator + "common-files" + File.separator + "tests" + File.separator;

			String templatePathName = Util.currentDir() + File.separator + "entries" + File.separator + "templates" + File.separator + skin + File.separator;

			String templateVuePathName = templatePathName + "vue-files";

			String templateReactPathName = templatePathName + "react-files";

			String templateCorePathName = Util.currentDir() + File.separator + "entries" + File.separator + "templates" + File.separator + skin + File.separator + "appbase" + File.separator + "core" + File.separator;
			// String mobileTemplateCorePathName = Util.currentDir() + File.separator + "entries" + File.separator + "mobile-templates" + File.separator + "nativedroid" + File.separator + "appbase" + File.separator + "core" + File.separator;
			boolean exists = new File(commonPathName).exists();
			FileTemplateLoader ftl1 = new FileTemplateLoader(new File(commonPathName));
			FileTemplateLoader ftlAngular = new FileTemplateLoader(new File(commonPathNameAngular));
			FileTemplateLoader ftlNodeExpress = new FileTemplateLoader(new File(commonPathNameNodeExpress));
			FileTemplateLoader ftlVue = new FileTemplateLoader(new File(templateVuePathName));
			FileTemplateLoader ftlReact = new FileTemplateLoader(new File(templateReactPathName));
			// FileTemplateLoader ftlMobileCommon = new FileTemplateLoader(new File(commonMobilePathName));
			// FileTemplateLoader ftlMobileTemplateCommon = new FileTemplateLoader(new File(mobileTemplateCorePathName));
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
			FileTemplateLoader fileTemplateResourcesDb = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/resources/db"));

			FileTemplateLoader fileTemplateWebApp = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/webapp"));
			FileTemplateLoader fileTemplateWEB_INF = new FileTemplateLoader(new File(commonPathName + "appbase/src/main/webapp/WEB-INF"));

			// FileTemplateLoader fileTemplateRestClientTests = new FileTemplateLoader(new File(commonPathName + "appbase/src/test/java/br/com/app/restclientes"));
			FileTemplateLoader fileTemplateTestResources = new FileTemplateLoader(new File(commonPathName + "appbase/src/test/resources"));
			FileTemplateLoader fileTemplateBaseTests = new FileTemplateLoader(new File(commonPathName + "appbase/src/test/java/br/com/app"));

			// quando adiciona esse rtemplate a geração para de funcionar, por isso foi removido
			// FileTemplateLoader fileTemplateRestControllerTests = new FileTemplateLoader(new File(commonPathName + "appbase/src/test/java/br/com/app/integration/controller"));

			TemplateLoader[] loaders = new TemplateLoader[] { ftlAngular,ftlNodeExpress, ftlVue, ftlReact, ftl1, ftlTests, fileTemplateBase, fileTemplateroot, fileTemplateProdu, fileTemplateAudit, fileTemplateJson, fileTemplateConfig, fileTemplateModel, fileTemplatePersistence,
					fileTemplatePersistencePagination, fileTemplateReports, fileTemplateRs, fileTemplateRsException, fileTemplateSecuriy, fileTemplateSerialization, fileTemplateService, fileTemplateUtils, fileTemplateResources, fileTemplateResourcesDb, fileTemplateWebApp,
					fileTemplateWEB_INF, fileTemplateTestResources, fileTemplateBaseTests };

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

		data.put("kebabCase", new ToKebabCaseMethod());

		data.put("lowercase", new ToLowerCaseMethod());
		data.put("isNumeric", new IsNumericMethod());
		data.put("getRequiredClass", new IsRequiredMethod());
		data.put("getMaxLen", new MaxLenMethod());
		data.put("getVueMask", new GetMaskVueMethod());
		data.put("getDataInputFormat", new DataInputFormatMethod());
		data.put("dataType", new DataTypeMethod());
		data.put("package", application.getRootPackage());
		data.put("toListString", new ToStringMethod());
		data.put("application", application);
		data.put("package", application.getRootPackage());
		data.put("getOwnerName", new getOwnerNameMethod());
		data.put("JSetupVersion", Util.JSETUP_VERSION);
		return data;
	}

	public Template getTemplate(String templateName) throws IOException {
		return configuration.getTemplate(templateName);
	}
}
