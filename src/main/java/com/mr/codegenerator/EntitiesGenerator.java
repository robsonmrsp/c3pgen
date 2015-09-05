package com.mr.codegenerator;

import java.io.File;
import java.io.IOException;

import org.apache.log4j.Logger;

import com.mr.codegenerator.entities.Application;
import com.mr.codegenerator.entities.Entity;
import com.mr.codegenerator.util.MobileAppGeneratorHelper;
import com.mr.codegenerator.util.Util;

import freemarker.template.TemplateException;

public class EntitiesGenerator {

	public static final Logger LOGGER = Logger.getLogger(EntitiesGenerator.class);

	private static MarkerGenerator jsPageColelctionGenerator;

	private static MarkerGenerator jsColelctionGenerator;
	private static MarkerGenerator jsPageGenerator;
	private static MarkerGenerator jsFormGenerator;
	private static MarkerGenerator jsModelGenerator;
	private static MarkerGenerator jsRouterGenerator;
	private static MarkerGenerator desenvIndexGenerator;
	private static MarkerGenerator htmlPageGenerator;
	private static MarkerGenerator htmlFormGenerator;

	private static MarkerGenerator jsMobileColelctionGenerator;
	private static MarkerGenerator jsMobilePageGenerator;
	private static MarkerGenerator jsMobileFormGenerator;
	private static MarkerGenerator jsMobileModelGenerator;
	private static MarkerGenerator jsMobileRouterGenerator;
	private static MarkerGenerator htmlMobileIndexGenerator;
	private static MarkerGenerator htmlMobilePageGenerator;
	private static MarkerGenerator htmlMobileFormGenerator;

	private static MarkerGenerator jsModalGenerator;
	private static MarkerGenerator flterGenerator;
	private static MarkerGenerator htmlModalGenerator;
	private static MarkerGenerator JsMultiSelectGenerator;
	private static MarkerGenerator JsModalMultiSelectGenerator;
	private static MarkerGenerator htmlModalMultiSelectGenerator;
	private static MarkerGenerator htmlMultiSelectGenerator;

	private static MarkerGenerator javaModelGenerator;
	private static MarkerGenerator resourcesGenerator;
	private static MarkerGenerator daoGenerator;
	private static MarkerGenerator basicServiceImpGenerator;
	private static MarkerGenerator basicServiceGenerator;
	private static MarkerGenerator javaJsonGenerator;
	private static MarkerGenerator fragmentsGenerator;
	private static MarkerGenerator jsRouterSpecGenerator;
	private static MarkerGenerator beansGenerator;
	private static MarkerGenerator pomGenerator;
	private static MarkerGenerator produIndexGenerator;
	private static MarkerGenerator produLoginGenerator;
	private static MarkerGenerator desenvLoginGenerator;
	private static MarkerGenerator buildPropertiesGenerator;
	private static MarkerGenerator buildXmlGenerator;
	private static MarkerGenerator htmlLeftPanelViewGenerator;
	private static MarkerGenerator jsMobileDataBaseHelperGenerator;

	public static void generate(FreeMarkerConfig freeMarkerConfig, Application application) throws Exception {

		String appRootFolder = Util.currentDir() + File.separator + "out/" + application.getAppName();

		String webAppRootFolder = appRootFolder + "/src/main/webapp/";
		String jsRootFolder = webAppRootFolder + "js/"; // js/spec/router
		String jsSpecRootFolder = webAppRootFolder + "js/" + "spec/router/";
		String javaRootFolder = appRootFolder + "/src/main/java/" + application.getRootPackage().replace(".", File.separator);

		javaModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaModelTemplate.tpl", javaRootFolder + "/model/", TemplateFileName.MODEL_JAVA, FileType.JAVA);
		flterGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaFilterTemplate.tpl", javaRootFolder + "/model/filter/", TemplateFileName.FILTER_MODEL_JAVA, FileType.JAVA);
		javaJsonGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaJsonTemplate.tpl", javaRootFolder + "/json/", TemplateFileName.JSON_JAVA, FileType.JAVA);
		basicServiceGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaBasicServiceTemplate.tpl", javaRootFolder + "/service/", TemplateFileName.SERVICE_JAVA, FileType.JAVA);
		basicServiceImpGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaBasicServiceImpTemplate.tpl", javaRootFolder + "/service/", TemplateFileName.SERVICE_JAVA_IMP, FileType.JAVA);
		daoGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaDaoTemplate.tpl", javaRootFolder + "/persistence/", TemplateFileName.DAO_JAVA, FileType.JAVA);
		resourcesGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaResourcesTemplate.tpl", javaRootFolder + "/rs/", TemplateFileName.RESOURCE_JAVA, FileType.JAVA);

		jsColelctionGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsCollectionTemplate.tpl", jsRootFolder + "/collections/", TemplateFileName.COLLECTION_JS, FileType.JAVASCRIPT);

		jsPageColelctionGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsPageCollectionTemplate.tpl", jsRootFolder + "/collections/", TemplateFileName.PAGE_COLLECTION_JS, FileType.JAVASCRIPT);

		jsModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsModelTemplate.tpl", jsRootFolder + "/models/", TemplateFileName.MODEL_JS, FileType.JAVASCRIPT);
		jsFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsFormTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.BASIC_FORM_JS, FileType.JAVASCRIPT);

		jsPageGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsPageTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.PAGE_JS, FileType.JAVASCRIPT);

		JsMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMultiSelectTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.MULTI_SELECT_JS, FileType.JAVASCRIPT);
		JsModalMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsModalMultiSelectTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.MODAL_MULTI_SELECT_JS, FileType.JAVASCRIPT);

		htmlModalMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlModalMultiSelectTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.MODAL_MULTI_SELECT_HTML, FileType.HTML);

		htmlMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlMultiSelectTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.MULTI_SELECT_HTML, FileType.HTML);

		htmlFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlFormTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.FORM_TEMPLATE_HTML, FileType.HTML);
		htmlPageGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlPageTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.PAGE_TEMPLATE_HTML, FileType.HTML);
		fragmentsGenerator = new MarkerGenerator(freeMarkerConfig, application, "Fragments.tpl", jsRootFolder + "/fragments", TemplateFileName.FRAGMENT_TEMPLATE_HTML, FileType.FRAGMENT);
		jsModalGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsModalTemplate.tpl", jsRootFolder + "/views/modalComponents/", TemplateFileName.MODAL_TEMPLATE_JS, FileType.JAVASCRIPT);

		htmlModalGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlModalTemplate.tpl", jsRootFolder + "/views/modalComponents/tpl/", TemplateFileName.MODAL_TEMPLATE_HTML, FileType.HTML);

		jsRouterGenerator = new MarkerGenerator(freeMarkerConfig, application, "Router.tpl", jsRootFolder, TemplateFileName.ROUTER_JS, FileType.JAVASCRIPT);

		jsRouterSpecGenerator = new MarkerGenerator(freeMarkerConfig, application, "JSRouterSpecTemplate.js", jsSpecRootFolder, TemplateFileName.ROUTER_SPEC_JS, FileType.JAVASCRIPT);

		beansGenerator = new MarkerGenerator(freeMarkerConfig, application, "beans.tpl", webAppRootFolder + "WEB-INF/", TemplateFileName.BEANS_XML, FileType.XML);

		pomGenerator = new MarkerGenerator(freeMarkerConfig, application, "pom.tpl", appRootFolder + "/", TemplateFileName.POM_XML, FileType.XML);

		buildPropertiesGenerator = new MarkerGenerator(freeMarkerConfig, application, "buildProperties.tpl", appRootFolder + "/", TemplateFileName.BUILD_PROPERTIES, FileType.PROPERTIES);

		buildXmlGenerator = new MarkerGenerator(freeMarkerConfig, application, "buildXml.tpl", appRootFolder + "/", TemplateFileName.BUILD_XML, FileType.XML);

		desenvIndexGenerator = new MarkerGenerator(freeMarkerConfig, application, "desenv_index.tpl", webAppRootFolder, TemplateFileName.INDEX_JSP, FileType.JSP);

		produIndexGenerator = new MarkerGenerator(freeMarkerConfig, application, "produ_index.tpl", appRootFolder + "/produ/", TemplateFileName.INDEX_JSP, FileType.JSP);

		desenvLoginGenerator = new MarkerGenerator(freeMarkerConfig, application, "desenv_login.tpl", webAppRootFolder, TemplateFileName.LOGIN_HTML, FileType.HTML);
		produLoginGenerator = new MarkerGenerator(freeMarkerConfig, application, "produ_login.tpl", appRootFolder + "/produ/", TemplateFileName.LOGIN_HTML, FileType.HTML);

		try {
			for (Entity ent : application.getEntities()) {
				LOGGER.info("-------------------------------Processando entidade " + ent.getName() + "-------------------------------");
				javaModelGenerator.generateEntityFile(application, ent);
				javaJsonGenerator.generateEntityFile(application, ent);
				basicServiceGenerator.generateEntityFile(application, ent);
				basicServiceImpGenerator.generateEntityFile(application, ent);
				daoGenerator.generateEntityFile(application, ent);
				jsFormGenerator.generateEntityFile(application, ent);
				resourcesGenerator.generateEntityFile(application, ent);
				jsColelctionGenerator.generateEntityFile(application, ent);
				jsModelGenerator.generateEntityFile(application, ent);
				jsPageGenerator.generateEntityFile(application, ent);
				jsPageColelctionGenerator.generateEntityFile(application, ent);
				htmlFormGenerator.generateEntityFile(application, ent);
				htmlPageGenerator.generateEntityFile(application, ent);
				JsMultiSelectGenerator.generateEntityFile(application, ent);
				JsModalMultiSelectGenerator.generateEntityFile(application, ent);
				htmlModalMultiSelectGenerator.generateEntityFile(application, ent);
				htmlMultiSelectGenerator.generateEntityFile(application, ent);
				jsModalGenerator.generateEntityFile(application, ent);
				htmlModalGenerator.generateEntityFile(application, ent);
				flterGenerator.generateEntityFile(application, ent);
			}
			fragmentsGenerator.generateAppFragmentFile(application.getEntities());
			jsRouterGenerator.generate(application);
			jsRouterSpecGenerator.generate(application);
			beansGenerator.generate(application);
			pomGenerator.generate(application);

			buildPropertiesGenerator.generate(application);
			buildXmlGenerator.generate(application);

			produIndexGenerator.generate(application);
			desenvIndexGenerator.generate(application);

			produLoginGenerator.generate(application);
			desenvLoginGenerator.generate(application);

		} catch (TemplateException e) {
			LOGGER.error(e);
		}
	}

	public static void generateMobile(FreeMarkerConfig freeMarkerConfig, Application application) throws Exception {

		String appRootFolder = Util.currentDir() + File.separator + "out/MobApp" + application.getAppName();

		String webAppRootFolder = appRootFolder + "/www/";
		String jsRootFolder = webAppRootFolder + "js/";

		jsMobileColelctionGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMobileCollectionTemplate.tpl", jsRootFolder + "/collections/", TemplateFileName.COLLECTION_JS, FileType.JAVASCRIPT);

		jsMobileModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMobileModelTemplate.tpl", jsRootFolder + "/models/", TemplateFileName.MODEL_JS, FileType.JAVASCRIPT);
		jsMobileFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMobileFormTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.BASIC_FORM_JS, FileType.JAVASCRIPT);
		jsMobilePageGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMobilePageTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.PAGE_JS, FileType.JAVASCRIPT);
		jsMobileRouterGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMobileRouter.tpl", jsRootFolder, TemplateFileName.MOBILE_ROUTER_JS, FileType.JAVASCRIPT);

		jsMobileDataBaseHelperGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMobileDataBaseHelper.tpl", jsRootFolder + "/utilities/", TemplateFileName.DATA_BASE_HELPER, FileType.JAVASCRIPT);
		htmlLeftPanelViewGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlLeftPanelViewTemplate.tpl", jsRootFolder + "/views/leftPanel/tpl/", TemplateFileName.LEFT_PANEL, FileType.HTML);
		htmlMobileIndexGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlMobileIndex.tpl", webAppRootFolder, TemplateFileName.INDEX_HTML, FileType.HTML);
		htmlMobileFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlMobileFormTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.FORM_TEMPLATE_HTML, FileType.HTML);
		htmlMobilePageGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlMobilePageTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.PAGE_TEMPLATE_HTML, FileType.HTML);

		try {
			for (Entity ent : application.getEntities()) {
				if (ent.getHasMobile()) {
					LOGGER.info("-------------------------------Processando entidade " + ent.getName() + "-------------------------------");
					jsMobileFormGenerator.generateEntityFile(application, ent);
					jsMobileColelctionGenerator.generateEntityFile(application, ent);
					jsMobileModelGenerator.generateEntityFile(application, ent);
					jsMobilePageGenerator.generateEntityFile(application, ent);
					htmlMobileFormGenerator.generateEntityFile(application, ent);
					htmlMobilePageGenerator.generateEntityFile(application, ent);
				}
			}
			jsMobileRouterGenerator.generate(application);
			jsMobileDataBaseHelperGenerator.generate(application);
			htmlMobileIndexGenerator.generate(application);
			htmlLeftPanelViewGenerator.generate(application);
		} catch (TemplateException e) {
			LOGGER.error(e);
		}
	}
}
