package br.com.c3pgen.reverseengineering;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import com.google.common.base.CaseFormat;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.helper.Column;
import br.com.c3pgen.helper.DBModel;
import br.com.c3pgen.helper.DataType;
import br.com.c3pgen.helper.Relation;
import br.com.c3pgen.helper.RelationEnd;
import br.com.c3pgen.helper.RelationStart;
import br.com.c3pgen.helper.Table;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.ViewApproach;

public class DBDesignerImporter {

	public static Application extractApplication(File xmlSource) throws FileNotFoundException, IOException {
		Application application = new Application();
		HashSet<ApplicationRelationship> applicationRelationships = new HashSet<ApplicationRelationship>();
		Serializer serializer = new Persister();

		// List<String> fileLines = new ArrayList<String>();
		// String folderOutput = Util.currentDir() + File.separator + "temp" +
		// File.separator + System.currentTimeMillis() + "_generate_in";
		// new File(folderOutput).mkdirs();
		// File source = new
		// File("C:\\cyg\\home\\robso\\repos\\mercadodelivery\\src\\main\\resources\\c3p-files\\mercado-delivery.xml");
		// String string =
		// "C:\\cyg\\home\\robson\\repos\\c3pgen\\in\\handoverTaxi\\HandoverTaxi.xml";
		// String string =
		// "G:\\cyg\\home\\robso\\repos\\c3pgen\\in\\handoverTaxi\\HandoverTaxi.xml";

		DBModel example = null;
		try {
			example = serializer.read(DBModel.class, xmlSource);
		} catch (Exception e) {

			e.printStackTrace();
		}

		Collection<Table> tables = example.getMetadata().getTables();

		ArrayList<Relation> relations = new ArrayList<>(example.getMetadata().getRelations());

		for (Table table : tables) {
			String nomeDaClasse = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCaseOnly(table.getTablename()));
			String tableName = table.getTablename().toUpperCase();

			ApplicationEntity applicationEntity = new ApplicationEntity(nomeDaClasse, nomeDaClasse);

			Collection<Column> colunas = table.getColumns();
			for (Column column : colunas) {
				if (column.isNotKey()) {
					String attributeName = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, column.getColName()));
					String dataBaseFieldName = column.getColName().toUpperCase();
					String maxLen = Util.getMaxLen(column.getDatatypeParams());
					String required = getRequired(column);
					String dataTypeClassName = column.getDataType().getDescricao();

					Attribute attribute = new Attribute(attributeName, dataBaseFieldName, new Boolean(required), false, true, new AttributeType(dataTypeClassName));

					if (StringUtils.isNotEmpty(maxLen)) {
						attribute.setMaxLen(Integer.valueOf(maxLen));
						if (StringUtils.isNumeric(maxLen) && Integer.valueOf(maxLen) > 255) {
							attribute.setViewApproach(ViewApproach.textarea());
						}
					}
					if (DataType.BIT.equals(column.getDataType()) || DataType.BIT.equals(column.getDataType())) {
						attribute.setViewApproach(ViewApproach.check());
					}
					if (DataType.DATE.equals(column.getDataType()) || DataType.DATE.equals(column.getDataType())) {
						attribute.setDateFormat("DD/MM/YYYY");
						attribute.setMask("99/99/9999");
						attribute.setViewApproach(ViewApproach.datepicker());
					}
					if (DataType.DATETIME.equals(column.getDataType()) || DataType.DATETIME.equals(column.getDataType())) {
						attribute.setDateFormat("DD/MM/YYYY HH:MM");
						attribute.setMask("99/99/9999 99:99");
						attribute.setViewApproach(ViewApproach.datepicker());
					}

					applicationEntity.addAttributes(attribute);
				}
			}
			// TODOS OS RELACIONAMENTOS DE PRODUTO QUE COMECAO EM PRODUTO
			for (RelationStart relStart : table.getRelationsStart()) {
				Relation byId = getById(relations, relStart.getId());

				String destTable = byId.getDestTable();
				String comments = byId.getComments();
				///

				String relationName = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstNotNullLower(comments, getTableById(tables, destTable).getTablename()) + "s"));
				String ownerName = Util.firstLowerCase(nomeDaClasse);
				String modelName = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCase(getTableById(tables, destTable).getTablename())) + "                       ";
				String displayName = Util.firstUpperCase(getTableById(tables, destTable).getTablename()).replaceAll("_", " ");

				String sourceRelModel = CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName);
				String sourceRelName = Util.firstLowerCase(sourceRelModel);

				Relationship relationshipTarget = new Relationship(relationName, displayName, "OneToMany", ownerName, modelName, false, ViewApproach.multiselectInstance());
				relationshipTarget.setEntity(applicationEntity);

				// <<------
				Relationship relationshipSource = new Relationship(Util.firstLowerCase(nomeDaClasse), Util.firstUpperCase(sourceRelName), "ManyToOne", null, sourceRelModel, false, ViewApproach.modalInstance("id", "nome"));

				relationshipSource.setEntity(new ApplicationEntity(nomeDaClasse, tableName));

				ApplicationRelationship appRel = new ApplicationRelationship();
				appRel.setSource(relationshipSource);
				appRel.setTarget(relationshipTarget);

				System.out.println("DBDesignerImporter.extractApplication() 1-> " + appRel);
				applicationRelationships.add(appRel);

			}
			// TODOS OS RELACIONAMENTOS QUE TERMINAM EM PRODUTO
			for (RelationEnd relEnd : table.getRelationsEnd()) {
				Relation byId = getById(relations, relEnd.getId());

//				System.out.println("SrcTable  " + getTableById(tables, byId.getSrcTable()));

				// String name = byId.getRelationName();
				String name = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));

				// String modelName =
				// CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL,
				// Util.firstUpperCase(getTableById(tables,
				// destTable).getTablename())) + " ";
				// String displayName = Util.firstUpperCase(getTableById(tables,
				// destTable).getTablename()).replaceAll("_", " ");

				String relName = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, getTableById(tables, byId.getSrcTable()).getTablename()));
				String displayName = Util.firstUpperCase(tableName);
				String model = Util.firstUpperCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));

				Relationship relationshipSource = new Relationship(name+ "s", displayName, "ManyToOne", null, model, false, ViewApproach.modalInstance("id", "nome"));
				relationshipSource.setEntity(applicationEntity);

				// ---->>
				Relationship relationshipTarget = new Relationship(relName, Util.firstUpperCase(relName), "OneToMany", Util.firstLowerCase(name+ "s"), Util.firstUpperCase(relName), false, ViewApproach.multiselectInstance());
				relationshipTarget.setEntity(new ApplicationEntity(relName, tableName));

				ApplicationRelationship appRel = new ApplicationRelationship();
				appRel.setSource(relationshipSource);
				appRel.setTarget(relationshipTarget);

				System.out.println("DBDesignerImporter.extractApplication() 2- >" + appRel);
				applicationRelationships.add(appRel);

			}

			application.addEntities(applicationEntity);
			application.addAllApplicationRelationships(applicationRelationships);
		}
		return application;
	}

	private static String getRequired(Column column) {
		return column.getNotNull().equals("1") ? "true" : "false";
	}

	static Relation getById(Collection<Relation> relations, String id) {
		for (Relation relation : relations) {
			if (relation.getId().equalsIgnoreCase(id))
				return relation;
		}
		return null;
	}

	static Table getTableById(Collection<Table> tabelas, String id) {
		for (Table tabela : tabelas) {
			if (tabela.getId().equalsIgnoreCase(id))
				return tabela;
		}
		Thread t = new Thread();
		return null;

	}

}
