package br.com.c3pgen.helper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import com.google.common.base.CaseFormat;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.ApplicationEntity;

public class MainDBDesign {

	public static void extractYaml(String[] args) throws FileNotFoundException, IOException {

	}

	public static void main(String[] args) throws FileNotFoundException, IOException {
		Serializer serializer = new Persister();
		List<String> fileLines = new ArrayList<String>();
		String folderOutput = Util.currentDir() + File.separator + "temp" + File.separator + System.currentTimeMillis() + "_generate_in";
		new File(folderOutput).mkdirs();
		// File source = new
		// File("C:\\cyg\\home\\robso\\repos\\mercadodelivery\\src\\main\\resources\\c3p-files\\mercado-delivery.xml");
//		String string = "C:\\cyg\\home\\robson\\repos\\c3pgen\\in\\qualidade\\.xml";

		String string = "C:\\cyg\\home\\robson\\repos\\c3pgen\\in\\aghos\\tratamento_odontologico.xml";

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
			fileLines.add("- name: " + nomeDaClasse);
			fileLines.add("  hasOwner: false ");
			fileLines.add("  displayName: " + Util.firstUpperCaseOnly(table.getTablename()).replaceAll("_", " "));
			fileLines.add("  tableName: GSH_" + table.getTablename().toUpperCase());
			fileLines.add("  attributes:                     ");

			ApplicationEntity applicationEntity = new ApplicationEntity(nomeDaClasse, nomeDaClasse);

			Collection<Column> colunas = table.getColumns();
			for (Column column : colunas) {
				if (column.isNotKey()) {
					fileLines.add("  - name: " + Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, column.getColName())));
					fileLines.add("    tableFieldName: " + column.getColName().toUpperCase());

					fileLines.add("    required: " + getRequired(column));
					fileLines.add("    showInPages: false");

					String maxLen = Util.getMaxLen(column.getDatatypeParams());

					if (StringUtils.isNotEmpty(maxLen)) {
						fileLines.add("    maxLen: " + maxLen);
						if (StringUtils.isNumeric(maxLen) && Integer.valueOf(maxLen) > 255) {
							fileLines.add("    viewApproach:                        ");
							fileLines.add("      type: textarea                  ");
						}
					}

					// fileLines.add(" displayName: " +
					// Util.firstUpperCaseOnly(column.getColName().toUpperCase()));
					fileLines.add("    displayName: " + Util.firstNotNullUpper(column.getComments(), column.getColName()).replaceAll("_", " "));
					fileLines.add("    type: ");
					fileLines.add("      className: " + column.getDataType().getDescricao());
					if (DataType.BIT.equals(column.getDataType()) || DataType.BIT.equals(column.getDataType())) {
						fileLines.add("    viewApproach: ");
						fileLines.add("      type: check");
					}
					if (DataType.DATE.equals(column.getDataType()) || DataType.DATE.equals(column.getDataType())) {
						fileLines.add("    dateFormat: DD/MM/YYYY              ");
						fileLines.add("    mask: 99/99/9999                    ");
						fileLines.add("    viewApproach:                        ");
						fileLines.add("      type: datepicker                  ");
					}
					if (DataType.DATETIME.equals(column.getDataType()) || DataType.DATETIME.equals(column.getDataType())) {
						fileLines.add("    dateFormat: DD/MM/YYYY HH:MM             ");
						fileLines.add("    mask: 99/99/9999 99:99                  ");
						fileLines.add("    viewApproach:                        ");
						fileLines.add("      type: datepicker                  ");
					}
//					System.out.println("MainDBDesign.main()" + Util.getMaxLen(column.getDatatypeParams()));
				}
			}
			fileLines.add("  relationships:                     ");
			// TODOS OS RELACIONAMENTOS DE PRODUTO QUE COMECAO EM PRODUTO
			for (RelationStart relStart : table.getRelationsStart()) {
				Relation byId = getById(relations, relStart.getId());
				String destTable = byId.getDestTable();
				String comments = byId.getComments();

				fileLines.add("  - name: " + Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstNotNullLower(comments, getTableById(tables, destTable).getTablename()) + "s")));
				fileLines.add("    type: OneToMany");
				fileLines.add("    ownerName: " + Util.firstLowerCase(nomeDaClasse));
				fileLines.add("    model: " + CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstUpperCase(getTableById(tables, destTable).getTablename())) + "                       ");
				fileLines.add("    displayName: " + Util.firstUpperCase(getTableById(tables, destTable).getTablename()).replaceAll("_", " "));
				// fileLines.add(" viewApproach: ");
				// fileLines.add(" type: multiselect ");

			}
			// TODOS OS RELACIONAMENTOS QUE TERMINAM EM PRODUTO
			for (RelationEnd relEnd : table.getRelationsEnd()) {
				Relation byId = getById(relations, relEnd.getId());
				String sourceTable = byId.getSrcTable();
				String destTable = byId.getDestTable();
				String relTipo = byId.getKind();
				String fields = byId.getFkFields();
				String name = byId.getRelationName();
				String direction = byId.getRelDirection();
				String comments = byId.getComments();
				String model = Util.firstUpperCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, getTableById(tables, sourceTable).getTablename()));

				fileLines.add("  - name: " + Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Util.firstNotNullLower(comments, getTableById(tables, sourceTable).getTablename()))) + "             ");
				fileLines.add("    type: ManyToOne");
				fileLines.add("    model: " + Util.firstUpperCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, getTableById(tables, sourceTable).getTablename())) + "                       ");
				fileLines.add("    displayName: " + Util.firstUpperCase(getTableById(tables, sourceTable).getTablename()).replaceAll("_", " "));
				fileLines.add("    viewApproach:   ");
				fileLines.add("      type: modal ");
				fileLines.add("      hiddenField: id ");
				fileLines.add("      textField: nome");

			}

			String fileOutput = folderOutput + File.separator + "APP_" + nomeDaClasse + ".yaml";

			IOUtils.writeLines(fileLines, null, new FileOutputStream(fileOutput));

			System.out.println("Gerado " + fileOutput);

			fileLines.clear();
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
