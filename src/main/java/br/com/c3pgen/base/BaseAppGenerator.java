package br.com.c3pgen.base;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;

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

		String javaRootFolder = Util.currentDir() + File.separator + "out/" + application.getAppName() + "/src/main/java/" + application.getCorePackage().replace(".", File.separator) + File.separator;

		String serviceFolder = javaRootFolder;
		new File(serviceFolder).mkdirs();

		genericGenerator.generate(FSItemDescription.persistences(javaRootFolder));
		genericGenerator.generate(FSItemDescription.audit(javaRootFolder));
		genericGenerator.generate(FSItemDescription.json(javaRootFolder));
		// genericGenerator.generate(FSItemDescription.cep(javaRootFolder));
		genericGenerator.generate(FSItemDescription.rs(javaRootFolder));
		genericGenerator.generate(FSItemDescription.report(javaRootFolder));
		// genericGenerator.generate(FSItemDescription.rbac(javaRootFolder));
		genericGenerator.generate(FSItemDescription.model(javaRootFolder));
		genericGenerator.generate(FSItemDescription.rsException(javaRootFolder));
		genericGenerator.generate(FSItemDescription.security(javaRootFolder));
		genericGenerator.generate(FSItemDescription.serialization(javaRootFolder));
		genericGenerator.generate(FSItemDescription.service(javaRootFolder));

		genericGenerator.generate(FSItemDescription.utils(javaRootFolder));

	}

	public void generateMobile() throws Exception {

		generateStaticFromMobileCommonFiles(application);
		generateStaticFromMobileTemplateFiles(application);

	}

	private void generateStaticFromMobileTemplateFiles(Application application) throws IOException {

		String baseTemplateFolder = Util.currentDir() + File.separator + "entries" +  File.separator + "mobile-templates" + File.separator + "nativedroid";
		String fileInputWebApp = baseTemplateFolder + "/appbase/www";

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + "MobApp" + application.getAppName();

		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));

	}

	private static void generateStaticFromMobileCommonFiles(Application application) throws IOException {
		String baseCommonFolder = Util.currentDir() + File.separator + "entries" +  "mobile-common-files" + File.separator;

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + "MobApp" + application.getAppName();
		String fileInputWebApp = baseCommonFolder + "/appbase/www";
		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
	}

	private static void generateStaticContent(Application application) throws IOException {
		generateStaticFromCommonFiles(application);
		generateStaticFromTemplateFiles(application);
	}

	private static void generateStaticFromCommonFiles(Application application) throws IOException {

		String baseCommonFolder = Util.currentDir() + File.separator + "entries" +  "common-files" + File.separator;
		if (application.getView().equalsIgnoreCase("angular")) {
			baseCommonFolder = Util.currentDir() + File.separator + "entries" +  "angular-common-files" + File.separator;
		}
		String fileInputResources = baseCommonFolder + "/appbase/src/main/resources";

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/src/main";

		String fileInputWebApp = baseCommonFolder + "/appbase/src/main/webapp";

		FileUtils.copyDirectoryToDirectory(new File(fileInputResources), new File(fileOutput));
		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
	}

	private static void generateStaticFromTemplateFiles(Application application) throws IOException {
		String baseTemplateFolder = Util.currentDir() + File.separator + "entries" +  "templates" + File.separator + application.getSkin();
		if (application.getView().equalsIgnoreCase("angular")) {
			baseTemplateFolder = Util.currentDir() + File.separator + "entries" +  "angular-templates" + File.separator + application.getSkin();
		}
		String fileInputResources = baseTemplateFolder + "/appbase/src/main/resources";
		String fileInputWebApp = baseTemplateFolder + "/appbase/src/main/webapp";

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/src/main";

		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
	}
}
