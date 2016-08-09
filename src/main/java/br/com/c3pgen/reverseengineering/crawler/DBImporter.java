package br.com.c3pgen.reverseengineering.crawler;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import schemacrawler.schema.Catalog;
import schemacrawler.schema.Column;
import schemacrawler.schema.ForeignKey;
import schemacrawler.schema.Schema;
import schemacrawler.schema.Table;
import schemacrawler.schemacrawler.InclusionRule;
import schemacrawler.schemacrawler.SchemaCrawlerOptions;
import schemacrawler.schemacrawler.SchemaInfoLevelBuilder;
import schemacrawler.utility.SchemaCrawlerUtility;
import br.com.c3pgen.base.util.Util;

import com.google.common.base.CaseFormat;

public class DBImporter {
	final String url;
	final String username;
	final String password;
	final String driverClassName;

	private SingleConnectionDataSource singleConnectionDataSource;

	public DBImporter(String url, String username, String password, String driverClassName) {
		super();
		this.url = url;
		this.username = username;
		this.password = password;
		this.driverClassName = driverClassName;
		this.singleConnectionDataSource = new SingleConnectionDataSource(url, username, password, true);
		this.singleConnectionDataSource.setDriverClassName(getByType(driverClassName));

	}

	public static String getByType(String databasetype) {
		if (databasetype.equalsIgnoreCase("postgressql"))
			return "org.postgresql.Driver";
		else if (databasetype.equalsIgnoreCase("oracle"))
			return "oracle.jdbc.driver.OracleDriver";

		return "org.postgresql.Driver";//
	}

	public String getUrl() {
		return url;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getDriverClassName() {
		return driverClassName;
	}

	public DBImportResult extractToYaml(DBImporterOptions options) throws Exception {
		DBImportResult result = new DBImportResult();
		List<String> fileLines = new ArrayList<String>();
		String folderOutput = Util.currentDir() + File.separator + "temp" + File.separator + System.currentTimeMillis() + "_generate_in";
		new File(folderOutput).mkdirs();

		Catalog catalog = SchemaCrawlerUtility.getCatalog(singleConnectionDataSource.getConnection(), createCrawlerOptions(options));
		for (final Schema schema : catalog.getSchemas()) {

			System.out.println(schema);
			for (final Table table : catalog.getTables(schema)) {

				String nomeDaClasse = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCaseOnly(table.getName()));
				fileLines.add("- name: " + nomeDaClasse);
				fileLines.add("  hasOwner: false ");
				fileLines.add("  displayName: " + Util.firstUpperCaseOnly(table.getName()));
				fileLines.add("  tableName: " + table.getName().toUpperCase());
				fileLines.add("  attributes:                     ");
				Collection<Column> colunas = table.getColumns();

				List<Column> relations = new ArrayList<Column>();

				for (Column column : colunas) {
					if (!column.isPartOfPrimaryKey() && !column.isPartOfForeignKey()) {
						fileLines.add("  - name: " + Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, column.getName())));
						fileLines.add("    tableFieldName: " + column.getName().toUpperCase());
						// fileLines.add("    displayName: " + Util.firstUpperCaseOnly(column.getColName().toUpperCase()));
						fileLines.add("    displayName: " + column.getName());
						fileLines.add("    type: ");
						fileLines.add("      className: " + Util.getEquivalentClassName(column.getColumnDataType()));
					}
					if (column.isPartOfForeignKey()) {
						relations.add(column);
					}
				}
				fileLines.add("  relationships:                     ");
				Collection<ForeignKey> foreignKeys = table.getExportedForeignKeys();
				for (ForeignKey foreignKey : foreignKeys) {
					String tableName = foreignKey.getColumnReferences().get(0).getForeignKeyColumn().getParent().getName();

					fileLines.add("  - name: " + Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName)) + "s");
					fileLines.add("    type: OneToMany");
					fileLines.add("    ownerName: " + Util.firstLowerCase(nomeDaClasse));
					fileLines.add("    model: " + CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName) + "                       ");
					fileLines.add("    displayName: " + Util.firstUpperCase(tableName) + "                       ");

				}
				for (final Column column : relations) {
					String tableName = column.getReferencedColumn().getParent().getName();

					fileLines.add("  - name: " + Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName)) + "             ");
					fileLines.add("    type: ManyToOne");
					fileLines.add("    model: " + Util.firstUpperCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName)) + "                       ");
					fileLines.add("    displayName: " + Util.firstUpperCase(tableName) + "                       ");
					fileLines.add("    viewApproach:   ");
					fileLines.add("      type: modal ");
					fileLines.add("      hiddenField: id ");
					fileLines.add("      textField: nome ");

				}

				// String fileOutput = folderOutput + File.separator + "APP_" + nomeDaClasse + ".yaml";

				StringBuilder sb = new StringBuilder();
				for (String s : fileLines) {
					sb.append(s);
					sb.append("\n");
				}

				System.out.println(sb);

				result.add(new TableResult(nomeDaClasse, sb.toString()));
				// for (Iterator it = fileLines.iterator(); it.hasNext();) {
				// Object line = it.next();
				// if (line != null) {
				// System.out.println(line.toString());
				// }
				//
				// }
				// IOUtils.writeLines(fileLines, null, new StringBuFileOutputStream(fileOutput));
				fileLines.clear();

				// System.out.println("Gerado " + fileOutput);

			}
		}

		return result;
	}

	private SchemaCrawlerOptions createCrawlerOptions(final DBImporterOptions options) {
		SchemaCrawlerOptions crawlerOptions = new SchemaCrawlerOptions();

		crawlerOptions.setSchemaInfoLevel(SchemaInfoLevelBuilder.standard());

		crawlerOptions.setColumnInclusionRule(new InclusionRule() {

			@Override
			public boolean test(String columnName) {
				for (String regex : options.getExcludeColumnNamePatterns()) {
					if (columnName.matches(regex)) {
						return false;
					}
				}
				return true;
			}
		});
		crawlerOptions.setTableInclusionRule(new InclusionRule() {
			@Override
			public boolean test(String tableName) {
				if (options.getTableNamesToImport().size() > 0) {
					for (String regex : options.getTableNamesToImport()) {
						if (tableName.endsWith(regex.trim())) {
							return true;
						}
					}
					return false;

				} else {
					for (String regex : options.getExcludeTableNamePatterns()) {
						if (tableName.matches(regex)) {
							return false;
						}
					}
				}
				System.out.println("Utilizando a tabela: " + tableName);
				return true;
			}
		});

		crawlerOptions.setSchemaInclusionRule(new InclusionRule() {
			@Override
			public boolean test(String schemaName) {
				// System.out.println(t);
				return options.getIncludeSchemaNames().contains(schemaName);
			}
		});

		
		ArrayList<String> arrayList = new ArrayList<String>();
		arrayList.add("TABLE");
		crawlerOptions.setTableTypes(arrayList);

		return crawlerOptions;
	}

}
