package ${application.rootPackage}.utils;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;



public class Util {
	private static SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy");

	public static String createHash(String event) {

		try {
			return MD5ChecksumUtil.createMd5Hash(event);
		} catch (Exception e) {
			e.printStackTrace();
			return "Md5_error";
		}
	}

	public static String removeNonUnicodeCharAndSpaces(String input) {
		String localStr = input;
		localStr = Normalizer.normalize(localStr, Normalizer.Form.NFD);
		localStr = localStr.replaceAll("\\p{Space}", "_").replaceAll("[^\\p{ASCII}]", "");
		return localStr;
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
}
