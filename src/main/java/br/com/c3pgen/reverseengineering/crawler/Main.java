/*
package br.com.c3pgen.reverseengineering.crawler;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;

import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.jdbc.support.MetaDataAccessException;

import schemacrawler.schema.Catalog;
import schemacrawler.schema.Column;
import schemacrawler.schema.ForeignKey;
import schemacrawler.schema.Schema;
import schemacrawler.schema.Table;
import schemacrawler.schemacrawler.InclusionRule;
import schemacrawler.schemacrawler.SchemaCrawlerException;
import schemacrawler.schemacrawler.SchemaCrawlerOptions;
import schemacrawler.schemacrawler.SchemaInfoLevelBuilder;
import schemacrawler.utility.SchemaCrawlerUtility;

public class Main {
	public static void main(String[] args) throws MetaDataAccessException, SchemaCrawlerException, SQLException {
		SingleConnectionDataSource singleConnectionDataSource = new SingleConnectionDataSource("jdbc:postgresql://localhost:5432/db_mercadodelivery", "postgres", "sints", true);
		singleConnectionDataSource.setDriverClassName("org.postgresql.Driver");

		SchemaCrawlerOptions crawlerOptions = new SchemaCrawlerOptions();

		crawlerOptions.setSchemaInfoLevel(SchemaInfoLevelBuilder.standard());
		crawlerOptions.setColumnInclusionRule(new InclusionRule() {
			@Override
			public boolean test(String t) {
				return true;
			}
		});
		crawlerOptions.setSchemaInclusionRule(new InclusionRule() {
			@Override
			public boolean test(String t) {
				// System.out.println(t);
				return t.equals("public");
			}
		});
		ArrayList<String> arrayList = new ArrayList<String>();
		arrayList.add("TABLE");
		crawlerOptions.setTableTypes(arrayList);

		final Catalog catalog = SchemaCrawlerUtility.getCatalog(singleConnectionDataSource.getConnection(), crawlerOptions);

		for (final Schema schema : catalog.getSchemas()) {

			System.out.println(schema);
			for (final Table table : catalog.getTables(schema)) {
				System.out.println("");
				System.out.println("tabela " + table);
				if (table.getPrimaryKey() != null)
					System.out.println("PK : " + table.getPrimaryKey().getColumns());
				Collection<ForeignKey> foreignKeys = table.getExportedForeignKeys();
				for (ForeignKey foreignKey : foreignKeys) {

					// OneToMany
					System.out.println("RELACIONAMENTOS A : " + foreignKey.getColumnReferences().get(0).getForeignKeyColumn().getParent());

				}

				for (final Column column : table.getColumns()) {

					// se isPartOfAForeign == true ManyToOne
					if (column.isPartOfForeignKey())
						System.out.println("     o--> " + column + "				pfk: " + column.isPartOfForeignKey() + " 				ref: " + column.getReferencedColumn().getParent());
				}
			}
		}

	}
}
*/
