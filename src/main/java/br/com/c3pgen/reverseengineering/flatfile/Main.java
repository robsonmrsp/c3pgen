package br.com.c3pgen.reverseengineering.flatfile;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import com.google.common.base.CaseFormat;

import br.com.c3pgen.base.util.Util;

public class Main {

	public static void main(String[] args) {

		String fileName = "C:\\Users\\robson\\Desktop\\sigtap\\rl_procedimento_sia_sih_layout.txt";


	}

	private static Record getRecord(String fileName) {
		File layout = new File(fileName);
		Record record = new Record();
		try {
			String line;
			BufferedReader br = new BufferedReader(new FileReader(layout));

			while ((line = br.readLine()) != null) {
				// CO_PROCEDIMENTO,10,1,10,VARCHAR2
				String[] fields = line.split(",");
				if (line.indexOf("Coluna") != 0) {
					String[] field = line.split(",");
					record.addField(Util.firstLowerCase(CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, fields[0])), Util.getEquivalentClassName(fields[4], false), fields[2], fields[1]);
				}
			}
			System.out.println("Main.main()" + record);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return record;
	}

}
