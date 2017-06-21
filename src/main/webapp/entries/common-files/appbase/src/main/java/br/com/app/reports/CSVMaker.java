package ${application.corePackage}.reports;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CSVMaker<T> {
	private static final Logger LOGGER = LoggerFactory.getLogger(CSVMaker.class);

	private static final String COMMA_DELIMITER = ";";
	private static final String NEW_LINE_SEPARATOR = System.lineSeparator();

	private CSVLayout<T> layout;

	public CSVMaker(CSVLayout<T> layout) {
		this.layout = layout;
	}

	public void print(String fileName, List<T> items) {

		FileWriter fileWriter = null;

		try {
			fileWriter = new FileWriter(fileName);

			// Imprimir o header
			LinkedList<CSVColumn<T>> headerColumns = layout.getColumns();
			for (int index = 0; index < headerColumns.size(); index++) {
				CSVColumn<T> csvColumn = headerColumns.get(index);
				fileWriter.append(csvColumn.getHeader());

				if (index < headerColumns.size()) {
					fileWriter.append(COMMA_DELIMITER);
				}
			}
			fileWriter.append(NEW_LINE_SEPARATOR);

			// imprimir o conteudo
			for (T item : items) {
				LinkedList<CSVColumn<T>> columnsToBody = layout.getColumns();
				for (int i = 0; i < columnsToBody.size(); i++) {
					CSVColumn<T> csvColumn = columnsToBody.get(i);

					if (csvColumn.getValue(item) != null) {
						fileWriter.append(String.valueOf(csvColumn.getValue(item)));
					} else {
						fileWriter.append("");
					}
					if (i < columnsToBody.size()) {
						fileWriter.append(COMMA_DELIMITER);
					}
				}

				fileWriter.append(NEW_LINE_SEPARATOR);
			}
			LOGGER.info("Successfull to generate " + items.size() + " lines");

		} catch (Exception e) {
			LOGGER.error("Error generating csv file" + fileName, e);
		} finally {
			try {
				fileWriter.flush();
				fileWriter.close();
			} catch (IOException e) {
				LOGGER.error("Error I/O file" + fileName, e);
			}
		}
	}

	public byte[] printToByte(String fileName, List<T> items) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		DataOutputStream dos = new DataOutputStream(baos);
		byte[] result = null;

		try {
			// Imprimir o header
			LinkedList<CSVColumn<T>> headerColumns = layout.getColumns();
			for (int index = 0; index < headerColumns.size(); index++) {
				CSVColumn<T> csvColumn = headerColumns.get(index);
				dos.writeBytes(csvColumn.getHeader());

				if (index < headerColumns.size()) {
					dos.writeBytes(COMMA_DELIMITER);
				}
			}
			dos.writeBytes(NEW_LINE_SEPARATOR);

			// imprimir o conteudo
			for (T item : items) {
				LinkedList<CSVColumn<T>> columnsToBody = layout.getColumns();
				for (int i = 0; i < columnsToBody.size(); i++) {
					CSVColumn<T> csvColumn = columnsToBody.get(i);
					dos.writeBytes(String.valueOf(csvColumn.getValue(item)));
					if (i < columnsToBody.size()) {
						dos.writeBytes(COMMA_DELIMITER);
					}
				}

				dos.writeBytes(NEW_LINE_SEPARATOR);
			}
			LOGGER.info("Successfull to generate " + items.size() + " lines");

			result = baos.toByteArray();
		} catch (Exception e) {
			LOGGER.error("Error generating csv file" + fileName, e);
		} finally {
			try {
				dos.flush();
				dos.close();
			} catch (IOException e) {
				LOGGER.error("Error I/O file" + fileName, e);
			}
		}

		return result;
	}
}
