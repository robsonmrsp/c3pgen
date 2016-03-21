package br.com.c3pgen.base.util;

import java.text.Normalizer;

public class Helper {

	public static void main(String[] args) {

		// String[] atributos =
		// "Código,Nome,Razão Social,CNPJ,E-mail,WebSite,Telefone , Fax, Contato".split(",");
		// String[] atributos =
		// "Descrição, Código, Data de Criação, Quantidade de Formulários, Produto, Cliente".split(",");
		// String[] atributos = "Nome, Descrição".split(",");
		// String[] atributos =
		// "Nome Completo, RG, CPF, Data De Nascimento,Telefone Fixo, Telefone Celular, E-Mail, Nome da Mae Ou Responsável , CPF Mae Ou Responsável, Pai ou Responsável, CPF Do Pai ou Responsável, Endereço, Bairro, Cidade, CEP,Turno, Grau, Série, Curso, Horário , Nome Da Escola, Endereço Da Escola, Bairro Da Escola, Cidade Da Escola, CEP Da Escola, Malote, imagem, foto".split(",");
		// String[] atributos =
		// "Nome Do Campo, px1,py1,px2,py2,ativo,".split(",");
		String[] atributos = "title, 	 description, 	 link, 	 author, 	 guid".split(",");		
		// String[] atributos =		// "Title,  Link,   Description,   Language,   Copyright,   PubDate,".split(",");

		for (String atributo : atributos) {
			System.out.println("  - name: " + Util.firstLowerCase(removeNonUnicodeCharAndSpaces(atributo)));
			System.out.println("    type:");
			System.out.println("      className: String");
			System.out.println("    displayName: " + atributo);

			System.out.println("");
		}

		String[] relacionamentos = "malote,usuario".split(",");

		for (String rel : relacionamentos) {
			System.out.println("    - name: " + rel);
			System.out.println("      type: ManyToOne");
			System.out.println("      model: " + Util.firstUpperCase(rel));
			System.out.println("      viewApproach:");
			System.out.println("         type: modal");
			System.out.println("         textField: nome");
			System.out.println("         hiddenField: id");
			System.out.println("      displayName: " + Util.firstUpperCase(rel));
			System.out.println("");
		}
//		String[] relacionamentosOneToMany = "malote,usuario,formulario,atividade,itemTemplateFormulario,itemTemplateArquivo".split(",");
		String[] relacionamentosOneToMany = "feedMessage".split(",");

		System.out.println("    relationships:");
		for (String rel : relacionamentosOneToMany) {

			System.out.println("    - name: " + rel + "s");
			System.out.println("      type: OneToMany");
			System.out.println("      ownerName: null");
			System.out.println("      uniDirecional: false");
			System.out.println("      model: " + Util.firstUpperCase(rel));
			System.out.println("      displayName: " + Util.firstUpperCase(rel) + "s");
			System.out.println("");
		}

	}

	public static String removeNonUnicodeCharAndSpaces(String input) {
		String localStr = input;
		localStr = Normalizer.normalize(localStr, Normalizer.Form.NFD);
		localStr = localStr.replaceAll("\\p{Space}", "").replaceAll("[^\\p{ASCII}]", "").replaceAll("\\.", "").replaceAll("-", "").replaceAll(":", "");
		return localStr;
	}
}