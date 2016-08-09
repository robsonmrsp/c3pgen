package ${application.corePackage}.serialization;

import java.io.IOException;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class CustomDoubleDeserializer extends JsonDeserializer<Double> {

	private static final Logger LOGGER = Logger.getLogger(CustomLocalDateDeserializer.class);

	@Override
	public Double deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {

		String dNumber = jp.getText();
		try {
			if (dNumber != null && dNumber.contains(",")) {
				dNumber = dNumber.replaceAll("\\.", "").replace(",", ".");
			}
			return new Double(dNumber);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.warn("Erro ao deserializar data: " + dNumber, e);
		}
		return null;
	}

	public static void main(String[] args) {

		String dNumber = "123.123,155";
		try {
			if (dNumber != null && dNumber.contains(",")) {
				dNumber = dNumber.replaceAll("\\.", "").replace(",", ".");
			}
			System.out.println("CustomLocalDateDeserializer.main()" + new Double(dNumber));
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.warn("Erro ao deserializar data: " + dNumber, e);
		}

	}
}