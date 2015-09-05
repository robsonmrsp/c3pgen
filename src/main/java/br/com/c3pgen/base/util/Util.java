package br.com.c3pgen.base.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

import org.apache.commons.io.FileUtils;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.TheEntity;

import com.esotericsoftware.yamlbeans.YamlReader;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Util {
	public static String currentDir() {
		return Paths.get("").toAbsolutePath().toString();
	}

	public static String firstLowerCase(String verb) {
		return verb.substring(0, 1).toLowerCase() + verb.substring(1);
	}

	public static String firstUpperCase(String verb) {
		String firstChar = "";
		try {
			firstChar = verb.substring(0, 1).toUpperCase() + verb.substring(1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return firstChar;
	}

	public static String getFullFileName(String pack, String subfolder, String fileName) {
		return currentDir() + File.separator + "out" + File.separator + pack.replace(".", File.separator) + File.separator + subfolder + File.separator + fileName;
	}

	public static TheEntity getTheEntity_() {
		ObjectMapper mapper = new ObjectMapper();
		TheEntity user = null;
		try {
			user = mapper.readValue(new File(currentDir() + File.separator + "conf" + File.separator + "entities.js"), TheEntity.class);
			System.out.println("Main.main()" + user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	public static Application getApplicationFromFolder(String folderName) {

		File configFile = createFile(folderName);

		YamlReader reader;
		Application entities = null;
		try {
			reader = new YamlReader(new FileReader(configFile));

			reader.getConfig().setPropertyElementType(Application.class, "entities", TheEntity.class);
			reader.getConfig().setPropertyElementType(TheEntity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(TheEntity.class, "relationships", Relationship.class);

			entities = reader.read(Application.class);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return entities;
	}

	public static Application getApplicationFromFile(String configFileName) {
		YamlReader reader;
		Application entities = null;
		try {
			reader = new YamlReader(new FileReader(currentDir() + File.separator + "conf" + File.separator + configFileName));

			reader.getConfig().setPropertyElementType(Application.class, "entities", TheEntity.class);
			reader.getConfig().setPropertyElementType(TheEntity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(TheEntity.class, "relationships", Relationship.class);

			entities = reader.read(Application.class);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return entities;
	}

	private static File createFile(String appName) {
		File folderIn = new File(currentDir() + File.separator + "in" + File.separator + appName);
		File fileConfig = new File(currentDir() + File.separator + "in" + File.separator + appName + File.separator + "config.yaml");

		File destFile = new File(currentDir() + File.separator + "conf" + File.separator + appName + ".yaml");

		try {
			FileWriter destFileWriter = new FileWriter(destFile, true);

			if (fileConfig.exists()) {
				FileUtils.copyFile(fileConfig, destFile);
				destFileWriter.write("\n");
				destFileWriter.write("entities:");
				destFileWriter.close();
			}

			if (folderIn.isDirectory()) {
				for (File f : folderIn.listFiles()) {
					if (!f.getName().equals("config.yaml") && f.getName().endsWith("yaml")) {
						copyFile(destFile, f);
					}
				}
				try {
					// copyFile(destFile, new File(currentDir() +
					// "/src/main/resources/core.yaml"));
				} catch (Exception e) {
					System.out.println("Não gerado CORE do sistema");
				}
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return destFile;
	}

	private static void copyFile(File destFile, File appendFile) throws IOException {
		FileWriter destFileWriter = null;
		BufferedReader reader = null;
		try {

			destFileWriter = new FileWriter(destFile, true);
			reader = new BufferedReader(new FileReader(appendFile));
			String line = reader.readLine();
			while (line != null) {
				destFileWriter.write("\n");
				destFileWriter.write(line);
				line = reader.readLine();
			}
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			try {
				destFileWriter.close();
				reader.close();
				destFileWriter = null;
				reader = null;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	public static List<TheEntity> getTheEntity() {
		YamlReader reader;
		List<TheEntity> entities = null;
		try {
			reader = new YamlReader(new FileReader(currentDir() + File.separator + "conf" + File.separator + "entities.yaml"));

			reader.getConfig().setPropertyElementType(TheEntity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(TheEntity.class, "relationships", Relationship.class);

			entities = reader.read(List.class, TheEntity.class);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return entities;
	}
}
