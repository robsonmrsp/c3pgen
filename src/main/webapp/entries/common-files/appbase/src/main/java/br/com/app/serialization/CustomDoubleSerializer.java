package br.com.mercadodelivery.core.serialization;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class CustomDoubleSerializer extends JsonSerializer<Double> {

	@Override
	public void serialize(Double value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {

		BigDecimal bigDecimal = new BigDecimal(value);

		String plainString = bigDecimal.toPlainString();

		// System.out.println("Antes: " + plainString);
		String replaceAll = plainString.replaceAll("\\.", ",");
		// System.out.println("Depois: " + replaceAll);
		jgen.writeString(replaceAll);

		// jgen.writeString(value.toString().replaceAll("\\.", ","));

	}

	public static void _main(String[] args) {
		double d = 123456789123518.123456D;
		BigDecimal bigDecimal = new BigDecimal(d);
		String plainString = bigDecimal.toPlainString();

		System.out.println("DoubleSerializer.main()" + plainString);
	}

	public static void main(String[] args) {
		double myvalue = 0.00000021d;

		// Option 1 Print bare double.
		System.out.println(myvalue);

		// Option2, use decimalFormat.
		DecimalFormat df = new DecimalFormat("#");
		df.setMaximumFractionDigits(8);
		System.out.println(df.format(myvalue));

		// Option 3, use printf.
		System.out.printf("%.9f", myvalue);
		System.out.println();

		// Option 4, convert toBigDecimal and ask for toPlainString().
		System.out.println(new BigDecimal(myvalue).toPlainString());
		System.out.println();

		// Option 5, String.format
		System.out.println(String.format("%.12f", myvalue));
	}

}
