package br.com.c3pgen.base;

import java.io.File;
import java.util.Arrays;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.ViewApproach;
import br.com.c3pgen.utils.DateUtil;
import br.com.c3pgen.utils.ZipUtils;

public class GenService {
	private static final Logger LOGGER = Logger.getLogger(GenService.class);

	public GenService() {

	}

	public ApplicationValidatorMessages Validate(Application application) throws Exception {
		ApplicationValidator appValidator = new ApplicationValidator();
		GenerateFileInfo fileInfo = new GenerateFileInfo();
		LOGGER.info("Validando arquivo de entidades...");

		ApplicationValidatorMessages validateMessages = appValidator.validate(application);
		LOGGER.info("Finalizada a validação....");

		return validateMessages;
	}

	private ApplicationEntity user() {
		ApplicationEntity user = new ApplicationEntity("User", "APP_USER");

		user.addAttributes(new Attribute("name", "NAME", true, true, true, AttributeType.STRING));
		user.addAttributes(new Attribute("username", "username", true, true, true, AttributeType.STRING));
		user.addAttributes(new Attribute("password", "password", true, false, false, AttributeType.STRING));
		user.addAttributes(new Attribute("enable", "enable", false, false, false, AttributeType.BOOLEAN));
		user.addAttributes(new Attribute("image", "image", false, false, false, AttributeType.STRING));
		user.addRelationships(new Relationship("roles", Relationship.Types.ManyToMany, null, "Role", false, ViewApproach.multiselectInstance()));

		return user;
	}

	private ApplicationEntity role() {
		ApplicationEntity role = new ApplicationEntity("Role", "ROLE");

		role.addAttributes(new Attribute("authority", "AUTHORITY", true, true, true, AttributeType.STRING));
		role.addAttributes(new Attribute("description", "DESCRIPTION", true, true, true, AttributeType.STRING));
		role.addRelationships(new Relationship("users", Relationship.Types.ManyToMany, "roles", "User", false, ViewApproach.multiselectInstance()));

		return role;
	}

	public GenerateFileInfo generate(Application application) throws Exception {

		ApplicationValidator appValidator = new ApplicationValidator();

		// TODO melhorar essa infra no futuro!!!
		fixModules(application);

		FreeMarkerConfig freeMarkerConfig = new FreeMarkerConfig(application);
		GenerateFileInfo fileInfo = new GenerateFileInfo();

		// fix module-entities

		BaseAppGenerator appGenerator = new BaseAppGenerator(freeMarkerConfig, application);

		EntitiesGenerator entitiesGenerator = new EntitiesGenerator(freeMarkerConfig, application);

		LOGGER.info("Validando arquivo de entidades...");
		ApplicationValidatorMessages validateMessages = appValidator.validate(application);
		LOGGER.info("Finalizada a validação....");

		if (validateMessages.isEmpty()) {
			LOGGER.info("Gerando a base da aplicação. Isso pode levar alguns segundos...");
			appGenerator.generate();
			LOGGER.info("Finalizada a geração básica....");
			entitiesGenerator.generate();
			LOGGER.info("Concluida a geração da aplicação");

			if (application.hasMobApp()) {
				appGenerator.generateMobile();
				LOGGER.info("Finalizada a geração básica....");
				entitiesGenerator.generateMobile();

				LOGGER.info("Concluida a geração da aplicação");
			}
			String a = Util.currentDir() + File.separator + "out/" + application.getAppName();
			String webPath = "out/" + application.getAppName() + DateUtil.asString(LocalDateTime.now(), "_dd_MM_yyyy_HH_mm_ss") + ".zip";
			String zip = Util.currentDir() + File.separator + webPath;

			ZipUtils.zipFiles(Arrays.asList(new File(a)), new File(zip));
			fileInfo.setRealFilePath(zip);
			fileInfo.setStaticFilePath(webPath);
			fileInfo.setGenerateSuccess(true);

		} else {
			fileInfo.setApplicationValidatorMessages(validateMessages);
		}

		return fileInfo;
	}

	public Boolean fixModules(Application application) {
		application.addEntities(user());
		application.addEntities(role());

		return Boolean.TRUE;
	}
}
