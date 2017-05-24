package br.com.c3pgen.helper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import br.com.c3pgen.base.util.Util;


public class HelperDBDesign {
	public static void main(String[] args) throws FileNotFoundException, IOException {
		Serializer serializer = new Persister();
		List<String> fileLines = new ArrayList<String>();
		String folderOutput = Util.currentDir() + File.separator + "temp" + File.separator + System.currentTimeMillis() + "_generate_in";

		new File(folderOutput).mkdirs();

		File source = new File("C:\\cyg\\home\\robson\\repos\\c3pgen\\in\\vs\\vs_gestor.xml");
		DBModel example = null;
		try {
			example = serializer.read(DBModel.class, source);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Collection<Table> tables = example.getMetadata().getTables();

		for (Table table : tables) {
			fileLines.add("- name: " + Util.firstUpperCaseOnly(table.getTablename()));
			fileLines.add("  hasOwner: false	              ");
			fileLines.add("  displayName: " + Util.firstUpperCaseOnly(table.getTablename()));
			fileLines.add("  tableName: " + table.getTablename().toUpperCase());
			fileLines.add("  attributes:                     ");
			Collection<Column> colunas = table.getColumns();
			for (Column column : colunas) {
				if (column.isNotKey()) {
					fileLines.add("  - name: " + column.getColName().toLowerCase());
					fileLines.add("    tableFieldName: " + column.getColName().toUpperCase());
					fileLines.add("    displayName: " + Util.firstUpperCaseOnly(column.getColName().toUpperCase()));
					fileLines.add("    type:	                      ");
					fileLines.add("      className: " + column.getDataType().getDescricao());
				}
			}
			fileLines.add("  relationships:                     ");

			String fileOutput = folderOutput + File.separator + "APP_" + Util.firstUpperCaseOnly(table.getTablename()) + ".yaml";

			IOUtils.writeLines(fileLines, null, new FileOutputStream(fileOutput));

			System.out.println("Gerado " + fileOutput);

			fileLines.clear();
		}

	}

}
