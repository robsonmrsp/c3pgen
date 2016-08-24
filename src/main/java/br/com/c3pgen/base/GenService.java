package br.com.c3pgen.base;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import br.com.c3pgen.model.ApplicationRelationship;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.model.Modulo;
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
		user.addRelationships(new Relationship("roles", "", "ManyToMany", null, "Role", false, ViewApproach.multiselectInstance()));

		return user;
	}

	private ApplicationEntity role() {
		ApplicationEntity role = new ApplicationEntity("Role", "ROLE");

		role.addAttributes(new Attribute("authority", "AUTHORITY", true, true, true, AttributeType.STRING));
		role.addAttributes(new Attribute("description", "DESCRIPTION", true, true, true, AttributeType.STRING));
		role.addRelationships(new Relationship("users", "", "ManyToMany", "roles", "User", false, ViewApproach.multiselectInstance()));

		return role;
	}

	public GenerateFileInfo generate(Modulo modulo) throws Exception {

		Application newApplication = Util.getApplicationFrom(modulo);

		ApplicationValidator appValidator = new ApplicationValidator();

		FreeMarkerConfig freeMarkerConfig = new FreeMarkerConfig(newApplication);

		GenerateFileInfo fileInfo = new GenerateFileInfo();

		EntitiesGenerator entitiesGenerator = new EntitiesGenerator(freeMarkerConfig, newApplication);

		LOGGER.info("Validando arquivo de entidades...");
		ApplicationValidatorMessages validateMessages = appValidator.validate(newApplication);
		LOGGER.info("Finalizada a validação....");

		if (validateMessages.isEmpty()) {
			LOGGER.info("Gerando as entidades...");
			entitiesGenerator.generate();
			LOGGER.info("Concluida a geração da aplicação");

			String a = Util.currentDir() + File.separator + "out/" + newApplication.getAppName();
			String webPath = "out/" + newApplication.getAppName() + DateUtil.asString(LocalDateTime.now(), "_dd_MM_yyyy_HH_mm_ss") + ".zip";
			String zip = Util.currentDir() + File.separator + webPath;

			ZipUtils.zipFiles(Arrays.asList(new File(a)), new File(zip));
			fileInfo.setRealFilePath(zip);
			fileInfo.setStaticFilePath(webPath);
			fileInfo.setGenerateSuccess(true);

			// TODO ver uma forma mais elegante de fazer isso.
			new java.util.Timer().schedule(new java.util.TimerTask() {
				@Override
				public void run() {
					try {
						LOGGER.info("Removendo arquivos temporarios em " + a);
						FileUtils.deleteDirectory(new File(a));
					} catch (IOException e) {
						LOGGER.warn("Não foi possivel remover arquivos temporarios " + a, e);
					}
				}
			}, 5000);

		} else {
			fileInfo.setApplicationValidatorMessages(validateMessages);
		}

		return fileInfo;
	}

	public GenerateFileInfo generate(Application application) throws Exception {
		return generate(application, Boolean.FALSE);
	}

	public GenerateFileInfo generate(Application application, Boolean complete) throws Exception {

		Application newApplication = fixApplication(application);
		ApplicationValidator appValidator = new ApplicationValidator();

		// TODO melhorar essa infra no futuro!!!
		fixModules(newApplication);

		FreeMarkerConfig freeMarkerConfig = new FreeMarkerConfig(newApplication);
		GenerateFileInfo fileInfo = new GenerateFileInfo();

		// fix module-entities

		BaseAppGenerator appGenerator = new BaseAppGenerator(freeMarkerConfig, newApplication);

		EntitiesGenerator entitiesGenerator = new EntitiesGenerator(freeMarkerConfig, newApplication);

		LOGGER.info("Validando arquivo de entidades...");
		ApplicationValidatorMessages validateMessages = appValidator.validate(newApplication);
		LOGGER.info("Finalizada a validação....");

		if (validateMessages.isEmpty()) {
			if (complete) {
				LOGGER.info("Gerando a base da aplicação. Isso pode levar alguns segundos...");
				appGenerator.generate();
				LOGGER.info("Finalizada a geração básica....");
			}
			LOGGER.info("Gerando as entidades...");
			entitiesGenerator.generate();
			LOGGER.info("Concluida a geração da aplicação");

			if (newApplication.hasMobApp()) {
				appGenerator.generateMobile();
				LOGGER.info("Finalizada a geração básica....");
				entitiesGenerator.generateMobile();

				LOGGER.info("Concluida a geração da aplicação");
			}
			String a = Util.currentDir() + File.separator + "out/" + newApplication.getAppName();
			String webPath = "out/" + newApplication.getAppName() + DateUtil.asString(LocalDateTime.now(), "_dd_MM_yyyy_HH_mm_ss") + ".zip";
			String zip = Util.currentDir() + File.separator + webPath;

			ZipUtils.zipFiles(Arrays.asList(new File(a)), new File(zip));
			fileInfo.setRealFilePath(zip);
			fileInfo.setStaticFilePath(webPath);
			fileInfo.setGenerateSuccess(true);

			// TODO ver uma forma mais elegante de fazer isso.
			new java.util.Timer().schedule(new java.util.TimerTask() {
				@Override
				public void run() {
					try {
						LOGGER.info("Removendo arquivos temporarios em " + a);
						FileUtils.deleteDirectory(new File(a));
					} catch (IOException e) {
						LOGGER.warn("Não foi possivel remover arquivos temporarios " + a, e);
					}
				}
			}, 5000);

		} else {
			fileInfo.setApplicationValidatorMessages(validateMessages);
		}

		return fileInfo;
	}

	private Application fixApplication(Application oldApplication) {

		List<ApplicationEntity> entities = oldApplication.getEntities();
		for (ApplicationEntity applicationEntity : entities) {
			applicationEntity.setRelationships(null);
			applicationEntity.setRelationships(getNewRelations(applicationEntity, oldApplication.getApplicationRelationships()));
		}

		return oldApplication;
	}

	private List<Relationship> getNewRelations(ApplicationEntity applicationEntity, Set<ApplicationRelationship> applicationRelationships) {
		List<Relationship> relationships = new ArrayList<Relationship>();

		for (ApplicationRelationship applicationRelationship : applicationRelationships) {

			Relationship source = applicationRelationship.getSource();
			Relationship target = applicationRelationship.getTarget();

			if (source != null && source.getEntity() != null && source.getEntity().equals(applicationEntity)) {
				relationships.add(source);
			}

			if (target != null && target.getEntity() != null && target.getEntity().equals(applicationEntity)) {
				relationships.add(target);
			}

		}

		return relationships;
	}

	// TODO guardar a ideia para fazer os módulos a parte
	public Boolean fixModules(Application application) {
		application.addEntities(user());
		application.addEntities(role());

		return Boolean.TRUE;
	}

}
