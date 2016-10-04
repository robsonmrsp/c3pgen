package br.com.c3pgen.base;

import java.io.File;

import org.apache.log4j.Logger;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
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
	private static MarkerGenerator javaMybatisModelTemplate;
	private static MarkerGenerator javaMybatisModelGenerator;
	private static MarkerGenerator resourcesGenerator;
	private static MarkerGenerator mybatisResourcesGenerator;
	private static MarkerGenerator daoGenerator;
	private static MarkerGenerator mapperMybatisGenerator;
	private static MarkerGenerator xmlMybatisGenerator;

	private static MarkerGenerator basicServiceImpGenerator;
	private static MarkerGenerator basicMybatisServiceGenerator;
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

	// para o angular
	private static MarkerGenerator jsAngularFormControllerGenerator;
	private static MarkerGenerator jsAngularPageControllerGenerator;
	private static MarkerGenerator jsAngularServiceGenerator;
	private static MarkerGenerator htmlAngularFormTemplateGenerator;
	private static MarkerGenerator htmlAngularPageTemplateGenerator;
	private static MarkerGenerator htmlAngularModalTemplateGenerator;
	private static MarkerGenerator jsAngularModalDirectiveGenerator;
	private static MarkerGenerator jsAngularModalControllerGenerator;
	private static MarkerGenerator jsAngularRouterGenerator;
	private static MarkerGenerator jspAngularDesenvIndexGenerator;
	private static MarkerGenerator jspAngularProduIndexGenerator;
	private static MarkerGenerator htmlAngularDesenvLoginGenerator;
	private static MarkerGenerator htmlAngularProduLoginGenerator;
	private static MarkerGenerator xmlAngularPomGenerator;
	private Application application;

	private FreeMarkerConfig freeMarkerConfig;

	public EntitiesGenerator(FreeMarkerConfig freeMarkerConfig, Application application) {
		this.freeMarkerConfig = freeMarkerConfig;
		this.application = application;
	}

	public void generate(String... exceptions) throws Exception {

		String appRootFolder = Util.currentDir() + File.separator + "out/" + application.getAppName();

		String webAppRootFolder = appRootFolder + "/src/main/webapp/";
		String jsRootFolder = webAppRootFolder + "js/"; // js/spec/router
		String jsSpecRootFolder = webAppRootFolder + "js/" + "spec/router/";
		String javaRootFolder = appRootFolder + "/src/main/java/" + application.getRootPackage().replace(".", File.separator);

		javaModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaModelTemplate.tpl", javaRootFolder + "/model/", TemplateFileName.MODEL_JAVA, FileType.JAVA);
		javaMybatisModelTemplate = new MarkerGenerator(freeMarkerConfig, application, "JavaMybatisModelTemplate.tpl", javaRootFolder + "/model/", TemplateFileName.MODEL_JAVA, FileType.JAVA);
		javaMybatisModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaModelTemplate.tpl", javaRootFolder + "/model/", TemplateFileName.MODEL_JAVA, FileType.JAVA);

		flterGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaFilterTemplate.tpl", javaRootFolder + "/model/filter/", TemplateFileName.FILTER_MODEL_JAVA, FileType.JAVA);

		javaJsonGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaJsonTemplate.tpl", javaRootFolder + "/json/", TemplateFileName.JSON_JAVA, FileType.JAVA);

		basicServiceGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaBasicServiceTemplate.tpl", javaRootFolder + "/service/", TemplateFileName.SERVICE_JAVA, FileType.JAVA);
		daoGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaDaoTemplate.tpl", javaRootFolder + "/persistence/", TemplateFileName.DAO_JAVA, FileType.JAVA);

		basicServiceImpGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaBasicServiceImpTemplate.tpl", javaRootFolder + "/service/", TemplateFileName.SERVICE_JAVA_IMP, FileType.JAVA);

		basicMybatisServiceGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaMybatisBasicServiceTemplate.tpl", javaRootFolder + "/service/", TemplateFileName.SERVICE_JAVA, FileType.JAVA);

		xmlMybatisGenerator = new MarkerGenerator(freeMarkerConfig, application, "MybatisXmlTemplate.tpl", javaRootFolder + "/persistence/", TemplateFileName.MYBATIS_XML, FileType.XML);

		resourcesGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaResourcesTemplate.tpl", javaRootFolder + "/rs/", TemplateFileName.RESOURCE_JAVA, FileType.JAVA);

		mybatisResourcesGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaMybatisResourcesTemplate.tpl", javaRootFolder + "/rs/", TemplateFileName.RESOURCE_JAVA, FileType.JAVA);

		jsColelctionGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsCollectionTemplate.tpl", jsRootFolder + "/collections/", TemplateFileName.COLLECTION_JS, FileType.JAVASCRIPT);

		jsPageColelctionGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsPageCollectionTemplate.tpl", jsRootFolder + "/collections/", TemplateFileName.PAGE_COLLECTION_JS, FileType.JAVASCRIPT);

		jsModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsModelTemplate.tpl", jsRootFolder + "/models/", TemplateFileName.MODEL_JS, FileType.JAVASCRIPT);

		jsFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsFormTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.BASIC_FORM_JS, FileType.JAVASCRIPT);

		jsPageGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsPageTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.PAGE_JS, FileType.JAVASCRIPT);

		JsMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMultiSelectTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.MULTI_SELECT_JS, FileType.JAVASCRIPT);
		JsModalMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsModalMultiSelectTemplate.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.MODAL_MULTI_SELECT_JS, FileType.JAVASCRIPT);

		htmlMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlMultiSelectTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.MULTI_SELECT_HTML, FileType.HTML);
		htmlModalMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlModalMultiSelectTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.MODAL_MULTI_SELECT_HTML, FileType.HTML);

		htmlFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlFormTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.FORM_TEMPLATE_HTML, FileType.HTML);
		htmlPageGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlPageTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.PAGE_TEMPLATE_HTML, FileType.HTML);
		htmlModalGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlModalTemplate.tpl", jsRootFolder + "/views/modalComponents/tpl/", TemplateFileName.MODAL_TEMPLATE_HTML, FileType.HTML);
		mapperMybatisGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaMapperTemplate.tpl", javaRootFolder + "/persistence/", TemplateFileName.MYBATIS_MAPPER_JAVA, FileType.JAVA);

		// htmlBootstrap2FormGenerator = new MarkerGenerator(freeMarkerConfig,
		// application, "HtmlBootstrap2FormTemplate.tpl", jsRootFolder +
		// "/views/${entity.name}/tpl/", TemplateFileName.FORM_TEMPLATE_HTML,
		// FileType.HTML);
		// htmlBootstrap2PageGenerator = new MarkerGenerator(freeMarkerConfig,
		// application, "HtmlBootstrap2PageTemplate.tpl", jsRootFolder +
		// "/views/${entity.name}/tpl/", TemplateFileName.PAGE_TEMPLATE_HTML,
		// FileType.HTML);
		// htmlBootstrap2ModalGenerator = new MarkerGenerator(freeMarkerConfig,
		// application, "HtmlBootstrap2ModalTemplate.tpl", jsRootFolder +
		// "/views/modalComponents/tpl/", TemplateFileName.MODAL_TEMPLATE_HTML,
		// FileType.HTML);

		fragmentsGenerator = new MarkerGenerator(freeMarkerConfig, application, "Fragments.tpl", jsRootFolder + "/fragments", TemplateFileName.FRAGMENT_TEMPLATE_HTML, FileType.FRAGMENT);
		jsModalGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsModalTemplate.tpl", jsRootFolder + "/views/modalComponents/", TemplateFileName.MODAL_TEMPLATE_JS, FileType.JAVASCRIPT);

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

		// GERACAO DE ARQUIVOS ANGULAR
		jsAngularRouterGenerator = new MarkerGenerator(freeMarkerConfig, application, "jsAngularRouter.tpl", jsRootFolder, TemplateFileName.ANGULAR_ROUTER, FileType.JAVASCRIPT);
		jsAngularFormControllerGenerator = new MarkerGenerator(freeMarkerConfig, application, "jsAngularFormController.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.ANGULAR_FORM_CONTROLLER, FileType.JAVASCRIPT);
		htmlAngularFormTemplateGenerator = new MarkerGenerator(freeMarkerConfig, application, "htmlAngularFormTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.ANGULAR_FORM_TEMPLATE, FileType.HTML);

		jsAngularPageControllerGenerator = new MarkerGenerator(freeMarkerConfig, application, "jsAngularPageController.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.ANGULAR_PAGE_CONTROLLER, FileType.JAVASCRIPT);
		htmlAngularPageTemplateGenerator = new MarkerGenerator(freeMarkerConfig, application, "htmlAngularPageTemplate.tpl", jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.ANGULAR_PAGE_TEMPLATE, FileType.HTML);

		jsAngularServiceGenerator = new MarkerGenerator(freeMarkerConfig, application, "jsAngularService.tpl", jsRootFolder + "/views/${entity.name}/", TemplateFileName.ANGULAR_SERVICE, FileType.JAVASCRIPT);

		jsAngularModalDirectiveGenerator = new MarkerGenerator(freeMarkerConfig, application, "jsAngularModalDirective.tpl", jsRootFolder + "/views/modalComponents/", TemplateFileName.ANGULAR_MODAL_DIRECTIVE, FileType.JAVASCRIPT);
		jsAngularModalControllerGenerator = new MarkerGenerator(freeMarkerConfig, application, "jsAngularModalController.tpl", jsRootFolder + "/views/modalComponents/", TemplateFileName.ANGULAR_MODAL_CONTROLLER, FileType.JAVASCRIPT);
		htmlAngularModalTemplateGenerator = new MarkerGenerator(freeMarkerConfig, application, "htmlAngularModalTemplate.tpl", jsRootFolder + "/views/modalComponents/tpl/", TemplateFileName.ANGULAR_MODAL_TEMPLATE, FileType.HTML);

		jspAngularDesenvIndexGenerator = new MarkerGenerator(freeMarkerConfig, application, "jspAngularDesenvIndex.tpl", webAppRootFolder, TemplateFileName.INDEX_JSP, FileType.JSP);
		jspAngularProduIndexGenerator = new MarkerGenerator(freeMarkerConfig, application, "jspAngularProduIndex.tpl", appRootFolder + "/produ/", TemplateFileName.INDEX_JSP, FileType.JSP);
		htmlAngularDesenvLoginGenerator = new MarkerGenerator(freeMarkerConfig, application, "htmlAngularDesenvLogin.tpl", webAppRootFolder, TemplateFileName.LOGIN_HTML, FileType.HTML);
		htmlAngularProduLoginGenerator = new MarkerGenerator(freeMarkerConfig, application, "htmlAngularProduLogin.tpl", appRootFolder + "/produ/", TemplateFileName.LOGIN_HTML, FileType.HTML);
		xmlAngularPomGenerator = new MarkerGenerator(freeMarkerConfig, application, "xmlAngularPom.tpl", appRootFolder + "/", TemplateFileName.POM_XML, FileType.XML);

		xmlAngularPomGenerator = new MarkerGenerator(freeMarkerConfig, application, "xmlAngularPom.tpl", appRootFolder + "/", TemplateFileName.POM_XML, FileType.XML);
		try {
			if (application.getView().equalsIgnoreCase("angular")) {
				for (ApplicationEntity ent : application.getEntities()) {
					LOGGER.info("-------------------------------Processando entidade " + ent.getName() + "-------------------------------");
					javaModelGenerator.generateEntityFile(application, ent);
					javaJsonGenerator.generateEntityFile(application, ent);
					basicServiceGenerator.generateEntityFile(application, ent);
					basicServiceImpGenerator.generateEntityFile(application, ent);
					daoGenerator.generateEntityFile(application, ent);
					flterGenerator.generateEntityFile(application, ent);
					resourcesGenerator.generateEntityFile(application, ent);

					// geração de particulares a tecnologia da view
					jsAngularFormControllerGenerator.generateEntityFile(application, ent);
					htmlAngularFormTemplateGenerator.generateEntityFile(application, ent);
					jsAngularPageControllerGenerator.generateEntityFile(application, ent);
					htmlAngularPageTemplateGenerator.generateEntityFile(application, ent);
					jsAngularServiceGenerator.generateEntityFile(application, ent);
					jsAngularModalDirectiveGenerator.generateEntityFile(application, ent);
					htmlAngularModalTemplateGenerator.generateEntityFile(application, ent);
					jsAngularModalControllerGenerator.generateEntityFile(application, ent);
				}
				jsAngularRouterGenerator.generate(application);
				jspAngularDesenvIndexGenerator.generate(application);
				jspAngularProduIndexGenerator.generate(application);
				htmlAngularDesenvLoginGenerator.generate(application);
				htmlAngularProduLoginGenerator.generate(application);

				beansGenerator.generate(application);
				xmlAngularPomGenerator.generate(application);

				buildPropertiesGenerator.generate(application);
				buildXmlGenerator.generate(application);
			} else {
				for (ApplicationEntity ent : application.getEntities()) {

					if (notInException(ent.getName(), exceptions)) {
						LOGGER.info("-------------------------------Processando entidade " + ent.getName() + "-------------------------------");
						javaJsonGenerator.generateEntityFile(application, ent);

						if (application.getPersistenceFramework().equals("hibernate")) {
							javaModelGenerator.generateEntityFile(application, ent);
							basicServiceGenerator.generateEntityFile(application, ent);
							basicServiceImpGenerator.generateEntityFile(application, ent);
							daoGenerator.generateEntityFile(application, ent);
							resourcesGenerator.generateEntityFile(application, ent);
						} else {
							javaMybatisModelGenerator.generateEntityFile(application, ent);
							basicMybatisServiceGenerator.generateEntityFile(application, ent);
							mapperMybatisGenerator.generateEntityFile(application, ent);
							xmlMybatisGenerator.generateEntityFile(application, ent);
							mybatisResourcesGenerator.generateEntityFile(application, ent);
							javaMybatisModelTemplate.generateEntityFile(application, ent);
						}

						flterGenerator.generateEntityFile(application, ent);

						// geração de particulares a tecnologia da view
						jsFormGenerator.generateEntityFile(application, ent);
						jsColelctionGenerator.generateEntityFile(application, ent);
						jsModelGenerator.generateEntityFile(application, ent);
						jsPageGenerator.generateEntityFile(application, ent);
						jsPageColelctionGenerator.generateEntityFile(application, ent);

						htmlFormGenerator.generateEntityFile(application, ent);
						htmlPageGenerator.generateEntityFile(application, ent);
						htmlModalGenerator.generateEntityFile(application, ent);

						JsMultiSelectGenerator.generateEntityFile(application, ent);
						JsModalMultiSelectGenerator.generateEntityFile(application, ent);
						htmlModalMultiSelectGenerator.generateEntityFile(application, ent);
						htmlMultiSelectGenerator.generateEntityFile(application, ent);
						jsModalGenerator.generateEntityFile(application, ent);
					}

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
			}
		} catch (TemplateException e) {
			LOGGER.error(e);
		}
	}

	private boolean notInException(String id, String... exceptions) {
		if (exceptions != null) {
			for (String integer : exceptions) {
				if (id.equals(integer)) {
					return false;
				}
			}
		}
		return true;
	}

	public void generateMobile() throws Exception {

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
			for (ApplicationEntity ent : application.getEntities()) {
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
