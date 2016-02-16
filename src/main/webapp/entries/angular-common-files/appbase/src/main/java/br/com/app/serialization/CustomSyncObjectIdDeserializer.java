package ${application.rootPackage}.serialization;

import java.io.IOException;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CustomSyncObjectIdDeserializer extends JsonDeserializer<Integer> {

	private static final Logger LOGGER = Logger.getLogger(CustomSyncObjectIdDeserializer.class);

	@Override
	public Integer deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {

		String idInter = jp.getText();
		try {
			return Integer.parseInt(idInter);
		} catch (Exception e) {
			LOGGER.warn("Erro ao deserializar dataInter: " + idInter);
		}
		return null;
	}
}