package br.com.c3pgen.helper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import com.google.common.base.CaseFormat;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.ViewApproach;

public class MainDBDesign2 {

	public static void extractYaml(String[] args) throws FileNotFoundException, IOException {

	}

	public static void main(String[] args) throws FileNotFoundException, IOException {
		Application application = new Application();
		HashSet<ApplicationRelationship> applicationRelationships = new HashSet<ApplicationRelationship>();
		Serializer serializer = new Persister();
		List<String> fileLines = new ArrayList<String>();
		String folderOutput = Util.currentDir() + File.separator + "temp" + File.separator + System.currentTimeMillis() + "_generate_in";
		new File(folderOutput).mkdirs();
		// File source = new
		// File("C:\\cyg\\home\\robso\\repos\\mercadodelivery\\src\\main\\resources\\c3p-files\\mercado-delivery.xml");
		// String string =
		// "C:\\cyg\\home\\robson\\repos\\c3pgen\\in\\handoverTaxi\\HandoverTaxi.xml";
		String string = "G:\\cyg\\home\\robso\\repos\\c3pgen\\in\\handoverTaxi\\HandoverTaxi.xml";
		File source = new File(string);
		DBModel example = null;
		try {
			example = serializer.read(DBModel.class, source);
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

					Attribute attribute = new Attribute(attributeName,attributeName, dataBaseFieldName, new Boolean(required), false, true, new AttributeType(dataTypeClassName));

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
			fileLines.add("  relationships:                     ");
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

				Relationship relationshipTarget = new Relationship(relationName, displayName, "OneToMany", ownerName, modelName, false, ViewApproach.noneInstance());
//				relationshipTarget.setEntity(applicationEntity);

				// <<------
				Relationship relationshipSource = new Relationship(Util.firstLowerCase(nomeDaClasse), Util.firstUpperCase(sourceRelName), "ManyToOne", null, sourceRelModel, false, ViewApproach.modalInstance("id", "nome"));

//				relationshipSource.setEntity(new ApplicationEntity(nomeDaClasse, tableName));

				ApplicationRelationship appRel = new ApplicationRelationship();
				appRel.setSource(relationshipSource);
				appRel.setTarget(relationshipTarget);

				applicationRelationships.add(appRel);

			}
			// TODOS OS RELACIONAMENTOS QUE TERMINAM EM PRODUTO
			for (RelationEnd relEnd : table.getRelationsEnd()) {
				Relation byId = getById(relations, relEnd.getId());

				String name = byId.getRelationName();

				String relName = Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));
				String displayName = Util.firstUpperCase(tableName);
				String model = Util.firstUpperCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, tableName));

				Relationship relationshipTarget = new Relationship(name, displayName, "ManyToOne", null, model, false, ViewApproach.modalInstance("id", "nome"));
//				relationshipTarget.setEntity(applicationEntity);

				// ---->>
				Relationship relationshipSource = new Relationship(relName + "s", Util.firstUpperCase(relName + "s"), "OneToMany", Util.firstLowerCase(relName), Util.firstUpperCase(relName), false, ViewApproach.noneInstance());
//				relationshipSource.setEntity(new ApplicationEntity(relName, tableName));

				ApplicationRelationship appRel = new ApplicationRelationship();
				appRel.setSource(relationshipSource);
				appRel.setTarget(relationshipTarget);

				applicationRelationships.add(appRel);

			}

			application.addEntities(applicationEntity);
//			application.addAllApplicationRelationships(applicationRelationships);
		}

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
		return null;
	}

}
