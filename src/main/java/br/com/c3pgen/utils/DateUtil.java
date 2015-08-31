package br.com.c3pgen.utils;

import org.apache.log4j.Logger;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

//TODO MErece um refactory por causa do formato da data que está sendo usado. Devemos usar o formato dd/MM/yyyy
public class DateUtil {
	private static final Logger LOGGER = Logger.getLogger(DateUtil.class);

	private static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");
	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy");
	private static final DateTimeFormatter HOUR_FORMAT = DateTimeFormat.forPattern("HH:mm");

	public static String asString(LocalDateTime datetime, String pattern) {
		return DateTimeFormat.forPattern(pattern).print(datetime);
	}

	public static DateTime parseData(String data) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern("MM/dd/yyyy");
		DateTime expireDate = null;
		try {
			expireDate = DateTime.parse(data, fmt);
		} catch (Exception ex) {
			LOGGER.warn(String.format("Cannot create a DateTime from input [%s]", data), ex);
		}

		return expireDate;
	}

	public static DateTime parsetoHour(String hour) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern("HH:mm");
		DateTime expireDate = null;
		try {
			expireDate = DateTime.parse(hour, fmt);
		} catch (Exception ex) {
			LOGGER.warn(String.format("Cannot create a DateTime from input [%s]", hour), ex);
		}

		return expireDate;
	}

	public static String localDateAsString(LocalDate date) {
		String format = "";
		try {
			format = DATE_FORMAT.print(date);
		} catch (Exception e) {
			format = null;
		}
		return format;
	}

	public static String localDateTimeAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_TIME_FORMAT.print(date);
		} catch (Exception e) {
			format = null;
		}
		return format;
	}

	public static LocalDateTime stringAsLocalDateTime(String date) {
		if (date != null && !date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_TIME_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				LOGGER.error(e);
			}
		}
		return LocalDateTime.now();

	}

	public static LocalDate stringAsLocalDate(String date) {
		if (date != null && !date.isEmpty()) {
			try {
				LocalDate dateTime = DATE_FORMAT.parseLocalDate(date);
				return dateTime;
			} catch (Exception e) {
				LOGGER.error(e);
			}
		}
		return LocalDate.now();

	}
}
