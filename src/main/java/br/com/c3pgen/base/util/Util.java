package br.com.c3pgen.base.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.commons.io.FileUtils;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.esotericsoftware.yamlbeans.YamlReader;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.c3pgen.json.KeyValue;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.ItemModulo;
import br.com.c3pgen.model.Modulo;
import br.com.c3pgen.model.Relationship;
import schemacrawler.schema.ColumnDataType;

public class Util {
	private static SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy");
	private static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");
	public static final String JSETUP_VERSION = "v0.94";

	public static String templateFolder() {
		// return "G:\\cyg\\home\\robso\\repos\\c3pgen\\src\\main\\webapp";
		return "C:\\cyg\\home\\robson\\repos\\c3pgen\\src\\main\\webapp";
	}

	public static String currentDir() {
		return currentDir;
//		 return templateFolder();
	}

	private static String currentDir = Paths.get(".").toAbsolutePath().toString();

	public static void setCurrentDir(String a) {
		currentDir = a;
	}

	public static String camelCase(String verb) {
		String[] str = verb.split(" ");
		String ret = "";
		for (int i = 0; i < str.length; i++) {
			if (str[i].trim().length() > 0)
				ret += firstUpperCase(str[i].trim());
		}

		return ret;
	}

	public static Map<String, Object> getSimpleObject(KeyValue... keyValue) {
		Map<String, Object> map = new HashMap<String, Object>();

		for (KeyValue kv : keyValue) {
			map.put(kv.getKey(), kv.getValue());
		}

		return map;
	}

	public static String removeNonUnicodeCharAndSpaces(String input) {
		String localStr = input;
		localStr = Normalizer.normalize(localStr, Normalizer.Form.NFD);
		localStr = localStr.replaceAll("\\p{Space}", "").replaceAll("[^\\p{ASCII}]", "").replaceAll("\\.", "").replaceAll("-", "").replaceAll(":", "");
		return localStr;
	}

	public static String toUpperSnakeCase(String camelCaseString) {
		String returnString = camelCaseString;

		for (int index = 0; index < camelCaseString.length(); index++) {
			char charAt = camelCaseString.charAt(index);
			if (Character.isUpperCase(charAt)) {
				String charStr = "" + camelCaseString.charAt(index);
				returnString = returnString.replace(charStr, "_" + charStr.toLowerCase());
			}
		}
		if (returnString.startsWith("_")) {
			returnString = returnString.substring(1);
		}
		return Util.removeNonUnicodeCharAndSpaces(returnString.toUpperCase().replaceAll(" ", "_"));
	}

	public static String firstNotNullLower(String... inputs) {

		for (String string : inputs) {
			if (string != null && !string.isEmpty()) {
				return firstLowerCase(string);
			}
		}
		return "";
	}

	public static String firstNotNullUpper(String... inputs) {

		for (String string : inputs) {
			if (string != null && !string.isEmpty()) {
				return firstUpperCase(string);
			}
		}
		return "";
	}

	public static String firstNotNull(String... inputs) {

		for (String string : inputs) {
			if (string != null && !string.isEmpty()) {
				return string;
			}
		}
		return "";
	}

	public static String firstUpperCase(String verb) {
		String firstChar = "";
		try {
			firstChar = verb.substring(0, 1).toUpperCase() + verb.substring(1);
		} catch (Exception e) {
			// e.printStackTrace();
		}
		return firstChar;
	}

	public static String firstUpperCaseOnly(String verb) {
		String firstChar = "";
		try {
			firstChar = verb.substring(0, 1).toUpperCase() + verb.substring(1).toLowerCase();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return firstChar;
	}

	public static String getFullFileName(String pack, String subfolder, String fileName) {
		return currentDir() + File.separator + "out" + File.separator + pack.replace(".", File.separator) + File.separator + subfolder + File.separator + fileName;
	}

	private static File createPaths(String appName, File generateFiles) {
		File folderIn = generateFiles;
		File fileConfig = new File(generateFiles.getAbsolutePath() + File.separator + "config.yaml");

		File destFile = new File(currentDir() + File.separator + "conf" + File.separator + appName + ".yaml");

		try {
			FileWriter destFileWriter = new FileWriter(destFile, true);

			if (fileConfig.exists()) {
				FileUtils.copyFile(fileConfig, destFile);
				destFileWriter.write("\n");
				destFileWriter.write("entities:");
				destFileWriter.close();
			}

			if (folderIn.isDirectory()) {
				for (File f : folderIn.listFiles()) {
					if (!f.getName().equals("config.yaml") && f.getName().endsWith("yaml")) {
						copyFile(destFile, f);
					}
				}
				try {
					// copyFile(destFile, new File(currentDir() +
					// "/src/main/resources/core.yaml"));
				} catch (Exception e) {
					System.out.println("Não gerado CORE do sistema");
				}
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return destFile;
	}

	private static void copyFile(File destFile, File appendFile) throws IOException {
		FileWriter destFileWriter = null;
		BufferedReader reader = null;
		try {

			destFileWriter = new FileWriter(destFile, true);
			reader = new BufferedReader(new FileReader(appendFile));
			String line = reader.readLine();
			while (line != null) {
				destFileWriter.write("\n");
				destFileWriter.write(line);
				line = reader.readLine();
			}
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			try {
				destFileWriter.close();
				reader.close();
				destFileWriter = null;
				reader = null;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	public static String geraCpfFormatadoRamdomico() {
		Random random = new Random();

		int n1 = random.nextInt(9);
		int n2 = random.nextInt(9);
		int n3 = random.nextInt(9);
		int n4 = random.nextInt(9);
		int n5 = random.nextInt(9);
		int n6 = random.nextInt(9);
		int n7 = random.nextInt(9);
		int n8 = random.nextInt(9);
		int n9 = random.nextInt(9);

		int d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;

		d1 = 11 - (d1 % 11);
		if (d1 >= 10)
			d1 = 0;
		int d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
		d2 = 11 - (d2 % 11);
		if (d2 >= 10)
			d2 = 0;

		return "" + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
	}

	public static String geraCpfNumericoRandomico() {
		Random random = new Random();

		int n1 = random.nextInt(9);
		int n2 = random.nextInt(9);
		int n3 = random.nextInt(9);
		int n4 = random.nextInt(9);
		int n5 = random.nextInt(9);
		int n6 = random.nextInt(9);
		int n7 = random.nextInt(9);
		int n8 = random.nextInt(9);
		int n9 = random.nextInt(9);

		int d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;

		d1 = 11 - (d1 % 11);
		if (d1 >= 10)
			d1 = 0;
		int d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
		d2 = 11 - (d2 % 11);
		if (d2 >= 10)
			d2 = 0;

		return "" + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
	}

	public static LocalDate geraDataRandomica() {

		long offset = Timestamp.valueOf("1900-01-01 00:00:00").getTime();
		long end = Timestamp.valueOf("2000-01-01 00:00:00").getTime();
		long diff = end - offset + 1;

		long now = new Date().getTime();
		Timestamp rand = new Timestamp(offset + (long) (Math.random() * diff));

		return LocalDate.fromDateFields(rand);

	}

	public static String firstLowerCase(String verb) {

		try {
			String string = verb.substring(0, 1).toLowerCase() + verb.substring(1);
			return string;
		} catch (Exception e) {

		}

		return "";
	}

	public static ApplicationEntity getTheEntity_() {
		ObjectMapper mapper = new ObjectMapper();
		ApplicationEntity user = null;
		try {
			user = mapper.readValue(new File(currentDir() + File.separator + "conf" + File.separator + "entities.js"), ApplicationEntity.class);
			System.out.println("Main.main()" + user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	public static Application getApplicationFrom(Modulo modulo) {

		Application application = modulo.getApplication();

		String configFile = createFile(modulo);
		YamlReader reader;
		try {
			reader = new YamlReader(configFile);

			reader.getConfig().setPropertyElementType(Application.class, "entities", ApplicationEntity.class);
			reader.getConfig().setPropertyElementType(ApplicationEntity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(ApplicationEntity.class, "relationships", Relationship.class);

			application = reader.read(Application.class);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return application;
	}

	// public static Application getApplicationFromFolder(String folderName) {
	//
	// File configFile = createFile(folderName);
	//
	// YamlReader reader;
	// Application entities = null;
	// try {
	// reader = new YamlReader(new FileReader(configFile));
	//
	// reader.getConfig().setPropertyElementType(Application.class, "entities",
	// ApplicationEntity.class);
	// reader.getConfig().setPropertyElementType(ApplicationEntity.class,
	// "attributes", Attribute.class);
	// reader.getConfig().setPropertyElementType(ApplicationEntity.class,
	// "relationships", Relationship.class);
	//
	// entities = reader.read(Application.class);
	//
	// } catch (Exception e) {
	// e.printStackTrace();
	// }
	// return entities;
	// }

	private static String createFile(Modulo modulo) {
		StringBuilder destFileWriter = new StringBuilder();
		try {

			destFileWriter.append("appName: " + modulo.getApplication().getAppName());
			destFileWriter.append("\n");
			destFileWriter.append("skin: " + modulo.getApplication().getSkin());
			destFileWriter.append("\n");
			destFileWriter.append("view: " + modulo.getApplication().getView());
			destFileWriter.append("\n");
			// destFileWriter.append("rootPackage: br.com.gsh.aghos."+
			// modulo.getNome());
			destFileWriter.append("rootPackage: " + modulo.getPackageName());
			destFileWriter.append("\n");
			destFileWriter.append("corePackage: " + modulo.getApplication().getCorePackage());
			destFileWriter.append("\n");
			destFileWriter.append("persistenceFramework : " + modulo.getApplication().getPersistenceFramework());
			destFileWriter.append("\n");
			destFileWriter.append("entities:");
			destFileWriter.append("\n");

			for (ItemModulo itemModulo : modulo.getItems()) {
				destFileWriter.append(itemModulo.getYamlContent());
				destFileWriter.append("\n");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return destFileWriter.toString();
	}

	public static List<ApplicationEntity> getTheEntity() {
		YamlReader reader;
		List<ApplicationEntity> entities = null;
		try {
			reader = new YamlReader(new FileReader(currentDir() + File.separator + "conf" + File.separator + "entities.yaml"));

			reader.getConfig().setPropertyElementType(ApplicationEntity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(ApplicationEntity.class, "relationships", Relationship.class);

			entities = reader.read(List.class, ApplicationEntity.class);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return entities;
	}

	public static String getEquivalentClassName(ColumnDataType columnDataType) {
		Class typeName = columnDataType.getTypeMappedClass();

		if (typeName.getName().endsWith("String")) {
			return "String";
		}
		if (typeName.getName().endsWith("Date")) {
			return "Date";
		}
		if (typeName.getName().endsWith("Timestamp")) {
			return "Datetime";
		}
		if (typeName.getName().endsWith("Datetime")) {
			return "Datetime";
		}
		if (typeName.getName().endsWith("Float")) {
			return "Float";
		}
		if (typeName.getName().endsWith("Integer")) {
			return "Integer";
		}
		if (typeName.getName().endsWith("Double")) {
			return "Double";
		}
		if (typeName.getName().endsWith("Boolean")) {
			return "Boolean";
		}

		return "String";
	}

	public static Application getApplicationFromFolder(String folderName, File generatorFilesFolder) {

		File configFile = createPaths(folderName, generatorFilesFolder);

		YamlReader reader;
		Application entities = null;
		try {
			reader = new YamlReader(new FileReader(configFile));

			reader.getConfig().setPropertyElementType(Application.class, "entities", ApplicationEntity.class);
			reader.getConfig().setPropertyElementType(ApplicationEntity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(ApplicationEntity.class, "relationships", Relationship.class);

			entities = reader.read(Application.class);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return entities;
	}

	private static Object getValue(Field field, String val) {
		try {
			if (field.getType().equals(Integer.class)) {
				return new Integer(val);
			} else if (field.getType().equals(Long.class)) {
				return new Long(val);
			} else if (field.getType().equals(String.class)) {
				return val.length() == 0 ? null : val;
			} else if (field.getType().equals(Double.class)) {
				return new Double(val);
			} else if (field.getType().equals(Boolean.class)) {
				if (val != null && val.length() > 0)
					return new Boolean(val);
			} else if (field.getType().equals(Date.class)) {
				return SIMPLE_DATE_FORMAT.parse(val);
			} else if (field.getType().equals(DateTime.class)) {
				return DATE_FORMAT.parseDateTime(val);
			} else if (field.getType().equals(DateTime.class)) {
				return DATE_FORMAT.parseDateTime(val);
			} else if (field.getType().equals(LocalDate.class)) {
				return DATE_FORMAT.parseLocalDate(val);
			} else if (field.getType().equals(LocalDateTime.class)) {
				return DATE_FORMAT.parseLocalDateTime(val);
			}
		} catch (Exception e) {
		}
		return null;
	}

	public static void getApplicationFromFolder(Application appli, List<ItemModulo> items) {

	}

	public static <T> T createObjectFrom(Class<T> clazz, Map<String, String> mapfields) {
		T newFilterObject = null;
		try {
			newFilterObject = clazz.newInstance();
			Field[] fields2 = newFilterObject.getClass().getDeclaredFields();
			for (String fieldName : mapfields.keySet()) {
				Field field;
				field = clazz.getDeclaredField(fieldName);
				field.setAccessible(true);
				field.set(newFilterObject, getValue(field, mapfields.get(fieldName)));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return newFilterObject;
	}

	public static boolean elementHasProperty(Object filter, String string) {
		return getProperty(filter, string) != null;
	}

	public static Object getProperty(Object obj, String property) {
		Object returnValue = null;

		try {
			String methodName = "get" + property.substring(0, 1).toUpperCase() + property.substring(1, property.length());
			Class clazz = obj.getClass();
			Method method = clazz.getMethod(methodName, null);
			returnValue = method.invoke(obj, null);
		} catch (Exception e) {
			// Do nothing, we'll return the default value
		}

		return returnValue;
	}

	public static Integer[] getInts(String exceptions) {

		String[] split = exceptions.trim().split(",");
		Integer[] ints = new Integer[split.length];
		for (int i = 0; i < split.length; i++) {
			try {
				Integer integer = new Integer(split[i]);
				ints[i] = integer;
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		return ints;
	}

	public static String getMaxLen(String datatypeParams) {
		String len = datatypeParams.replaceAll("[()]", "");

		if (len.contains(",")) {
			return "";
		}
		return len;
	}

	public static boolean entityContainsAttribute(ApplicationEntity ent, String textField) {
		List<Attribute> attributes = ent.getAttributes();
		for (Attribute attribute : attributes) {
			if (attribute.getName().equals(textField)) {
				return true;
			}
		}
		return false;
	}

}
