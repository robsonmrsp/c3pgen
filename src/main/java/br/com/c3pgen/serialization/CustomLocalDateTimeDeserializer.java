package br.com.c3pgen.serialization;

import java.io.IOException;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CustomLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

	private static final Logger LOGGER = Logger.getLogger(CustomLocalDateTimeDeserializer.class);
	private static DateTimeFormatter formatter = DateTimeFormat.forPattern("dd/MM/yyyy");

	@Override
	public LocalDateTime deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {

		String date = jp.getText();
		try {
			return formatter.parseLocalDateTime(date);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.warn("Erro ao deserializar data: " + date, e);
		}
		return null;
	}
}