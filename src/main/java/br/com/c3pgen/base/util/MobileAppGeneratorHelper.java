package br.com.c3pgen.base.util;

import java.io.File;
import java.io.IOException;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.ExecuteException;

import br.com.c3pgen.model.Application;

public class MobileAppGeneratorHelper {

	public static void criaMobApp(String rootFolder, Application application) {

		CommandLine cmd0 = new CommandLine("cd " + rootFolder);
		CommandLine cmd1 = new CommandLine("cordova create mob" + application.getName() + " " + application.getRootPackage() + " MobApp" + application.getName());
		CommandLine cmd2 = new CommandLine("cd mob" + application.getName());
		CommandLine cmd3 = new CommandLine("cordova platform add android");

		DefaultExecutor executor = new DefaultExecutor();
		File file = new File("teste");
		file.mkdir();
		if (file.exists() && file.isDirectory()) {
			// executor.setWorkingDirectory(new File(rootFolder));
			try {
				// executor.execute(cmd0);
				executor.execute(cmd1);
				executor.execute(cmd2);
				executor.execute(cmd3);

			} catch (ExecuteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	// cordova create hello com.example.hello HelloWorld
	// $ cd hello
	// $ cordova platform add android
}
