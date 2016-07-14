package br.com.c3pgen.importdatabase;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.lang.reflect.Field;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import br.com.c3pgen.reverseengineering.crawler.DBImportResult;
import br.com.c3pgen.reverseengineering.crawler.DBImporter;
import br.com.c3pgen.reverseengineering.crawler.DBImporterOptions;

public class ImportDataBaseUT {

	SingleConnectionDataSource singleConnectionDataSource = new SingleConnectionDataSource("jdbc:postgresql://localhost:5432/db_mercadodelivery", "postgres", "sints", true);

	DBImporter dbImporter = new DBImporter("jdbc:postgresql://localhost:5432/db_mercadodelivery", "postgres", "sints", "org.postgresql.Driver");

	@Test
	public void testName() throws Exception {
		File folder = new File("");
		DBImporterOptions options = new DBImporterOptions();

		options.addInclusionSchemaName("public");
		options.addExclusionColumnNamePatterns("(.*)create_datetime(.*)");

		options.addExclusionTableNamePatterns("(.*)AUD", "(.*)aud");

		options.setPrefixToSupress("GSH_PA_");
		DBImportResult dbImportResult = dbImporter.extractToYaml(folder, options);

		assertFalse("Não deveria haver nenhuma tabela de AUDITORIA", dbImportResult.containsTable("GSH_PA_BAIRRO_AUD"));
		assertTrue("Deveria ter produzido algum resultado: ", dbImportResult.hasResult());

	}
}
