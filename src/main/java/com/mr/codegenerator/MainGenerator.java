//package com.mr.codegenerator;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.apache.log4j.Logger;
//
//import com.mr.codegenerator.entities.Entity;
//import com.mr.codegenerator.util.Util;
//
//import freemarker.template.TemplateException;
//
//public class MainGenerator {
//
//	public static final Logger LOGGER = Logger.getLogger(MainGenerator.class);
//
//	// Web
//	// gera Model
//	// gera Collection
//	// gera View
//	// gera Page
//	// atualiza Router
//
//	// gera model
//	// gera servico(interface e impl)
//	// gera Dao
//	// gera Resource
//	static MarkerGenerator javaModelGenerator;
//	private static MarkerGenerator jsColelctionGenerator;
//	private static MarkerGenerator jsPageColelctionGenerator;
//	private static MarkerGenerator jsPageGenerator;
//	private static MarkerGenerator jsBasicFormGenerator;
//	private static MarkerGenerator resourcesGenerator;
//	private static MarkerGenerator daoGenerator;
//	private static MarkerGenerator basicServiceImpGenerator;
//	private static MarkerGenerator basicServiceGenerator;
//	private static MarkerGenerator jsModelGenerator;
//	private static MarkerGenerator htmlFormGenerator;
//	private static MarkerGenerator htmlPageGenerator;
//	private static MarkerGenerator javaJsonGenerator;
//	private static MarkerGenerator fragmentsGenerator;
//
//	// geradores para o modal
//	private static MarkerGenerator htmlModalGenerator;
//	private static MarkerGenerator jsModalGenerator;
//	private static MarkerGenerator flterGenerator;
//
//	public static void main(String[] args) throws IOException {
//
//		List<Entity> entities = new ArrayList<Entity>();
//		// Ao invez dessa lista de entidades agora será criado um objeto com
//		// informações da aplicação como um todo, nome do banco, nome da
//		// aplicação, versão, ou seja, aquilo que lhe é partcular!
//		entities.addAll(Util.getEntity());
//
//		javaModelGenerator = new MarkerGenerator("JavaModelTemplate.tpl", ApplicationConfiguration.MODEL_FOLDER, TemplateFileName.MODEL_JAVA, FileType.JAVA);
//		javaJsonGenerator = new MarkerGenerator("JavaJsonTemplate.tpl", ApplicationConfiguration.JSON_FOLDER, TemplateFileName.JSON_JAVA, FileType.JAVA);
//		basicServiceGenerator = new MarkerGenerator("JavaBasicServiceTemplate.tpl", ApplicationConfiguration.SERVICE_FOLDER, TemplateFileName.SERVICE_JAVA, FileType.JAVA);
//		basicServiceImpGenerator = new MarkerGenerator("JavaBasicServiceImpTemplate.tpl", ApplicationConfiguration.SERVICE_FOLDER, TemplateFileName.SERVICE_JAVA_IMP, FileType.JAVA);
//
//		daoGenerator = new MarkerGenerator("JavaDaoTemplate.tpl", ApplicationConfiguration.PERSISTENCE_FOLDER, TemplateFileName.DAO_JAVA, FileType.JAVA);
//		resourcesGenerator = new MarkerGenerator("JavaResourcesTemplate.tpl", ApplicationConfiguration.RS_FOLDER, TemplateFileName.RESOURCE_JAVA, FileType.JAVA);
//
//		jsColelctionGenerator = new MarkerGenerator("JsCollectionTemplate.tpl", ApplicationConfiguration.JS_COLLECTIONS_FOLDER, TemplateFileName.COLLECTION_JS, FileType.JAVASCRIPT);
//		jsPageColelctionGenerator = new MarkerGenerator("JsPageCollectionTemplate.tpl", ApplicationConfiguration.JS_COLLECTIONS_FOLDER, TemplateFileName.PAGE_COLLECTION_JS, FileType.JAVASCRIPT);
//		jsModelGenerator = new MarkerGenerator("JsModelTemplate.tpl", ApplicationConfiguration.JS_MODEL_FOLDER, TemplateFileName.MODEL_JS, FileType.JAVASCRIPT);
//
//		jsBasicFormGenerator = new MarkerGenerator("JsBasicFormTemplate.tpl", ApplicationConfiguration.JS_VIEWS_FOLDER, TemplateFileName.BASIC_FORM_JS, FileType.JAVASCRIPT);
//		jsPageGenerator = new MarkerGenerator("JsPageTemplate.tpl", ApplicationConfiguration.JS_VIEWS_FOLDER, TemplateFileName.PAGE_JS, FileType.JAVASCRIPT);
//
//		htmlFormGenerator = new MarkerGenerator("HtmlFormTemplate.tpl", ApplicationConfiguration.JS_VIEWS_TPL_FOLDER, TemplateFileName.FORM_TEMPLATE_HTML, FileType.HTML);
//
//		htmlPageGenerator = new MarkerGenerator("HtmlPageTemplate.tpl", ApplicationConfiguration.JS_VIEWS_TPL_FOLDER, TemplateFileName.PAGE_TEMPLATE_HTML, FileType.HTML);
//		fragmentsGenerator = new MarkerGenerator("Fragments.tpl", ApplicationConfiguration.FRAGMENTS, TemplateFileName.FRAGMENT_TEMPLATE_HTML, FileType.FRAGMENT);
//
//		jsModalGenerator = new MarkerGenerator("JsModalTemplate.tpl", ApplicationConfiguration.JS_VIEWS_MODAL_FOLDER, TemplateFileName.MODAL_TEMPLATE_JS, FileType.JAVASCRIPT);
//		htmlModalGenerator = new MarkerGenerator("HtmlModalTemplate.tpl", ApplicationConfiguration.JS_VIEWS_MODAL_TPL_FOLDER, TemplateFileName.MODAL_TEMPLATE_HTML, FileType.HTML);
//
//		flterGenerator = new MarkerGenerator("JavaFilterTemplate.tpl", ApplicationConfiguration.FILTER_MODEL_FOLDER, TemplateFileName.FILTER_MODEL_JAVA, FileType.JAVA);
//
//		try {
//			for (Entity ent : entities) {
//				LOGGER.info("-------------------------------Processando entidade " + ent.getName() + "-------------------------------");
////				javaModelGenerator.generateEntityFile(application, entity);
////				javaJsonGenerator.generateEntityFile(ent);
////				basicServiceGenerator.generateEntityFile(ent);
////				basicServiceImpGenerator.generateEntityFile(ent);
////				daoGenerator.generateEntityFile(ent);
////				jsBasicFormGenerator.generateEntityFile(ent);
////				resourcesGenerator.generateEntityFile(ent);
////				jsColelctionGenerator.generateEntityFile(ent);
////				jsModelGenerator.generateEntityFile(ent);
////				jsPageGenerator.generateEntityFile(ent);
////				jsPageColelctionGenerator.generateEntityFile(ent);
////				htmlFormGenerator.generateEntityFile(ent);
////				htmlPageGenerator.generateEntityFile(ent);
////				jsModalGenerator.generateEntityFile(ent);
////				htmlModalGenerator.generateEntityFile(ent);
////				flterGenerator.generateEntityFile(ent);
//			}
//			fragmentsGenerator.generateAppFragmentFile(entities);
//		} catch (TemplateException e) {
//			LOGGER.error(e);
//		}
//
//	}
//}
