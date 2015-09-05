package com.mr.codegenerator.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.codehaus.jackson.map.ObjectMapper;

import com.esotericsoftware.yamlbeans.YamlReader;
import com.mr.codegenerator.entities.Application;
import com.mr.codegenerator.entities.Attribute;
import com.mr.codegenerator.entities.Entity;
import com.mr.codegenerator.entities.Relationship;

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

	public static Entity getEntity_() {
		ObjectMapper mapper = new ObjectMapper();
		Entity user = null;
		try {
			user = mapper.readValue(new File(currentDir() + File.separator + "conf" + File.separator + "entities.js"), Entity.class);
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

			reader.getConfig().setPropertyElementType(Application.class, "entities", Entity.class);
			reader.getConfig().setPropertyElementType(Entity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(Entity.class, "relationships", Relationship.class);

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

			reader.getConfig().setPropertyElementType(Application.class, "entities", Entity.class);
			reader.getConfig().setPropertyElementType(Entity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(Entity.class, "relationships", Relationship.class);

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
					//copyFile(destFile, new File(currentDir() + "/src/main/resources/core.yaml"));
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

	public static List<Entity> getEntity() {
		YamlReader reader;
		List<Entity> entities = null;
		try {
			reader = new YamlReader(new FileReader(currentDir() + File.separator + "conf" + File.separator + "entities.yaml"));

			reader.getConfig().setPropertyElementType(Entity.class, "attributes", Attribute.class);
			reader.getConfig().setPropertyElementType(Entity.class, "relationships", Relationship.class);

			entities = reader.read(List.class, Entity.class);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return entities;
	}
}
