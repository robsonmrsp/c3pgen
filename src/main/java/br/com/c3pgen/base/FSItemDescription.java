package br.com.c3pgen.base;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FSItemDescription {

	private final String template;
	private final String rootFolder;
	private final String fileName;
	private final FileType fileType;

	public String getTemplate() {
		return template;
	}

	public String getRootFolder() {
		return rootFolder;
	}

	public String getFileName() {
		return fileName;
	}

	public FileType getFileType() {
		return fileType;
	}

	public FSItemDescription(String template, String rootFolder, String fileName, FileType fileType) {
		this.template = template;
		this.rootFolder = rootFolder;
		this.fileName = fileName;
		this.fileType = fileType;
	}

	public static List<FSItemDescription> persistences2(String folder) {

		List<FSItemDescription> persistences = new ArrayList<FSItemDescription>();

		persistences.add(new FSItemDescription("UserRepository", folder + "persistence" + File.separator, "UserRepository", FileType.JAVA));
		return persistences;
	}

	public static List<FSItemDescription> persistences(String rootFolder) {

		List<FSItemDescription> persistences = new ArrayList<FSItemDescription>();

		// persistences.add(new FSItemDescription("DaoUser", rootFolder + "persistence"
		// + File.separator, "DaoUser", FileType.JAVA));

		persistences.add(new FSItemDescription("DataCreateUpdateListener", rootFolder + "persistence" + File.separator, "DataCreateUpdateListener", FileType.JAVA));
//		persistences.add(new FSItemDescription("HibernateDao", rootFolder + "persistence" + File.separator, "HibernateDao", FileType.JAVA));
		persistences.add(new FSItemDescription("CatchThrowConstraintViolationException", rootFolder + "persistence" + File.separator, "CatchThrowConstraintViolationException", FileType.JAVA));


		persistences.add(new FSItemDescription("Pagination", rootFolder + "persistence" + File.separator + "pagination" + File.separator, "Pagination", FileType.JAVA));
		persistences.add(new FSItemDescription("SearchParameters", rootFolder + "persistence" + File.separator + "pagination" + File.separator, "SearchParameters", FileType.JAVA));
		// persistences.add(new FSItemDescription("Paginator", rootFolder +
		// "persistence" + File.separator + "pagination" + File.separator, "Paginator",
		// FileType.JAVA));
		persistences.add(new FSItemDescription("Pager", rootFolder + "persistence" + File.separator + "pagination" + File.separator, "Pager", FileType.JAVA));
//		persistences.add(new FSItemDescription("HibernateEventWiring", rootFolder + "persistence" + File.separator, "HibernateEventWiring", FileType.JAVA));
		// persistences.add(new FSItemDescription("DaoSyncInfo", rootFolder +
		// "persistence" + File.separator, "DaoSyncInfo", FileType.JAVA));

		return persistences;
	}

	public static List<FSItemDescription> json(String rootFolder) {
		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("JsonError", rootFolder + File.separator + "json" + File.separator, "JsonError", FileType.JAVA));
		list.add(new FSItemDescription("JsonOk", rootFolder + File.separator + "json" + File.separator, "JsonOk", FileType.JAVA));
		list.add(new FSItemDescription("JsonPaginator", rootFolder + File.separator + "json" + File.separator, "JsonPaginator", FileType.JAVA));
		list.add(new FSItemDescription("JsonResponse", rootFolder + File.separator + "json" + File.separator, "JsonResponse", FileType.JAVA));
		// list.add(new FSItemDescription("JsonUser", rootFolder + File.separator +
		// "json" + File.separator, "JsonUser", FileType.JAVA));
		// list.add(new FSItemDescription("JsonWebSocket", rootFolder + File.separator +
		// "json" + File.separator, "JsonWebSocket", FileType.JAVA));
		// list.add(new FSItemDescription("DtoDataBase", rootFolder + File.separator +
		// "json" + File.separator, "DtoDataBase", FileType.JAVA));
		// list.add(new FSItemDescription("Conflict", rootFolder + File.separator +
		// "json" + File.separator, "Conflict", FileType.JAVA));
		// list.add(new FSItemDescription("SyncOperation", rootFolder + File.separator +
		// "json" + File.separator, "SyncOperation", FileType.JAVA));

		return list;
	}

	public static List<FSItemDescription> audit(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("CustomEnversListener", rootFolder + File.separator + "audit" + File.separator, "CustomEnversListener", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> cep(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("Address", rootFolder + File.separator + "model" + File.separator + "cep" + File.separator, "Address", FileType.JAVA));
		list.add(new FSItemDescription("City", rootFolder + File.separator + "model" + File.separator + "cep" + File.separator, "City", FileType.JAVA));
		list.add(new FSItemDescription("Country", rootFolder + File.separator + "model" + File.separator + "cep" + File.separator, "Country", FileType.JAVA));
		list.add(new FSItemDescription("District", rootFolder + File.separator + "model" + File.separator + "cep" + File.separator, "District", FileType.JAVA));
		list.add(new FSItemDescription("State", rootFolder + File.separator + "model" + File.separator + "cep" + File.separator, "State", FileType.JAVA));
		list.add(new FSItemDescription("Zip", rootFolder + File.separator + "model" + File.separator + "cep" + File.separator, "Zip", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> rbac(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
//		list.add(new FSItemDescription("ObjectType", rootFolder + File.separator +
//				"model" + File.separator + "rbac" + File.separator, "ObjectType",
//				FileType.JAVA));
//		list.add(new FSItemDescription("Operation", rootFolder + File.separator +
//				"model" + File.separator + "rbac" + File.separator, "Operation",
//				FileType.JAVA));
//		list.add(new FSItemDescription("Permission", rootFolder + File.separator +
//				"model" + File.separator + "rbac" + File.separator, "Permission",
//				FileType.JAVA));
//		list.add(new FSItemDescription("Role", rootFolder + File.separator + "model"
//				+ File.separator + "rbac" + File.separator, "Role", FileType.JAVA));
		list.add(new FSItemDescription("User", rootFolder + File.separator + "model" + File.separator, "User", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> model(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("Tenant", rootFolder + File.separator + "model" + File.separator, "Tenant", FileType.JAVA));
		list.add(new FSItemDescription("ColumnDefinitions", rootFolder + File.separator + "model" + File.separator, "ColumnDefinitions", FileType.JAVA));
		list.add(new FSItemDescription("CustomRevisionEntity", rootFolder + File.separator + "model" + File.separator, "CustomRevisionEntity", FileType.JAVA));
		list.add(new FSItemDescription("AbstractEntity", rootFolder + File.separator + "model" + File.separator, "AbstractEntity", FileType.JAVA));
		list.add(new FSItemDescription("AbstractMultitenantEntity", rootFolder + File.separator + "model" + File.separator, "AbstractMultitenantEntity", FileType.JAVA));
		// list.add(new FSItemDescription("SyncInfo", rootFolder + File.separator +
		// "model" + File.separator, "SyncInfo", FileType.JAVA));
		// list.add(new FSItemDescription("User", rootFolder + File.separator +
		// "model" + File.separator, "User", FileType.JAVA));

		return list;
	}

	public static List<FSItemDescription> report(String rootFolder) {
		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("CSVColumn", rootFolder + File.separator + "reports" + File.separator, "CSVColumn", FileType.JAVA));
		list.add(new FSItemDescription("CSVLayout", rootFolder + File.separator + "reports" + File.separator, "CSVLayout", FileType.JAVA));
		list.add(new FSItemDescription("CSVMaker", rootFolder + File.separator + "reports" + File.separator, "CSVMaker", FileType.JAVA));
		list.add(new FSItemDescription("JasperMaker", rootFolder + File.separator + "reports" + File.separator, "JasperMaker", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> rsException(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("SimpleErrorMessageHandlerExceptionResolver", rootFolder + File.separator + "rs" + File.separator + "exception" + File.separator, "SimpleErrorMessageHandlerExceptionResolver", FileType.JAVA));
		list.add(new FSItemDescription("ValidationException", rootFolder + File.separator + "rs" + File.separator + "exception" + File.separator, "ValidationException", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> rs(String rootFolder) {
		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("DataUpload", rootFolder + File.separator + "rs" + File.separator, "DataUpload", FileType.JAVA));
		list.add(new FSItemDescription("UploadController", rootFolder + File.separator + "rs" + File.separator, "UploadController", FileType.JAVA));
		list.add(new FSItemDescription("IndexController", rootFolder + File.separator + "rs" + File.separator, "IndexController", FileType.JAVA));

		return list;
	}

	public static List<FSItemDescription> security(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("SpringSecurityUserContext", rootFolder + File.separator + "security" + File.separator, "SpringSecurityUserContext", FileType.JAVA));
		list.add(new FSItemDescription("UserAuthorityUtils", rootFolder + File.separator + "security" + File.separator, "UserAuthorityUtils", FileType.JAVA));
		// list.add(new FSItemDescription("AuthorizationInterceptor", rootFolder +
		// File.separator + "security" + File.separator, "AuthorizationInterceptor",
		// FileType.JAVA));
		list.add(new FSItemDescription("AuthorizationService", rootFolder + File.separator + "security" + File.separator, "AuthorizationService", FileType.JAVA));
		list.add(new FSItemDescription("AuthorizationServiceImp", rootFolder + File.separator + "security" + File.separator, "AuthorizationServiceImp", FileType.JAVA));
		// list.add(new FSItemDescription("AuthorizationResources", rootFolder +
		// File.separator + "security" + File.separator, "AuthorizationResources",
		// FileType.JAVA));
		list.add(new FSItemDescription("UserContext", rootFolder + File.separator + "security" + File.separator, "UserContext", FileType.JAVA));
		list.add(new FSItemDescription("UserDetailsServiceImp", rootFolder + File.separator + "security" + File.separator, "UserDetailsServiceImp", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> serialization(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		// list.add(new FSItemDescription("CustomDateSerializer", rootFolder +
		// File.separator + "serialization" + File.separator, "CustomDateSerializer",
		// FileType.JAVA));
		list.add(new FSItemDescription("CustomLocalDateDeserializer", rootFolder + File.separator + "serialization" + File.separator, "CustomLocalDateDeserializer", FileType.JAVA));
		list.add(new FSItemDescription("CustomLocalDateSerializer", rootFolder + File.separator + "serialization" + File.separator, "CustomLocalDateSerializer", FileType.JAVA));

		list.add(new FSItemDescription("CustomLocalDateTimeDeserializer", rootFolder + File.separator + "serialization" + File.separator, "CustomLocalDateTimeDeserializer", FileType.JAVA));
		list.add(new FSItemDescription("CustomLocalDateTimeSerializer", rootFolder + File.separator + "serialization" + File.separator, "CustomLocalDateTimeSerializer", FileType.JAVA));

		list.add(new FSItemDescription("CustomDoubleSerializer", rootFolder + File.separator + "serialization" + File.separator, "CustomDoubleSerializer", FileType.JAVA));
		list.add(new FSItemDescription("CustomDoubleDeserializer", rootFolder + File.separator + "serialization" + File.separator, "CustomDoubleDeserializer", FileType.JAVA));

		// list.add(new FSItemDescription("CustomSyncObjectIdDeserializer", rootFolder +
		// File.separator + "serialization" + File.separator,
		// "CustomSyncObjectIdDeserializer", FileType.JAVA));
		// list.add(new FSItemDescription("CustomJacksonObjectMapperProvider",
		// rootFolder + File.separator + "serialization" + File.separator,
		// "CustomJacksonObjectMapperProvider", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> service(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		// list.add(new FSItemDescription("UserService", rootFolder + File.separator +
		// "service" + File.separator, "UserService", FileType.JAVA));
		// list.add(new FSItemDescription("UserServiceImp", rootFolder + File.separator
		// + "service" + File.separator, "UserServiceImp", FileType.JAVA));
		// list.add(new FSItemDescription("SyncService", rootFolder + File.separator +
		// "service" + File.separator, "SyncService", FileType.JAVA));
		// list.add(new FSItemDescription("SyncServiceImp", rootFolder + File.separator
		// + "service" + File.separator, "SyncServiceImp", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> test(String rootTesteFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("ApplicationTest", rootTesteFolder, "ApplicationTest", FileType.JAVA));
		list.add(new FSItemDescription("FixtureUtils", rootTesteFolder + "/fixture/", "FixtureUtils", FileType.JAVA));
		list.add(new FSItemDescription("MockMvcTestUtil", rootTesteFolder + "/util/", "MockMvcTestUtil", FileType.JAVA));
		list.add(new FSItemDescription("MockSecurityContext", rootTesteFolder + "/util/", "MockSecurityContext", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> testResources(String rootResourcesFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();

		list.add(new FSItemDescription("application", rootResourcesFolder, "application", FileType.PROPERTIES));

		return list;
	}

	public static List<FSItemDescription> utils(String rootFolder) {

		List<FSItemDescription> list = new ArrayList<FSItemDescription>();
		list.add(new FSItemDescription("ApplicationConfig", rootFolder + File.separator + "utils" + File.separator, "ApplicationConfig", FileType.JAVA));
		list.add(new FSItemDescription("DataSeed", rootFolder + File.separator + "utils" + File.separator, "DataSeed", FileType.JAVA));
		list.add(new FSItemDescription("DateUtil", rootFolder + File.separator + "utils" + File.separator, "DateUtil", FileType.JAVA));
		list.add(new FSItemDescription("ImageUtils", rootFolder + File.separator + "utils" + File.separator, "ImageUtils", FileType.JAVA));
		list.add(new FSItemDescription("MD5ChecksumUtil", rootFolder + File.separator + "utils" + File.separator, "MD5ChecksumUtil", FileType.JAVA));
		// list.add(new FSItemDescription("JavaParserTemplate.tpl", rootFolder +
		// File.separator + "utils" + File.separator, "Parser", FileType.JAVA));
		list.add(new FSItemDescription("Util", rootFolder + File.separator + "utils" + File.separator, "Util", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> resources(String resourceFolder) {
		List<FSItemDescription> list = new ArrayList<FSItemDescription>();

		list.add(new FSItemDescription("application", resourceFolder, "application", FileType.PROPERTIES));
		list.add(new FSItemDescription("log4j", resourceFolder, "log4j", FileType.XML));
		list.add(new FSItemDescription("seed", resourceFolder + "db/", "seed", FileType.SQL));
		return list;
	}

	public static List<FSItemDescription> config(String javaRootFolder) {
		List<FSItemDescription> list = new ArrayList<FSItemDescription>();

		list.add(new FSItemDescription("SpringMVCConfig", javaRootFolder + File.separator + "config" + File.separator, "SpringMVCConfig", FileType.JAVA));
		list.add(new FSItemDescription("SpringSecurityConfig", javaRootFolder + File.separator + "config" + File.separator, "SpringSecurityConfig", FileType.JAVA));
		list.add(new FSItemDescription("JPAConfig", javaRootFolder + File.separator + "config" + File.separator, "JPAConfig", FileType.JAVA));
		list.add(new FSItemDescription("Application", javaRootFolder + File.separator + "config" + File.separator, "Application", FileType.JAVA));
		list.add(new FSItemDescription("WebSecurityServletConfiguration", javaRootFolder + File.separator + "config" + File.separator, "WebSecurityServletConfiguration", FileType.JAVA));
		return list;
	}

	public static List<FSItemDescription> configXml(String webInfFolder) {
		List<FSItemDescription> list = new ArrayList<FSItemDescription>();

		list.add(new FSItemDescription("spring-security", webInfFolder, "spring-security", FileType.XML));
		list.add(new FSItemDescription("web", webInfFolder, "web", FileType.XML));
		list.add(new FSItemDescription("beans", webInfFolder, "beans", FileType.XML));

		return list;
	}
}
