package br.com.c3pgen.base;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationConfigurationType;

public class BaseAppGenerator {

	private FreeMarkerConfig freeMarkerConfig;
	private Application application;

	public BaseAppGenerator(FreeMarkerConfig freeMarkerConfig, Application application) throws Exception {
		this.freeMarkerConfig = freeMarkerConfig;
		this.application = application;
	}

	public void generate() throws Exception {

		generateStaticContent(application);

		GenericGenerator genericGenerator = new GenericGenerator(freeMarkerConfig, application);

		String rootFolder = Util.currentDir() + File.separator + "out/" + application.getAppName();
		String webInfFolder = Util.currentDir() + File.separator + "out/" + application.getAppName() + "src/main/webapp/WEB-INF/" + File.separator;

		String javaCoreFolder = Util.currentDir() + File.separator + "out/" + application.getAppName() + "/src/main/java/" + application.getCorePackage().replace(".", File.separator) + File.separator;
		String javaRootFolder = Util.currentDir() + File.separator + "out/" + application.getAppName() + "/src/main/java/" + application.getRootPackage().replace(".", File.separator) + File.separator;
		String javaRootTestFolder = Util.currentDir() + File.separator + "out/" + application.getAppName() + "/src/test/java/" + application.getRootPackage().replace(".", File.separator) + File.separator;

		String javaRootTestResourcesFolder = Util.currentDir() + File.separator + "out/" + application.getAppName() + "/src/test/resources/";
		String javaRootResourcesFolder = Util.currentDir() + File.separator + "out/" + application.getAppName() + "/src/main/resources/"; 

		String serviceFolder = javaCoreFolder;
		new File(serviceFolder).mkdirs();
		new File(javaRootTestFolder).mkdirs();
		new File(javaRootTestResourcesFolder).mkdirs();

		genericGenerator.generate(FSItemDescription.persistences(javaCoreFolder));
		genericGenerator.generate(FSItemDescription.test(javaRootTestFolder));
		genericGenerator.generate(FSItemDescription.testResources(javaRootTestResourcesFolder));
		genericGenerator.generate(FSItemDescription.persistences2(javaRootFolder));
		genericGenerator.generate(FSItemDescription.audit(javaCoreFolder));
		genericGenerator.generate(FSItemDescription.json(javaCoreFolder));
		// genericGenerator.generate(FSItemDescription.cep(javaRootFolder));
		genericGenerator.generate(FSItemDescription.rs(javaCoreFolder));
		genericGenerator.generate(FSItemDescription.report(javaCoreFolder));
		genericGenerator.generate(FSItemDescription.rbac(javaRootFolder));
		genericGenerator.generate(FSItemDescription.model(javaCoreFolder));
		genericGenerator.generate(FSItemDescription.rsException(javaCoreFolder));
		genericGenerator.generate(FSItemDescription.security(javaCoreFolder));
		genericGenerator.generate(FSItemDescription.serialization(javaCoreFolder));
		genericGenerator.generate(FSItemDescription.service(javaCoreFolder));

		genericGenerator.generate(FSItemDescription.utils(javaCoreFolder));

		genericGenerator.generate(FSItemDescription.otherConfig(rootFolder));

		if (application.getConfigurationType().equals(ApplicationConfigurationType.JAVA)) {
			genericGenerator.generate(FSItemDescription.config(javaRootFolder));

			genericGenerator.generate(FSItemDescription.resources(javaRootResourcesFolder));

		} else {
			genericGenerator.generate(FSItemDescription.configXml(webInfFolder));

		}

	}

	public void generateMobile() throws Exception {

		generateStaticFromMobileCommonFiles(application);
		generateStaticFromMobileTemplateFiles(application);

	}

	private void generateStaticFromMobileTemplateFiles(Application application) throws IOException {

		String baseTemplateFolder = Util.currentDir() + File.separator + "entries" + File.separator + "mobile-templates" + File.separator + "nativedroid";
		String fileInputWebApp = baseTemplateFolder + "/appbase/www";

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + "MobApp" + application.getAppName();

		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));

	}

	private static void generateStaticFromMobileCommonFiles(Application application) throws IOException {
		String baseCommonFolder = Util.currentDir() + File.separator + "entries/" + "mobile-common-files" + File.separator;

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + "MobApp" + application.getAppName();
		String fileInputWebApp = baseCommonFolder + "/appbase/www/base";
		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
	}

	private static void generateStaticContent(Application application) throws IOException {
		generateStaticFromCommonFiles(application);
		generateStaticFromTemplateFiles(application);
	}

	private static void generateStaticFromCommonFiles(Application application) throws IOException {

		// entries/templates/nifty/vue-files
		// entries/templates/nifty/vue-files
		String baseCommonFolder = Util.currentDir() + File.separator + "entries/" + "common-files" + File.separator;

		String fileInputWebApp = "";
		String fileOutput = "";
		if (application.getView().equalsIgnoreCase("next13")) {
			fileInputWebApp = Util.currentDir() + File.separator + "/entries/templates/tailwind/react16-files/base/";
			fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/web/";

		}else if (application.getView().equalsIgnoreCase("react16")) {
			fileInputWebApp = Util.currentDir() + File.separator + "/entries/templates/mui/react16-files/base/";
			fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/web/";

		}else if (application.getView().equalsIgnoreCase("react")) {
			fileInputWebApp = Util.currentDir() + File.separator + "/entries/templates/nifty/react-files/web";
			fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/web";

		} else if (application.getView().equalsIgnoreCase("vue")) {
			fileInputWebApp = Util.currentDir() + File.separator + "/entries/templates/nifty/vue-files/web";
			fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/web";

		} else if (application.getView().equalsIgnoreCase("angular")) {
			// baseCommonFolder = Util.currentDir() + File.separator + "entries/" + "angular-common-files" + File.separator;
		} else if (application.getView().equalsIgnoreCase("backbone")) {
			fileInputWebApp = baseCommonFolder + "/appbase/src/main/webapp";
			String fileInputWebAppOptimizeJs = baseCommonFolder + "/appbase/src/main/resources/optimizejs";
			fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/src/main";
			String fileOutputOptimize = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/src/main/resources";
			FileUtils.copyDirectoryToDirectory(new File(fileInputWebAppOptimizeJs), new File(fileOutputOptimize));
		}

		// FileUtils.copyDirectoryToDirectory(new File(fileInputResources), new File(fileOutput));

		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
		//
		if (new File(fileOutput + "/webapp/WEB-INF/xml-java-based-config.txt").exists())
			FileUtils.forceDelete(new File(fileOutput + "/webapp/WEB-INF/xml-java-based-config.txt"));

	}

	private static void generateStaticFromTemplateFiles(Application application) throws IOException {
		String baseTemplateFolder = Util.currentDir() + File.separator + "entries" + File.separator + "templates" + File.separator + application.getSkin();
		if (application.getView().equalsIgnoreCase("angular")) {
			// baseTemplateFolder = Util.currentDir() + File.separator + "entries" + File.separator + "angular-templates" + File.separator + application.getSkin();
		}
		String fileInputResources = baseTemplateFolder + "/appbase/src/main/resources";
		String fileInputWebApp = baseTemplateFolder + "/appbase/src/main/webapp";

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/src/main";

		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
	}
}
