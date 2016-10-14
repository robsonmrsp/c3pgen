//package br.com.c3pgen.reverseengineering;
//
//import java.io.File;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//import org.simpleframework.xml.Serializer;
//import org.simpleframework.xml.core.Persister;
//
//import com.google.common.base.CaseFormat;
//
//import br.com.c3pgen.base.util.Util;
//import br.com.c3pgen.helper.Column;
//import br.com.c3pgen.helper.DBModel;
//import br.com.c3pgen.model.Application;
//import br.com.c3pgen.model.ApplicationEntity;
//import br.com.c3pgen.model.ApplicationRelationship;
//import br.com.c3pgen.model.Attribute;
//import br.com.c3pgen.model.AttributeType;
//import br.com.c3pgen.model.Relationship;
//import br.com.c3pgen.model.ViewApproach;
//
//
//public class DBDesignerImporterEntities {
//
//	public Application extractToApplication(DBImporterOptions options) throws Exception {
//		Application application = new Application();
//
//		application.setAppName("ExtractToApplication");
//
//		Serializer serializer = new Persister();
//		List<String> fileLines = new ArrayList<String>();
//		String folderOutput = Util.currentDir() + File.separator + "temp" + File.separator + System.currentTimeMillis() + "_generate_in";
//		new File(folderOutput).mkdirs();
//		// File source = new
//		// File("C:\\cyg\\home\\robso\\repos\\mercadodelivery\\src\\main\\resources\\c3p-files\\mercado-delivery.xml");
//		// String string =
//		// "C:\\cyg\\home\\robson\\repos\\c3pgen\\in\\handoverTaxi\\HandoverTaxi.xml";
//		String string = "G:\\cyg\\home\\robso\\repos\\c3pgen\\in\\handoverTaxi\\HandoverTaxi.xml";
//		File source = new File(string);
//		DBModel example = null;
//		try {
//			example = serializer.read(DBModel.class, source);
//		} catch (Exception e) {
//
//			e.printStackTrace();
//		}
//		Collection<Table> tables = example.getMetadata().getTables();
//		
//
//			for (final Table table : tables) {
//
//				if (table.getName().equals("fornecedor")) {
//					System.out.println();
//				}
//				String nomeDaClasse = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCaseOnly(table.getName()));
//				ApplicationEntity applicationEntity = new ApplicationEntity(nomeDaClasse, table.getName());
//
//				fileLines.add("- name: " + nomeDaClasse);
//				fileLines.add("  hasOwner: false ");
//				fileLines.add("  displayName: " + Util.firstUpperCaseOnly(table.getName()));
//				fileLines.add("  tableName: " + table.getName().toUpperCase());
//				fileLines.add("  attributes:                     ");
//				Collection<Column> colunas = table.getColumns();
//
//				List<Column> relations = new ArrayList<Column>();
//
//				for (Column column : colunas) {
//					if (!column.isPartOfPrimaryKey() && !column.isPartOfForeignKey()) {
//
//						String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, column.getName()));
//						String tableFieldName = column.getName().toUpperCase();
//						String displayName = column.getName();
//						Boolean required = !column.isNullable();
//						Boolean unique = column.isPartOfUniqueIndex();
//						String className = Util.getEquivalentClassName(column.getColumnDataType());
//
//						fileLines.add("  - name: " + name);
//						fileLines.add("    tableFieldName: " + tableFieldName);
//						fileLines.add("    displayName: " + displayName);
//						fileLines.add("    type: ");
//						fileLines.add("      className: " + className);
//
//						applicationEntity.addAttributes(new Attribute(name, tableFieldName, required, unique, true, AttributeType.byName(className)));
//
//					}
//					if (column.isPartOfForeignKey()) {
//						relations.add(column);
//					}
//				}
//				fileLines.add("  relationships:                     ");
//				Collection<ForeignKey> foreignKeys = table.getExportedForeignKeys();
//				for (ForeignKey foreignKey : foreignKeys) {
//
//					String targetTableName = foreignKey.getColumnReferences().get(0).getForeignKeyColumn().getParent().getName();
//
//					String ownerName = Util.firstLowerCase(nomeDaClasse);
//					String model = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, targetTableName);
//					String displayName = Util.firstUpperCase(targetTableName);
//
//					String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, targetTableName)) + "s";
//
//					String sourceRelModel = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, table.getName());
//
//					String sourceRelName = Util.firstLowerCase(sourceRelModel);
//
//					fileLines.add("  - name: " + name);
//					fileLines.add("    type: OneToMany");
//					fileLines.add("    ownerName: " + ownerName);
//					fileLines.add("    model: " + model + "                       ");
//					fileLines.add("    displayName: " + displayName + "                       ");
//
//					// ---->>
//					Relationship relationshipTarget = new Relationship(name, displayName, "OneToMany", ownerName, model, false, ViewApproach.multiselectInstance());
//					relationshipTarget.setEntity(applicationEntity);
//
//					// <<------
//					Relationship relationshipSource = new Relationship(sourceRelName, Util.firstUpperCase(sourceRelName), "ManyToOne", null, sourceRelModel, false, ViewApproach.modalInstance("id", "nome"));
//				
//					relationshipSource.setEntity(new ApplicationEntity(sourceRelModel, table.getName()));
//
//					ApplicationRelationship appRel = new ApplicationRelationship();
//					appRel.setSource(relationshipSource);
//					appRel.setTarget(relationshipTarget);
//
//					applicationRelationships.add(appRel);
//				}
//				for (final Column column : relations) {
//					String tableName = column.getReferencedColumn().getParent().getName();
//
//					String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));
//					String model = Util.firstUpperCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));
//
//					String relName = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, table.getName()));
//					String displayName = Util.firstUpperCase(tableName);
//
//					fileLines.add("  - name: " + name + "     ");
//					fileLines.add("    type: ManyToOne");
//					fileLines.add("    model: " + model + "                       ");
//					fileLines.add("    displayName: " + displayName + "                       ");
//					fileLines.add("    viewApproach:   ");
//					fileLines.add("      type: modal ");
//					fileLines.add("      hiddenField: id ");
//					fileLines.add("      textField: nome ");
//					// <<------
//					Relationship relationshipTarget = new Relationship(name, displayName, "ManyToOne", null, model, false, ViewApproach.modalInstance("id", "nome"));
//					relationshipTarget.setEntity(applicationEntity);
//
//					// ---->>
//					Relationship relationshipSource = new Relationship(relName + "s", Util.firstUpperCase(relName + "s"), "OneToMany", Util.firstLowerCase(relName), Util.firstUpperCase(relName), false, ViewApproach.multiselectInstance());
//					relationshipSource.setEntity(new ApplicationEntity(relName, table.getName()));
//
//					ApplicationRelationship appRel = new ApplicationRelationship();
//					appRel.setSource(relationshipSource);
//					appRel.setTarget(relationshipTarget);
//
//					applicationRelationships.add(appRel);
//
//				}
//
//				fileLines.clear();
//
//				application.addEntities(applicationEntity);
//				application.addAllApplicationRelationships(applicationRelationships);
//			}
//		}
//
//		return application;
//	}
//
//	private SchemaCrawlerOptions createCrawlerOptions(final DBImporterOptions options) {
//		SchemaCrawlerOptions crawlerOptions = new SchemaCrawlerOptions();
//
//		crawlerOptions.setSchemaInfoLevel(SchemaInfoLevelBuilder.standard());
//
//		crawlerOptions.setColumnInclusionRule(new InclusionRule() {
//
//			@Override
//			public boolean test(String columnName) {
//				for (String regex : options.getExcludeColumnNamePatterns()) {
//					String trimed = regex.trim();
//					if (columnName.matches(trimed)) {
//						return false;
//					}
//				}
//				return true;
//			}
//		});
//		crawlerOptions.setTableInclusionRule(new InclusionRule() {
//			@Override
//			public boolean test(String tableName) {
//				for (String regex : options.getExcludeTableNamePatterns()) {
//					String trimed = regex.trim();
//					if (tableName.matches(trimed)) {
//						return false;
//					}
//				}
//				return true;
//			}
//		});
//
//		crawlerOptions.setSchemaInclusionRule(new InclusionRule() {
//			@Override
//			public boolean test(String schemaName) {
//				// System.out.println(t);
//				return options.getIncludeSchemaNames().contains(schemaName);
//			}
//		});
//
//		ArrayList<String> arrayList = new ArrayList<String>();
//		arrayList.add("TABLE");
//		crawlerOptions.setTableTypes(arrayList);
//
//		return crawlerOptions;
//	}
//
//	public static void main(String[] args) throws Exception {
//		DBDesignerImporterEntities db = new DBDesignerImporterEntities("jdbc:postgresql://localhost:5432/db_c3pgen", "postgres", "sints", "postgresql");
//		if (db.ping()) {
//			System.out.println("DBImporterEntities.main()");
//		}
//	}
//}
