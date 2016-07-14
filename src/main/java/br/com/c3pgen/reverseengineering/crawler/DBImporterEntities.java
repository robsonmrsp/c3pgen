package br.com.c3pgen.reverseengineering.crawler;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
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
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.ViewApproach;

import com.google.common.base.CaseFormat;

public class DBImporterEntities {
	final String url;
	final String username;
	final String password;
	final String driverClassName;

	private SingleConnectionDataSource singleConnectionDataSource;

	public DBImporterEntities(String url, String username, String password, String driverClassName) {
		super();
		this.url = url;
		this.username = username;
		this.password = password;
		this.driverClassName = driverClassName;
		this.singleConnectionDataSource = new SingleConnectionDataSource(url, username, password, true);
		this.singleConnectionDataSource.setDriverClassName(driverClassName);

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

	public Application extractToApplication(DBImporterOptions options) throws Exception {
		DBImportResult result = new DBImportResult();
		Application application = new Application();

		application.setAppName("ExtractToApplication");

		List<String> fileLines = new ArrayList<String>();
		String folderOutput = Util.currentDir() + File.separator + "temp" + File.separator + System.currentTimeMillis() + "_generate_in";
		new File(folderOutput).mkdirs();
		HashSet<ApplicationRelationship> applicationRelationships = new HashSet<ApplicationRelationship>();

		Catalog catalog = SchemaCrawlerUtility.getCatalog(singleConnectionDataSource.getConnection(), createCrawlerOptions(options));
		for (final Schema schema : catalog.getSchemas()) {

			System.out.println(schema);
			for (final Table table : catalog.getTables(schema)) {

				String nomeDaClasse = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCaseOnly(table.getName()));
				ApplicationEntity applicationEntity = new ApplicationEntity(nomeDaClasse, table.getName());

				fileLines.add("- name: " + nomeDaClasse);
				fileLines.add("  hasOwner: false ");
				fileLines.add("  displayName: " + Util.firstUpperCaseOnly(table.getName()));
				fileLines.add("  tableName: " + table.getName().toUpperCase());
				fileLines.add("  attributes:                     ");
				Collection<Column> colunas = table.getColumns();

				List<Column> relations = new ArrayList<Column>();

				for (Column column : colunas) {
					if (!column.isPartOfPrimaryKey() && !column.isPartOfForeignKey()) {

						String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, column.getName()));
						String tableFieldName = column.getName().toUpperCase();
						String displayName = column.getName();
						Boolean required = !column.isNullable();
						Boolean unique = column.isPartOfUniqueIndex();
						String className = Util.getEquivalentClassName(column.getColumnDataType());

						fileLines.add("  - name: " + name);
						fileLines.add("    tableFieldName: " + tableFieldName);
						fileLines.add("    displayName: " + displayName);
						fileLines.add("    type: ");
						fileLines.add("      className: " + className);

						applicationEntity.addAttributes(new Attribute(name, tableFieldName, required, unique, true, AttributeType.byName(className)));

					}
					if (column.isPartOfForeignKey()) {
						relations.add(column);
					}
				}
				fileLines.add("  relationships:                     ");
				Collection<ForeignKey> foreignKeys = table.getExportedForeignKeys();
				for (ForeignKey foreignKey : foreignKeys) {

					String targetTableName = foreignKey.getColumnReferences().get(0).getForeignKeyColumn().getParent().getName();

					String ownerName = Util.firstLowerCase(nomeDaClasse);
					String model = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, targetTableName);
					String displayName = Util.firstUpperCase(targetTableName);

					String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, targetTableName)) + "s";

					String sourceRelName = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, table.getName()));

					fileLines.add("  - name: " + name);
					fileLines.add("    type: OneToMany");
					fileLines.add("    ownerName: " + ownerName);
					fileLines.add("    model: " + model + "                       ");
					fileLines.add("    displayName: " + displayName + "                       ");

					// ---->>
					Relationship relationshipTarget = new Relationship(name, displayName, "OneToMany", ownerName, model, false, ViewApproach.multiselectInstance());
					relationshipTarget.setEntity(applicationEntity);

					// <<------
					Relationship relationshipSource = new Relationship(sourceRelName, Util.firstUpperCase(sourceRelName), "ManyToOne", null, model, false, ViewApproach.modalInstance("id", "nome"));
					relationshipSource.setEntity(applicationEntity);

					ApplicationRelationship appRel = new ApplicationRelationship();
					appRel.setSource(relationshipSource);
					appRel.setTarget(relationshipTarget);

					applicationRelationships.add(appRel);
				}
				for (final Column column : relations) {
					String tableName = column.getReferencedColumn().getParent().getName();

					String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));
					String model = Util.firstUpperCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));

					String relName = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, table.getName()));
					String displayName = Util.firstUpperCase(tableName);

					fileLines.add("  - name: " + name + "     ");
					fileLines.add("    type: ManyToOne");
					fileLines.add("    model: " + model + "                       ");
					fileLines.add("    displayName: " + displayName + "                       ");
					fileLines.add("    viewAproach:   ");
					fileLines.add("      type: modal ");
					fileLines.add("      hiddenField: id ");
					fileLines.add("      textField: nome ");
					// <<------
					Relationship relationshipTarget = new Relationship(name, displayName, "ManyToOne", null, model, false, ViewApproach.modalInstance("id", "nome"));
					relationshipTarget.setEntity(applicationEntity);

					// ---->>
					Relationship relationshipSource = new Relationship(relName + "s", Util.firstUpperCase(relName + "s"), "OneToMany", Util.firstLowerCase(relName), Util.firstUpperCase(relName), false, ViewApproach.multiselectInstance());
					relationshipSource.setEntity(applicationEntity);

					ApplicationRelationship appRel = new ApplicationRelationship();
					appRel.setSource(relationshipSource);
					appRel.setTarget(relationshipTarget);

					applicationRelationships.add(appRel);

				}

				String fileOutput = folderOutput + File.separator + "APP_" + nomeDaClasse + ".yaml";
				result.addTableName(nomeDaClasse);
				for (Iterator it = fileLines.iterator(); it.hasNext();) {
					Object line = it.next();
					if (line != null) {
						System.out.println(line.toString());
					}

				}
				IOUtils.writeLines(fileLines, null, new FileOutputStream(fileOutput));
				fileLines.clear();

				System.out.println("Gerado " + fileOutput);

				application.addEntities(applicationEntity);

				application.addApplicationRelationships(applicationRelationships);
			}
		}

		return application;
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
				for (String regex : options.getExcludeTableNamePatterns()) {
					if (tableName.matches(regex)) {
						return false;
					}
				}
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
