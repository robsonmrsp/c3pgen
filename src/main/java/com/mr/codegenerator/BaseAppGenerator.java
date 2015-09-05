package com.mr.codegenerator;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;

import com.mr.codegenerator.entities.Application;
import com.mr.codegenerator.util.Util;

public class BaseAppGenerator {
	private static FreeMarkerConfig freeMarkerConfig;

	public static void generate(FreeMarkerConfig freeMarkerConfig, Application application) throws Exception {

		BaseAppGenerator.freeMarkerConfig = freeMarkerConfig;
		generateStaticContent(application);

		GenericGenerator genericGenerator = new GenericGenerator(freeMarkerConfig, application);

		String javaRootFolder = Util.currentDir() + File.separator + "out/" + application.getAppName() + "/src/main/java/" + application.getRootPackage().replace(".", File.separator) + File.separator;

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

	public static void generateMobile(FreeMarkerConfig freeMarkerConfig, Application application) throws Exception {

		BaseAppGenerator.freeMarkerConfig = freeMarkerConfig;

		generateStaticFromMobileCommonFiles(application);
		generateStaticFromMobileTemplateFiles(application);

	}

	private static void generateStaticFromMobileTemplateFiles(Application application) throws IOException {

		String baseTemplateFolder = Util.currentDir() + File.separator + "entries" + File.separator + "mobile-templates" + File.separator + "nativedroid";
		String fileInputWebApp = baseTemplateFolder + "/appbase/www";

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + "MobApp" + application.getAppName();

		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));

	}

	private static void generateStaticFromMobileCommonFiles(Application application) throws IOException {
		String baseCommonFolder = Util.currentDir() + File.separator + "entries" + File.separator + "mobile-common-files" + File.separator;
		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + "MobApp" + application.getAppName();
		String fileInputWebApp = baseCommonFolder + "/appbase/www";
		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
	}

	private static void generateStaticContent(Application application) throws IOException {
		generateStaticFromCommonFiles(application);
		generateStaticFromTemplateFiles(application);
	}

	private static void generateStaticFromCommonFiles(Application application) throws IOException {

		String baseCommonFolder = Util.currentDir() + File.separator + "entries" + File.separator + "common-files" + File.separator;
		String fileInputResources = baseCommonFolder + "/appbase/src/main/resources";

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/src/main";

		String fileInputWebApp = baseCommonFolder + "/appbase/src/main/webapp";

		FileUtils.copyDirectoryToDirectory(new File(fileInputResources), new File(fileOutput));
		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
	}

	private static void generateStaticFromTemplateFiles(Application application) throws IOException {
		String baseTemplateFolder = Util.currentDir() + File.separator + "entries" + File.separator + "templates" + File.separator + application.getSkin();
		String fileInputResources = baseTemplateFolder + "/appbase/src/main/resources";
		String fileInputWebApp = baseTemplateFolder + "/appbase/src/main/webapp";

		String fileOutput = Util.currentDir() + File.separator + "out" + File.separator + application.getAppName() + "/src/main";

		FileUtils.copyDirectoryToDirectory(new File(fileInputWebApp), new File(fileOutput));
	}
}
