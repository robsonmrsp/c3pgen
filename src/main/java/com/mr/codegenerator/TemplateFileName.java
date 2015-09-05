package com.mr.codegenerator;

public interface TemplateFileName {

	final String MODEL_JAVA = "${entity.name}";
	final String FILTER_MODEL_JAVA = "Filter${entity.name}";
	final String JSON_JAVA = "Json${entity.name}";
	final String SERVICE_JAVA = "${entity.name}Service";
	final String SERVICE_JAVA_IMP = "${entity.name}ServiceImp";
	final String RESOURCE_JAVA = "${entity.name}Resources";

	final String MODEL_JS = "${entity.name}Model";
	final String BASIC_FORM_JS = "Form${entity.name}";
	final String PAGE_JS = "Page${entity.name}";

	final String MULTI_SELECT_JS = "MultiSelect${entity.name}";
	final String MULTI_SELECT_HTML = "MultiSelect${entity.name}Template";

	final String MODAL_MULTI_SELECT_JS = "ModalMultiSelect${entity.name}";
	final String MODAL_MULTI_SELECT_HTML = "ModalMultiSelect${entity.name}Template";

	final String PAGE_COLLECTION_JS = "${entity.name}PageCollection";
	final String COLLECTION_JS = "${entity.name}Collection";
	final String FORM_TEMPLATE_HTML = "Form${entity.name}Template";

	final String PAGE_TEMPLATE_HTML = "Page${entity.name}Template";
	final String FRAGMENT_TEMPLATE_HTML = "${entity.name}Template";

	final String MODAL_TEMPLATE_HTML = "${entity.name}ModalTemplate";
	final String MODAL_TEMPLATE_JS = "${entity.name}Modal";
	final String BEANS_XML = "beans";
	final String ROUTER_SPEC_JS = "RouterSpec";
	final String ROUTER_JS = "Router";
	final String MOBILE_ROUTER_JS = "MobileRouter";
	final String POM_XML = "pom";

	final String BUILD_PROPERTIES = "build";
	final String BUILD_XML = "build";

	final String INDEX_JSP = "index";
	final String INDEX_HTML = "index";
	final String LEFT_PANEL = "LeftPanelViewTemplate";
	final String DATA_BASE_HELPER = "DataBaseHelper";
	final String LOGIN_HTML = "login";

	final String TEMPLATE = "${entity.name}Template";

	// persistencia
	final String DAO_JAVA = "Dao${entity.name}";

	final String ACCESSIBLE_HIBERNATE_DAO = "AccessibleHibernateDao";
	final String COLUMN_DEFINITIONS = "ColumnDefinitions";
	final String DAO_USER = "DaoUser";
	final String HIBERNATE_DAO = "HibernateDao";

	final String PAGER = "Pager";
	final String PAGINATION = "Pagination";
	final String PAGINATION_PARAMS = "PaginationParams";
	final String PAGINATOR = "Paginator";

}
