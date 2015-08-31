package br.com.c3pgen.serialization;

import java.io.IOException;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class CustomLocalDateDeserializer extends JsonDeserializer<LocalDate> {

	private static final Logger LOGGER = Logger.getLogger(CustomLocalDateDeserializer.class);
	private static DateTimeFormatter formatter = DateTimeFormat.forPattern("dd/MM/yyyy");

	@Override
	public LocalDate deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {

		String date = jp.getText();
		try {
			return formatter.parseLocalDate(date);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.warn("Erro ao deserializar data: " + date , e);
		}
		return null;
	}
}