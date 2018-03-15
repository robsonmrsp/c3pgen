package br.com.c3pgen.reverseengineering.crawler;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.apache.log4j.Logger;

import com.google.common.base.CaseFormat;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.AttributeType;

public class DBImporterEntitiesFromFlatFileLayout {
	private static final Logger LOGGER = Logger.getLogger(DBImporterEntitiesFromFlatFileLayout.class);

	public Application extractToApplication(DBImporterOptions options) throws Exception {

		Application application = new Application();
		application.setUseFlatFile(Boolean.TRUE);

		File folder = new File("C:\\Users\\robson\\Desktop\\sigtap");

		for (final File fileEntry : folder.listFiles()) {

			String fileName = fileEntry.getName().replaceAll(".txt", "");

			if (!fileName.toUpperCase().equals("LAYOUT") && fileName.toUpperCase().contains("LAYOUT")) {
				fileName = fileName.replaceAll("rl_", "").replaceAll("tb_", "").replaceAll("layout", "");
				String line;
				BufferedReader br = new BufferedReader(new FileReader(fileEntry));

				String nomeDaClasse = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCaseOnly(fileName));

				ApplicationEntity applicationEntity = new ApplicationEntity(nomeDaClasse, fileName);

				while ((line = br.readLine()) != null) {
					// CO_PROCEDIMENTO, 10,1,10,VARCHAR2
					String[] fields = line.split(",");

					if (line.indexOf("Coluna") != 0) {
						String[] field = line.split(",");

						String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, fields[0]));
						String tableFieldName = fields[0];
						String displayName = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, fields[0]);
						Boolean required = false;
						Boolean unique = false;
						String className = "String";// Util.getEquivalentClassName(fields[4], false);

						// record.addField(Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, fields[0])), Util.getEquivalentClassName(fields[4]), fields[2], fields[1]);

						applicationEntity.addAttributes(new Attribute(name, displayName, tableFieldName, required, unique, true, AttributeType.byName(className), fields[1], fields[2]));

					}
				}
				application.addEntities(applicationEntity);
			}

		}
		return application;
	}
}
