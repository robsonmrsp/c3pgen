package br.com.c3pgen.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.TheEntity;

public class ApplicationValidator {
	public static final Logger LOGGER = Logger.getLogger(ApplicationValidator.class);

	private Map<String, TheEntity> mapEntities = new HashMap<String, TheEntity>();

	private Map<TheEntity, List<TheEntity>> mapRelationshipsPerTheEntity = new HashMap<TheEntity, List<TheEntity>>();
	private Map<TheEntity, List<Relationship>> mapRelationships = new HashMap<TheEntity, List<Relationship>>();

	public ApplicationValidatorMessages validate(Application application) throws ValidationException {
		ApplicationValidatorMessages applicationValidatorMessages = new ApplicationValidatorMessages();
		Boolean returnValue = false;
		// Guardando as entidades do sistema
		for (TheEntity entity : application.getEntities()) {
			mapEntities.put(entity.getName(), entity);
		}

		// Guardando os relacionamentos de cada entidade
		for (TheEntity entity : application.getEntities()) {
			List<TheEntity> entities = new ArrayList<TheEntity>();
			List<Relationship> relationships = new ArrayList<Relationship>();

			for (Relationship relation : entity.getRelationships()) {
				entities.add(mapEntities.get(relation.getModel()));
				relationships.add(relation);
			}
			mapRelationshipsPerTheEntity.put(entity, entities);
			mapRelationships.put(entity, relationships);
		}

		//
		for (TheEntity entity : application.getEntities()) {

			TheEntity entityRel = null;
			List<TheEntity> listRelations = mapRelationshipsPerTheEntity.get(entity);

			for (Relationship main : entity.getRelationships()) {
				entityRel = mapEntities.get(main.getModel());

				Relationship reverse = reverseRelation(entity, entityRel);

				if (reverse != null) {
					// Verifica se NÃO foram definidos ambas as entidades como
					// Donas do relacionamento.
					// /*Eliminando a checagem em situações de auto
					// relacionamento*/
					if (main.getOwnerName() != null && reverse.getOwnerName() != null && !(entity.equals(entityRel))) {
						applicationValidatorMessages.addMessage("No Relacionamento (" + entity.getName() + "/" + main.getName() + ") entre: " + entity.getName() + " e " + entityRel.getName()
								+ " Voce deve definir APENAS uma das partes do relacionamento como \"O Dono\" do relacionamento.");
					}
					// Verifica se Foi definido o DONO do relacionamento
					if (!main.getUniDirecional() && main.getOwnerName() == null && reverse.getOwnerName() == null) {
						applicationValidatorMessages.addMessage("No Relacionamento (" + entity.getName() + "/" + main.getName() + ")  entre: " + entity.getName() + " e " + entityRel.getName() + " Voce deve definir \"O Dono\" do relacionamento. OU definir no relacionamento "
								+ main.getName() + "uniDirecional: true|Yes");
					}
				}
			}

			for (Relationship main : entity.getRelationships()) {
				String ownerName = main.getOwnerName();
				TheEntity entityModel = mapEntities.get(main.getModel());
				try {
					if (entityModel == null) {
						applicationValidatorMessages.addMessage("Erro analizando o relacionamento " + main.getName() + "na entidade " + entity.getName() + ". Não existe a entidade " + main.getModel());
					}
					if (ownerName != null) {
						Boolean ownerNotFound = true;

						for (Relationship attr : entityModel.getRelationships()) {
							if (attr.getName().equals(ownerName)) {
								ownerNotFound = false;
							}
						}
						if (ownerNotFound) {
							applicationValidatorMessages.addMessage("Erro analizando a entidade " + entityModel + ": Não existe o atributo/relacionamento de nome \"" + main.getOwnerName() + "\" na entidade \"" + entityModel
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

	private Relationship reverseRelation(TheEntity main, TheEntity reverse) {
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
