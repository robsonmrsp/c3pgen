package br.com.c3pgen.reverseengineering.crawler;

import java.io.File;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import com.google.common.base.CaseFormat;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.ViewApproach;
import schemacrawler.schema.Catalog;
import schemacrawler.schema.Column;
import schemacrawler.schema.ForeignKey;
import schemacrawler.schema.Schema;
import schemacrawler.schema.Table;
import schemacrawler.schemacrawler.InclusionRule;
import schemacrawler.schemacrawler.SchemaCrawlerOptions;
import schemacrawler.schemacrawler.SchemaInfoLevelBuilder;
import schemacrawler.utility.SchemaCrawlerUtility;

public class DBImporterEntities {
	final String url;
	final String username;
	final String password;
	final String databaseType;

	private static final Logger LOGGER = Logger.getLogger(DBImporterEntities.class);

	private SingleConnectionDataSource singleConnectionDataSource;
	private ResultSet rs;

	public DBImporterEntities(String url, String username, String password, String databasetype) {
		super();
		this.url = url;
		this.databaseType = databasetype;
		this.username = username;
		this.password = password;
		this.singleConnectionDataSource = new SingleConnectionDataSource(url, username, password, true);
		this.singleConnectionDataSource.setDriverClassName(getByType(databasetype));

	}

	public static String getByType(String databasetype) {
		if (databasetype.equalsIgnoreCase("postgressql"))
			return "org.postgresql.Driver";
		else if (databasetype.equalsIgnoreCase("oracle"))
			return "oracle.jdbc.driver.OracleDriver";

		return "org.postgresql.Driver";//
	}

	public boolean ping() throws Exception {
		Connection con = null;

		con = singleConnectionDataSource.getConnection();
		Statement st = con.createStatement();
		if (databaseType.equalsIgnoreCase("postgresql")) {
			rs = st.executeQuery("select version();");
		} else if (databaseType.equalsIgnoreCase("oracle")) {
			rs = st.executeQuery("select 1 from dual");
		}
		con.close();

		LOGGER.info("[ " + databaseType + " ] ping successful!");

		return true;
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

	public Application extractToApplication(DBImporterOptions options) throws Exception {
		DBImportResult result = new DBImportResult();
		Application application = new Application();

		application.setAppName("ExtractToApplication");

		List<String> fileLines = new ArrayList<String>();
		String folderOutput = Util.currentDir() + File.separator + "temp" + File.separator + System.currentTimeMillis() + "_generate_in";
		new File(folderOutput).mkdirs();
		HashSet<ApplicationRelationship> applicationRelationships = new HashSet<ApplicationRelationship>();
		HashSet<Relationship> relationships = new HashSet<Relationship>();

		Connection connection = singleConnectionDataSource.getConnection();
		Catalog catalog = SchemaCrawlerUtility.getCatalog(connection, createCrawlerOptions(options));

		for (final Schema schema : catalog.getSchemas()) {

			System.out.println(schema);
			for (final Table table : catalog.getTables(schema)) {
				String nomeDaClasse = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCaseOnly(table.getName()));
				ApplicationEntity applicationEntity = new ApplicationEntity(nomeDaClasse, table.getName());
				Collection<Column> colunas = table.getColumns();

				for (Column column : colunas) {
					if (!column.isPartOfPrimaryKey() && !column.isPartOfForeignKey()) {

						String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, column.getName()));
						String tableFieldName = column.getName().toUpperCase();
						String displayName = column.getName();
						Boolean required = !column.isNullable();
						Boolean unique = column.isPartOfUniqueIndex();
						String className = Util.getEquivalentClassName(column.getColumnDataType());

						applicationEntity.addAttributes(new Attribute(name, name, tableFieldName, required, unique, true, AttributeType.byName(className)));
					}
				}
				application.addEntities(applicationEntity);
			}

			////////////////////////// somente relatcionamentos ///////////////////////

			for (final Table table : catalog.getTables(schema)) {
				String nomeDaClasse = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCaseOnly(table.getName()));

				ApplicationEntity applicationEntity = getEntity(application, nomeDaClasse);

				List<Column> relations = new ArrayList<Column>();
				Collection<Column> colunas = table.getColumns();
				for (Column column : colunas) {
					if (column.isPartOfForeignKey()) {
						relations.add(column);
					}
				}
				Collection<ForeignKey> foreignKeys = table.getExportedForeignKeys();
				for (ForeignKey foreignKey : foreignKeys) {

					String targetTableName = foreignKey.getColumnReferences().get(0).getForeignKeyColumn().getParent().getName();

					String ownerName = Util.firstLowerCase(nomeDaClasse);
					String model = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, targetTableName);
					String displayName = Util.firstUpperCase(targetTableName);

					String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, targetTableName)) + "s";

					String sourceRelModel = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, table.getName());
					String sourceRelName = Util.firstLowerCase(sourceRelModel);
					// ---->>
					Relationship relationshipTarget = new Relationship(name, displayName, "OneToMany", ownerName, model, false, ViewApproach.noneInstance());
					relationshipTarget.setOrigin(Boolean.TRUE);
					relationshipTarget.setEntity(applicationEntity);
					if (!applicationEntity.getRelationships().contains(relationshipTarget))
						applicationEntity.addRelationships(relationshipTarget);

					// <<------
					Relationship relationshipSource = new Relationship(sourceRelName, Util.firstUpperCase(sourceRelName), "ManyToOne", null, sourceRelModel, false, ViewApproach.modalInstance("id", "nome"));
					ApplicationEntity entity = getEntity(application, sourceRelModel);
					relationshipSource.setEntity(entity);
					if (!entity.getRelationships().contains(relationshipSource) && !entity.equals(applicationEntity))
						entity.addRelationships(relationshipSource);
				}
				for (final Column column : relations) {
					String tableName = column.getReferencedColumn().getParent().getName();

					String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));
					String model = Util.firstUpperCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));

					String relName = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, table.getName()));
					String displayName = Util.firstUpperCase(tableName);

					// <<------
					Relationship relationshipTarget = new Relationship(name, displayName, "ManyToOne", null, model, false, ViewApproach.modalInstance("id", "nome"));
					relationshipTarget.setEntity(applicationEntity);

					if (!applicationEntity.getRelationships().contains(relationshipTarget))
						applicationEntity.addRelationships(relationshipTarget);

					// ---->>
					Relationship relationshipSource = new Relationship(relName + "s", Util.firstUpperCase(relName + "s"), "OneToMany", Util.firstLowerCase(relName), Util.firstUpperCase(relName), false, ViewApproach.noneInstance());
					relationshipSource.setOrigin(Boolean.TRUE);

					ApplicationEntity entity = getEntity(application, Util.firstUpperCase(relName));
					relationshipSource.setEntity(entity);

					if (!entity.getRelationships().contains(relationshipSource) &&  !entity.equals(applicationEntity))
						entity.addRelationships(relationshipSource);
				}
			}
		}

		return application;
	}

	private ApplicationEntity getEntity(Application application, String nomeDaClasse) {
		for (ApplicationEntity appEnt : application.getEntities()) {
			if (appEnt.getName().equals(nomeDaClasse)) {
				return appEnt;
			}
		}
		return null;
	}

	private ApplicationEntity getEntity(ApplicationEntity applicationEntity) {

		return null;
	}

	private SchemaCrawlerOptions createCrawlerOptions(final DBImporterOptions options) {
		SchemaCrawlerOptions crawlerOptions = new SchemaCrawlerOptions();

		crawlerOptions.setSchemaInfoLevel(SchemaInfoLevelBuilder.standard());

		crawlerOptions.setColumnInclusionRule(new InclusionRule() {

			@Override
			public boolean test(String columnName) {
				for (String regex : options.getExcludeColumnNamePatterns()) {
					String trimed = regex.trim();
					if (columnName.matches(trimed)) {
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
					String trimed = regex.trim();
					if (tableName.matches(trimed) || tableName.equals("public." + trimed) || tableName.equals(trimed)) {
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

	public static void main(String[] args) throws Exception {
		DBImporterEntities db = new DBImporterEntities("jdbc:postgresql://localhost:5432/db_c3pgen", "postgres", "sints", "postgresql");
		if (db.ping()) {
			System.out.println("DBImporterEntities.main()");
		}
	}
}
