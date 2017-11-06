package ${application.corePackage}.serialization;

import java.io.IOException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/** generated by JSetup ${JSetupVersion} :  at ${.now}  */
public class CustomLocalDateSerializer extends JsonSerializer<LocalDate> {

	private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	@Override
	public Class<LocalDate> handledType() {
		return LocalDate.class;
	}

	@Override
	public void serialize(LocalDate value, JsonGenerator gen, SerializerProvider arg2) throws IOException, JsonProcessingException {

		gen.writeString(formatter.format(value));

	}
}