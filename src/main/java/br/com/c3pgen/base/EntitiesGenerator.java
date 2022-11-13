package br.com.c3pgen.base;

import java.io.File;

import org.apache.log4j.Logger;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import freemarker.template.TemplateException;

public class EntitiesGenerator {

	public static final Logger LOGGER = Logger.getLogger(EntitiesGenerator.class);

	// private static MarkerGenerator jsPageColelctionGenerator;

	// private static MarkerGenerator jsColelctionGenerator;
	private static MarkerGenerator jsPageGenerator;
	private static MarkerGenerator jsFormGenerator;

	private static MarkerGenerator tsFormAngularGenerator;

	private static MarkerGenerator vueFormGenerator;
	private static MarkerGenerator vuePageGenerator;

	private static MarkerGenerator reactFormGenerator;
	private static MarkerGenerator reactPageGenerator;
	private static MarkerGenerator reactModalGenerator;

	private static MarkerGenerator reactRouterGenerator;
	private static MarkerGenerator reactSidebarGenerator;

	private static MarkerGenerator react16FormEditGenerator;
	private static MarkerGenerator react16FormNewGenerator;
	private static MarkerGenerator react16PageListGenerator;

	private static MarkerGenerator react16PageListIndexGenerator;
	private static MarkerGenerator react16FormEditIndexGenerator;
	private static MarkerGenerator react16FormNewIndexGenerator;

	private static MarkerGenerator react16SidebarGenerator;

	private static MarkerGenerator vueModalGenerator;
	private static MarkerGenerator vueRouterGenerator;
	private static MarkerGenerator vueSidebarGenerator;

	private static MarkerGenerator jsModelGenerator;
	private static MarkerGenerator jsRouterGenerator;
	private static MarkerGenerator desenvIndexGenerator;
	private static MarkerGenerator htmlPageGenerator;
	private static MarkerGenerator htmlFormGenerator;

	private static MarkerGenerator jsModalGenerator;
	private static MarkerGenerator flterGenerator;
	private static MarkerGenerator htmlModalGenerator;
	private static MarkerGenerator JsMultiSelectGenerator;
	private static MarkerGenerator htmlMultiSelectGenerator;
	// private static MarkerGenerator JsModalMultiSelectGenerator;
	// private static MarkerGenerator htmlModalMultiSelectGenerator;

	private static MarkerGenerator javaModelGenerator;
	private static MarkerGenerator parserGenerator;
	private static MarkerGenerator javaMybatisModelTemplate;
	private static MarkerGenerator javaMybatisModelGenerator;
	// private static MarkerGenerator resourcesGenerator;
	private static MarkerGenerator controllerGenerator;
	private static MarkerGenerator testControllerGenerator;
	private static MarkerGenerator testErrorMockGenerator;
	private static MarkerGenerator testInitData;
	private static MarkerGenerator mybatisResourcesGenerator;
	private static MarkerGenerator daoGenerator;
	private static MarkerGenerator specificationHelperGenerator;
	private static MarkerGenerator repositoryGenerator;
	private static MarkerGenerator mapperMybatisGenerator;
	private static MarkerGenerator xmlMybatisGenerator;

	private static MarkerGenerator basicServiceImpGenerator;
	private static MarkerGenerator basicMybatisServiceGenerator;
	private static MarkerGenerator basicServiceGenerator;
	private static MarkerGenerator javaJsonGenerator;
	private static MarkerGenerator fragmentsGenerator;
	private static MarkerGenerator jsRouterSpecGenerator;
	// private static MarkerGenerator beansGenerator;
	private static MarkerGenerator testBeansGenerator;
	private static MarkerGenerator testSecurityGenerator;
	private static MarkerGenerator pomGenerator;
	private static MarkerGenerator produIndexGenerator;
	private static MarkerGenerator rbacSeedGenerator;
	private static MarkerGenerator produLoginGenerator;
	private static MarkerGenerator desenvLoginGenerator;
	private static MarkerGenerator buildPropertiesGenerator;
	private static MarkerGenerator buildXmlGenerator;
	private static MarkerGenerator htmlLeftPanelViewGenerator;

	// para a geracao do node
	private static MarkerGenerator jsNodeExpressDomainModelGenerator;
	private static MarkerGenerator jsNodeExpressDomainServiceGenerator;
	private static MarkerGenerator jsNodeExpressInfrastructureModelGenerator;
	private static MarkerGenerator jsNodeExpressInfrastructureRepositoryGenerator;
	private static MarkerGenerator jsNodeExpressPresentationControllerGenerator;

	// para o angular
	private Application application;

	private FreeMarkerConfig freeMarkerConfig;

	public EntitiesGenerator(FreeMarkerConfig freeMarkerConfig, Application application) {
		this.freeMarkerConfig = freeMarkerConfig;
		this.application = application;
	}

	public void generate(String... exceptions) throws Exception {

		// React
		String appReactRootSrcFolder = Util.currentDir() + File.separator + "out/" + application.getAppName()
				+ File.separator + "web/web/app/";
		String appReactComponentsFolder = appReactRootSrcFolder + "components/";

		String appReact16RootSrcFolder = Util.currentDir() + File.separator + "out/" + application.getAppName()
				+ File.separator + "web/base/src/";
		String appReact16PagesFolder = appReact16RootSrcFolder + "pages/";

		String appReact16ComponentsFolder = appReact16RootSrcFolder + "components/";

		String appRootFolder = Util.currentDir() + File.separator + "out/" + application.getAppName();

		String appAngularRootFolder = Util.currentDir() + File.separator + "out/" + application.getAppName()
				+ File.separator + "angular/src/app/layout/";
		String appVueRootSrcFolder = File.separator + "out/" + application.getAppName() + File.separator
				+ "web/web/src/";
		String appVueComponentsFolder = Util.currentDir() + appVueRootSrcFolder + "components/";

		// NodeExpress
		String baseAppNodeExpress = Util.currentDir() + File.separator + "out/" + application.getAppName()
				+ File.separator + "node" + File.separator + "src" + File.separator;

		String webAppRootFolder = appRootFolder + "/src/main/webapp/";
		String jsRootFolder = webAppRootFolder + "js/"; // js/spec/router

		String jsSpecRootFolder = webAppRootFolder + "js/" + "spec/router/";
		String javaRootFolder = appRootFolder + "/src/main/java/"
				+ application.getRootPackage().replace(".", File.separator);

		String javaTestRootFolder = appRootFolder + "/src/test/java/"
				+ application.getRootPackage().replace(".", File.separator);

		String javaTestResourcesRootFolder = appRootFolder + "/src/test/resources/";

		javaModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaModelTemplate.tpl",
				javaRootFolder + "/model/", TemplateFileName.MODEL_JAVA, FileType.JAVA);

		javaModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaModelTemplate.tpl",
				javaRootFolder + "/model/", TemplateFileName.MODEL_JAVA, FileType.JAVA);

		parserGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaParserTemplate.tpl",
				javaRootFolder + "/utils/", TemplateFileName.PARSER, FileType.JAVA);

		javaMybatisModelTemplate = new MarkerGenerator(freeMarkerConfig, application, "JavaMybatisModelTemplate.tpl",
				javaRootFolder + "/model/", TemplateFileName.MODEL_JAVA, FileType.JAVA);
		javaMybatisModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaModelTemplate.tpl",
				javaRootFolder + "/model/", TemplateFileName.MODEL_JAVA, FileType.JAVA);

		flterGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaFilterTemplate.tpl",
				javaRootFolder + "/model/filter/", TemplateFileName.FILTER_MODEL_JAVA, FileType.JAVA);

		javaJsonGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaJsonTemplate.tpl",
				javaRootFolder + "/json/", TemplateFileName.JSON_JAVA, FileType.JAVA);

		basicServiceGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaBasicServiceTemplate.tpl",
				javaRootFolder + "/service/", TemplateFileName.SERVICE_JAVA, FileType.JAVA);
		daoGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaDaoTemplate.tpl",
				javaRootFolder + "/persistence/", TemplateFileName.DAO_JAVA, FileType.JAVA);
		repositoryGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaRepositoryTemplate.tpl",
				javaRootFolder + "/persistence/", TemplateFileName.REPOSITORY_JAVA, FileType.JAVA);
		specificationHelperGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"JavaSpecificationHelperTemplate.tpl", javaRootFolder + "/persistence/",
				TemplateFileName.SPECIFICATION_HELPER_JAVA, FileType.JAVA);

		basicServiceImpGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaBasicServiceImpTemplate.tpl",
				javaRootFolder + "/service/", TemplateFileName.SERVICE_JAVA_IMP, FileType.JAVA);

		basicMybatisServiceGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"JavaMybatisBasicServiceTemplate.tpl", javaRootFolder + "/service/", TemplateFileName.SERVICE_JAVA,
				FileType.JAVA);

		xmlMybatisGenerator = new MarkerGenerator(freeMarkerConfig, application, "MybatisXmlTemplate.tpl",
				javaRootFolder + "/persistence/", TemplateFileName.MYBATIS_XML, FileType.XML);

		// resourcesGenerator = new MarkerGenerator(freeMarkerConfig,
		// application, "JavaResourcesTemplate.tpl", javaRootFolder + "/rs/",
		// TemplateFileName.RESOURCE_JAVA, FileType.JAVA);

		controllerGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaControllerTemplate.tpl",
				javaRootFolder + "/rs/", TemplateFileName.CONTROLLER_JAVA, FileType.JAVA);

		testControllerGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaTestControllerTemplate.tpl",
				javaTestRootFolder + "/integration/", TemplateFileName.TEST_CONTROLLER_JAVA, FileType.JAVA);

		testErrorMockGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaTestErrorMock.tpl",
				javaTestRootFolder + "/integration/", TemplateFileName.TEST_ERROR_MOCK, FileType.JAVA);

		testInitData = new MarkerGenerator(freeMarkerConfig, application, "init-data.tpl", javaTestResourcesRootFolder,
				TemplateFileName.TEST_INIT_DATA, FileType.SQL);

		mybatisResourcesGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"JavaMybatisResourcesTemplate.tpl", javaRootFolder + "/rs/", TemplateFileName.RESOURCE_JAVA,
				FileType.JAVA);

		jsModelGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsModelTemplate.tpl",
				jsRootFolder + "/models/", TemplateFileName.MODEL_JS, FileType.JAVASCRIPT);

		jsFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsFormTemplate.tpl",
				jsRootFolder + "/views/${entity.name}/", TemplateFileName.BASIC_FORM_JS, FileType.JAVASCRIPT);

		jsPageGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsPageTemplate.tpl",
				jsRootFolder + "/views/${entity.name}/", TemplateFileName.PAGE_JS, FileType.JAVASCRIPT);

		JsMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsMultiSelectTemplate.tpl",
				jsRootFolder + "/views/modalComponents/", TemplateFileName.MULTI_SELECT_JS, FileType.JAVASCRIPT);
		htmlMultiSelectGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlMultiSelectTemplate.tpl",
				jsRootFolder + "/views/modalComponents/tpl", TemplateFileName.MULTI_SELECT_HTML, FileType.HTML);

		htmlFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlFormTemplate.tpl",
				jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.FORM_TEMPLATE_HTML, FileType.HTML);
		htmlPageGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlPageTemplate.tpl",
				jsRootFolder + "/views/${entity.name}/tpl/", TemplateFileName.PAGE_TEMPLATE_HTML, FileType.HTML);

		jsModalGenerator = new MarkerGenerator(freeMarkerConfig, application, "JsModalTemplate.tpl",
				jsRootFolder + "/views/modalComponents/", TemplateFileName.MODAL_TEMPLATE_JS, FileType.JAVASCRIPT);
		htmlModalGenerator = new MarkerGenerator(freeMarkerConfig, application, "HtmlModalTemplate.tpl",
				jsRootFolder + "/views/modalComponents/tpl/", TemplateFileName.MODAL_TEMPLATE_HTML, FileType.HTML);

		mapperMybatisGenerator = new MarkerGenerator(freeMarkerConfig, application, "JavaMapperTemplate.tpl",
				javaRootFolder + "/persistence/", TemplateFileName.MYBATIS_MAPPER_JAVA, FileType.JAVA);

		fragmentsGenerator = new MarkerGenerator(freeMarkerConfig, application, "Fragments.tpl",
				jsRootFolder + "/fragments", TemplateFileName.FRAGMENT_TEMPLATE_HTML, FileType.FRAGMENT);

		jsRouterGenerator = new MarkerGenerator(freeMarkerConfig, application, "Router.tpl", jsRootFolder,
				TemplateFileName.ROUTER_JS, FileType.JAVASCRIPT);

		jsRouterSpecGenerator = new MarkerGenerator(freeMarkerConfig, application, "JSRouterSpecTemplate.js",
				jsSpecRootFolder, TemplateFileName.ROUTER_SPEC_JS, FileType.JAVASCRIPT);

		// beansGenerator = new MarkerGenerator(freeMarkerConfig, application,
		// "beans.tpl", webAppRootFolder + "WEB-INF/", TemplateFileName.BEANS_XML,
		// FileType.XML);

		testBeansGenerator = new MarkerGenerator(freeMarkerConfig, application, "test-beans.tpl",
				javaTestResourcesRootFolder, TemplateFileName.TEST_BEANS_XML, FileType.XML);

		testSecurityGenerator = new MarkerGenerator(freeMarkerConfig, application, "test-security.tpl",
				javaTestResourcesRootFolder, TemplateFileName.TEST_SECURITY_XML, FileType.XML);

		pomGenerator = new MarkerGenerator(freeMarkerConfig, application, "pom.tpl", appRootFolder + "/",
				TemplateFileName.POM_XML, FileType.XML);

		buildPropertiesGenerator = new MarkerGenerator(freeMarkerConfig, application, "buildProperties.tpl",
				appRootFolder + "/", TemplateFileName.BUILD_PROPERTIES, FileType.PROPERTIES);

		buildXmlGenerator = new MarkerGenerator(freeMarkerConfig, application, "buildXml.tpl", appRootFolder + "/",
				TemplateFileName.BUILD_XML, FileType.XML);

		desenvIndexGenerator = new MarkerGenerator(freeMarkerConfig, application, "desenv_index.tpl",
				webAppRootFolder + "WEB-INF/jsp/", TemplateFileName.INDEX_JSP, FileType.JSP);

		produIndexGenerator = new MarkerGenerator(freeMarkerConfig, application, "produ_index.tpl",
				appRootFolder + "/produ/WEB-INF/jsp/", TemplateFileName.INDEX_JSP, FileType.JSP);

		rbacSeedGenerator = new MarkerGenerator(freeMarkerConfig, application, "sqlRbacSeedTemplate.tpl",
				appRootFolder + "/src/main/resources/db/", TemplateFileName.RBAC_SEED, FileType.SQL);

		desenvLoginGenerator = new MarkerGenerator(freeMarkerConfig, application, "desenv_login.tpl", webAppRootFolder,
				TemplateFileName.LOGIN_HTML, FileType.HTML);

		produLoginGenerator = new MarkerGenerator(freeMarkerConfig, application, "produ_login.tpl",
				appRootFolder + "/produ/", TemplateFileName.LOGIN_HTML, FileType.HTML);

		// geração angular
		tsFormAngularGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"TsFormAngularComponentTemplate.tpl", appAngularRootFolder + "$kc{entity.name}/form-$kc{entity.name}/",
				TemplateFileName.FORM_TS, FileType.TYPESCRIPT);

		vueFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "VueFormTemplate.tpl",
				appVueComponentsFolder + "${entity.name}/", TemplateFileName.FORM, FileType.VUE);
		vuePageGenerator = new MarkerGenerator(freeMarkerConfig, application, "VuePageTemplate.tpl",
				appVueComponentsFolder + "${entity.name}/", TemplateFileName.PAGE, FileType.VUE);

		vueModalGenerator = new MarkerGenerator(freeMarkerConfig, application, "VueModalTemplate.tpl",
				appVueComponentsFolder + "${entity.name}/", TemplateFileName.MODAL, FileType.VUE);

		vueRouterGenerator = new MarkerGenerator(freeMarkerConfig, application, "VueRouterTemplate.tpl",
				appVueComponentsFolder + "router/", TemplateFileName.ROOT, FileType.JAVASCRIPT);
		vueSidebarGenerator = new MarkerGenerator(freeMarkerConfig, application, "VueSidebarTemplate.tpl",
				appVueComponentsFolder + "layout/", TemplateFileName.SIDEBAR, FileType.VUE);

		reactFormGenerator = new MarkerGenerator(freeMarkerConfig, application, "ReactFormTemplate.tpl",
				appReactComponentsFolder + "${entity.name}/", TemplateFileName.FORM, FileType.JAVASCRIPT);
		reactPageGenerator = new MarkerGenerator(freeMarkerConfig, application, "ReactPageTemplate.tpl",
				appReactComponentsFolder + "${entity.name}/", TemplateFileName.PAGE, FileType.JAVASCRIPT);
		reactModalGenerator = new MarkerGenerator(freeMarkerConfig, application, "ReactModalTemplate.tpl",
				appReactComponentsFolder + "${entity.name}/", TemplateFileName.MODAL, FileType.JAVASCRIPT);

		reactRouterGenerator = new MarkerGenerator(freeMarkerConfig, application, "ReactRouterTemplate.tpl",
				appReactRootSrcFolder + "router/", TemplateFileName.ROOT, FileType.JAVASCRIPT);
		reactSidebarGenerator = new MarkerGenerator(freeMarkerConfig, application, "ReactSidebarTemplate.tpl",
				appReactComponentsFolder + "layout/", TemplateFileName.SIDEBAR, FileType.JAVASCRIPT);

		react16PageListGenerator = new MarkerGenerator(freeMarkerConfig, application, "React16PageListTemplate.tpl",
				appReact16PagesFolder + "/${entity.name}/list/", TemplateFileName.PAGE, FileType.JAVASCRIPT);
		react16FormNewGenerator = new MarkerGenerator(freeMarkerConfig, application, "React16FormNewTemplate.tpl",
				appReact16PagesFolder + "${entity.name}/", TemplateFileName.FORM, FileType.JAVASCRIPT);
		react16FormEditGenerator = new MarkerGenerator(freeMarkerConfig, application, "React16FormEditTemplate.tpl",
				appReact16PagesFolder + "${entity.name}/edit/[id]/", TemplateFileName.FORM, FileType.JAVASCRIPT);

		react16PageListIndexGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"React16PageListIndexTemplate.tpl", appReact16PagesFolder + "/${entity.name}/list/",
				TemplateFileName.INDEX_JS, FileType.JAVASCRIPT);
		react16FormNewIndexGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"React16FormNewIndexTemplate.tpl", appReact16PagesFolder + "${entity.name}/new/", TemplateFileName.INDEX_JS,
				FileType.JAVASCRIPT);
		react16FormEditIndexGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"React16FormEditIndexTemplate.tpl", appReact16PagesFolder + "${entity.name}/edit/[id]/",
				TemplateFileName.INDEX_JS, FileType.JAVASCRIPT);

		// C:\Users\robso\repos\material-kit-react\src\components\layout\sidebar.js
		react16SidebarGenerator = new MarkerGenerator(freeMarkerConfig, application, "React16SidebarTemplate.tpl",
				appReact16ComponentsFolder + "layout/", TemplateFileName.SIDEBAR, FileType.JAVASCRIPT);

		// NodeExpress
		jsNodeExpressDomainModelGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"NodeExpressDomainModelTemplate.tpl", baseAppNodeExpress + "domain/${entity.name}/",
				TemplateFileName.NODE_EXPRESS_DOMAIN_MODEL, FileType.JAVASCRIPT);
		jsNodeExpressDomainServiceGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"NodeExpressDomainServiceTemplate.tpl", baseAppNodeExpress + "domain/${entity.name}/",
				TemplateFileName.NODE_EXPRESS_DOMAIN_SERVICE, FileType.JAVASCRIPT);
		jsNodeExpressInfrastructureModelGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"NodeExpressInfrastructureModelTemplate.tpl", baseAppNodeExpress + "infra/database/models/",
				TemplateFileName.NODE_EXPRESS_INFRA_MODEL, FileType.JAVASCRIPT);
		jsNodeExpressInfrastructureRepositoryGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"NodeExpressInfrastructureRepositoryTemplate.tpl", baseAppNodeExpress + "infra/repositories/",
				TemplateFileName.NODE_EXPRESS_INFRA_REPOSITORY, FileType.JAVASCRIPT);
		jsNodeExpressPresentationControllerGenerator = new MarkerGenerator(freeMarkerConfig, application,
				"NodeExpressPresentationControllerTemplate.tpl", baseAppNodeExpress + "presentation/http/controllers/",
				TemplateFileName.NODE_EXPRESS_PRESENTATION_CONTROLLER, FileType.JAVASCRIPT);

		try {
//GERACAO NODE
//			for (ApplicationEntity ent : application.getEntities()) {
//				jsNodeExpressDomainModelGenerator.generateEntityFile(application, ent);
//				jsNodeExpressDomainServiceGenerator.generateEntityFile(application, ent);
//				jsNodeExpressInfrastructureModelGenerator.generateEntityFile(application, ent);
//				jsNodeExpressInfrastructureRepositoryGenerator.generateEntityFile(application, ent);
//				jsNodeExpressPresentationControllerGenerator.generateEntityFile(application, ent);
//			}

			if (application.getView().equalsIgnoreCase("angular")) {
				for (ApplicationEntity ent : application.getEntities()) {
					tsFormAngularGenerator.generateEntityFile(application, ent);
				}
			} else if (application.getView().equalsIgnoreCase("vue")) {
				for (ApplicationEntity ent : application.getEntities()) {
					vueFormGenerator.generateEntityFile(application, ent);
					vuePageGenerator.generateEntityFile(application, ent);
					vueModalGenerator.generateEntityFile(application, ent);
				}
				vueRouterGenerator.generate(application);
				vueSidebarGenerator.generate(application);
			} else if (application.getView().equalsIgnoreCase("react")) {
				for (ApplicationEntity ent : application.getEntities()) {
					reactFormGenerator.generateEntityFile(application, ent);
					reactPageGenerator.generateEntityFile(application, ent);
					reactModalGenerator.generateEntityFile(application, ent);
				}
				reactRouterGenerator.generate(application);
				reactSidebarGenerator.generate(application);
			} else if (application.getView().equalsIgnoreCase("react16")) {
				for (ApplicationEntity ent : application.getEntities()) {
//					react16FormEditGenerator.generateEntityFile(application, ent);
					react16FormNewGenerator.generateEntityFile(application, ent);
					react16PageListGenerator.generateEntityFile(application, ent);

					react16FormEditIndexGenerator.generateEntityFile(application, ent);
					react16FormNewIndexGenerator.generateEntityFile(application, ent);
					react16PageListIndexGenerator.generateEntityFile(application, ent);
				}
				react16SidebarGenerator.generate(application);
			} else if (application.getView().equalsIgnoreCase("backbone")) {
				for (ApplicationEntity ent : application.getEntities()) {
					jsFormGenerator.generateEntityFile(application, ent);
					jsModelGenerator.generateEntityFile(application, ent);
					jsPageGenerator.generateEntityFile(application, ent);
					htmlFormGenerator.generateEntityFile(application, ent);
					htmlPageGenerator.generateEntityFile(application, ent);
					htmlModalGenerator.generateEntityFile(application, ent);
					JsMultiSelectGenerator.generateEntityFile(application, ent);
					htmlMultiSelectGenerator.generateEntityFile(application, ent);
					jsModalGenerator.generateEntityFile(application, ent);

				}

				jsRouterGenerator.generate(application);
				jsRouterSpecGenerator.generate(application);
				desenvIndexGenerator.generate(application);

			}

			for (ApplicationEntity ent : application.getEntities()) {
				if(true) return;
				if (notInException(ent.getName(), exceptions)) {
					LOGGER.info("-------------------------------Processando entidade " + ent.getName()
							+ "-------------------------------");
					javaJsonGenerator.generateEntityFile(application, ent);

					if (application.getPersistenceFramework().equals("hibernate")) {

						// TODO melhorar isso, mas por enquanto somente não
						// gerar o User.java já resolve. Certificar que o
						// user.java é o mesmo SEMPRE.
						if (!ent.getName().equalsIgnoreCase("User")) {
							System.out.println(" Gerando o model " + ent.getName());
							javaModelGenerator.generateEntityFile(application, ent);
							repositoryGenerator.generateEntityFile(application, ent);
						}
						specificationHelperGenerator.generateEntityFile(application, ent);
						basicServiceGenerator.generateEntityFile(application, ent);
						basicServiceImpGenerator.generateEntityFile(application, ent);
						// resourcesGenerator.generateEntityFile(application,
						// ent);
						controllerGenerator.generateEntityFile(application, ent);
						testControllerGenerator.generateEntityFile(application, ent);
						testErrorMockGenerator.generateEntityFile(application, ent);
						testInitData.generateEntityFile(application, ent);
					} else {
						javaMybatisModelGenerator.generateEntityFile(application, ent);
						basicMybatisServiceGenerator.generateEntityFile(application, ent);
						mapperMybatisGenerator.generateEntityFile(application, ent);
						xmlMybatisGenerator.generateEntityFile(application, ent);
						mybatisResourcesGenerator.generateEntityFile(application, ent);
						javaMybatisModelTemplate.generateEntityFile(application, ent);
					}

					flterGenerator.generateEntityFile(application, ent);
				}

			}
			fragmentsGenerator.generateAppFragmentFile(application.getEntities());
			rbacSeedGenerator.generateAppFragmentFile(application.getEntities());

//			testBeansGenerator.generate(application);
//			testSecurityGenerator.generate(application);
			pomGenerator.generate(application);
			buildPropertiesGenerator.generate(application);
			buildXmlGenerator.generate(application);
			produIndexGenerator.generate(application);
			produLoginGenerator.generate(application);
			desenvLoginGenerator.generate(application);
			parserGenerator.generate(application);
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

	}
}
