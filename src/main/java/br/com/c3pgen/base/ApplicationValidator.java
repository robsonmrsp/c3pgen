package br.com.c3pgen.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.ViewApproach;
import br.com.c3pgen.model.ApplicationEntity;

public class ApplicationValidator {
	public static final Logger LOGGER = Logger.getLogger(ApplicationValidator.class);

	private Map<String, ApplicationEntity> mapEntities = new HashMap<String, ApplicationEntity>();

	private Map<ApplicationEntity, List<ApplicationEntity>> mapRelationshipsPerTheEntity = new HashMap<ApplicationEntity, List<ApplicationEntity>>();
	private Map<ApplicationEntity, List<Relationship>> mapRelationships = new HashMap<ApplicationEntity, List<Relationship>>();

	public ApplicationValidatorMessages validate(Application application) throws ValidationException {
		ApplicationValidatorMessages applicationValidatorMessages = new ApplicationValidatorMessages();
		Boolean returnValue = false;
		// Guardando as entidades do sistema
		for (ApplicationEntity entity : application.getEntities()) {
			mapEntities.put(entity.getName(), entity);
		}

		// Guardando os relacionamentos de cada entidade
		for (ApplicationEntity entity : application.getEntities()) {
			List<ApplicationEntity> entities = new ArrayList<ApplicationEntity>();
			List<Relationship> relationships = new ArrayList<Relationship>();

			for (Relationship relation : entity.getRelationships()) {
				entities.add(mapEntities.get(relation.getModel()));
				relationships.add(relation);
			}
			mapRelationshipsPerTheEntity.put(entity, entities);
			mapRelationships.put(entity, relationships);
		}

		//
		for (ApplicationEntity entity : application.getEntities()) {

			ApplicationEntity entityRel = null;
			List<ApplicationEntity> listRelations = mapRelationshipsPerTheEntity.get(entity);

			for (Relationship main : entity.getRelationships()) {
				if (main.getViewApproach() != null && (main.getViewApproach().getType().equals("modal") || main.getViewApproach().getType().equals("multiselect") || main.getViewApproach().getType().equals("combo"))) {

					ApplicationEntity ent = mapEntities.get(main.getModel());

					if (main.getViewApproach().getTextField() == null) {
						applicationValidatorMessages.addMessage("Na entidade " + entity.getName() + ", no relacionamento " + main.getName() + " voce precisa definir um atributo de " + main.getModel() + " para exibir no campo de texto do modal");
					} else if (!Util.entityContainsAttribute(ent, main.getViewApproach().getTextField())) {
						applicationValidatorMessages.addMessage("Na entidade " + entity.getName() + ", no relacionamento " + main.getName() + " voce precisa definir um atributo de " + main.getModel() + " para exibir no campo de texto do modal. "
								+ main.getViewApproach().getTextField() + " Não é tributo de " + main.getModel());
					}
				}
			}
			for (Relationship main : entity.getRelationships()) {
				entityRel = mapEntities.get(main.getModel());

				Relationship reverse = reverseRelation(entity, entityRel);

				if (reverse != null) {
					if (StringUtils.isNotEmpty(main.getOwnerName()) && StringUtils.isNotEmpty(reverse.getOwnerName()) && !(entity.equals(entityRel))) {
						applicationValidatorMessages
								.addMessage("No Relacionamento (" + entity.getName() + "/" + main.getName() + ") entre: " + entity.getName() + " e " + entityRel.getName() + " Voce deve definir APENAS uma das partes do relacionamento como \"O Dono\" do relacionamento.");
					}
					if (!main.getUniDirecional() && StringUtils.isEmpty(main.getOwnerName()) && StringUtils.isEmpty(reverse.getOwnerName())) {
						applicationValidatorMessages.addMessage("No Relacionamento (" + entity.getName() + "/" + main.getName() + ")  entre: " + entity.getName() + " e " + entityRel.getName() + " Voce deve definir \"O Dono\" do relacionamento. OU definir no relacionamento "
								+ main.getName() + "uniDirecional: true|Yes");
					}
				}
			}

			for (Relationship main : entity.getRelationships()) {
				String ownerName = main.getOwnerName();
				ApplicationEntity entityModel = mapEntities.get(main.getModel());
				try {
					if (entityModel == null) {
						applicationValidatorMessages.addMessage("Erro analizando o relacionamento " + main.getName() + " na entidade " + entity.getName() + ". Não existe a entidade " + main.getModel());
					}
					if (StringUtils.isNotEmpty(ownerName)) {
						Boolean ownerNotFound = true;

						for (Relationship attr : entityModel.getRelationships()) {
							if (attr.getName().equals(ownerName)) {
								ownerNotFound = false;
							}
						}
						if (ownerNotFound) {
							applicationValidatorMessages.addMessage("Erro analizando a entidade " + entityModel + " : Não existe o atributo/relacionamento de nome \"" + main.getOwnerName() + "\" na entidade \"" + entityModel
									+ "\". Verifique o valor de 'ownerName' no relacionamento de nome  \"" + main.getName() + "\" na entidade  \"" + entity + "\"");
						}
					}
				} catch (Exception e) {
					applicationValidatorMessages.addMessage("Erro analizando a entidade " + entityModel + "(modelName=" + main.getModel() + "): Não existe o atributo/relacionamento de nome \"" + main.getOwnerName() + "\" na entidade \"" + entityModel
							+ "\". Verifique o valor de 'ownerName' no relacionamento de nome  \"" + main.getName() + "\" na entidade  \"" + entity + "\"");

				}
			}
		}

		if (applicationValidatorMessages.isNotEmpty()) {
			LOGGER.warn("Encontrados os seguintes problemas...");
			for (String msg : applicationValidatorMessages.getMessages()) {
				LOGGER.warn(msg);
			}
			LOGGER.warn("A aplicação não será gerada...");
		}
		return applicationValidatorMessages;
	}

	private Relationship reverseRelation(ApplicationEntity main, ApplicationEntity reverse) {
		Relationship relationship = null;
		if (reverse != null)
			for (Relationship r : reverse.getRelationships()) {
				if (r.getModel().equals(main.getName())) {
					return r;
				}
			}
		return relationship;
	}
}
