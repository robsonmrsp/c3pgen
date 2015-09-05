package com.mr.codegenerator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.mr.codegenerator.entities.Application;
import com.mr.codegenerator.entities.Attribute;
import com.mr.codegenerator.entities.Entity;
import com.mr.codegenerator.entities.Relationship;

public class ApplicationValidator {
	public static final Logger LOGGER = Logger.getLogger(ApplicationValidator.class);

	private Map<String, Entity> mapEntities = new HashMap<String, Entity>();

	private Map<Entity, List<Entity>> mapRelationshipsPerEntity = new HashMap<Entity, List<Entity>>();
	private Map<Entity, List<Relationship>> mapRelationships = new HashMap<Entity, List<Relationship>>();

	public boolean validate(Application application) throws ValidationException {

		List<String> validationMessages = new ArrayList<String>();
		Boolean returnValue = false;
		// Guardando as entidades do sistema
		for (Entity entity : application.getEntities()) {
			mapEntities.put(entity.getName(), entity);
		}

		// Guardando os relacionamentos de cada entidade
		for (Entity entity : application.getEntities()) {
			List<Entity> entities = new ArrayList<Entity>();
			List<Relationship> relationships = new ArrayList<Relationship>();

			for (Relationship relation : entity.getRelationships()) {
				entities.add(mapEntities.get(relation.getModel()));
				relationships.add(relation);
			}
			mapRelationshipsPerEntity.put(entity, entities);
			mapRelationships.put(entity, relationships);
		}

		//
		for (Entity entity : application.getEntities()) {

			Entity entityRel = null;
			List<Entity> listRelations = mapRelationshipsPerEntity.get(entity);

			for (Relationship main : entity.getRelationships()) {
				entityRel = mapEntities.get(main.getModel());

				Relationship reverse = reverseRelation(entity, entityRel);

				if (reverse != null) {
					// Verifica se NÃO foram definidos ambas as entidades como
					// Donas do relacionamento.
					// /*Eliminando a checagem em situações de auto
					// relacionamento*/
					if (main.getOwnerName() != null && reverse.getOwnerName() != null && !(entity.equals(entityRel))) {
						validationMessages.add("No Relacionamento (" + entity.getName() + "/" + main.getName() + ") entre: " + entity.getName() + " e " + entityRel.getName() + " Voce deve definir APENAS uma das partes do relacionamento como \"O Dono\" do relacionamento.");
					}
					// Verifica se Foi definido o DONO do relacionamento
					if (!main.getUniDirecional() && main.getOwnerName() == null && reverse.getOwnerName() == null) {
						validationMessages
								.add("No Relacionamento (" + entity.getName() + "/" + main.getName() + ")  entre: " + entity.getName() + " e " + entityRel.getName() + " Voce deve definir \"O Dono\" do relacionamento. OU definir no relacionamento " + main.getName() + "uniDirecional: true|Yes");
					}
				}
			}

			for (Relationship main : entity.getRelationships()) {
				String ownerName = main.getOwnerName();
				Entity entityModel = mapEntities.get(main.getModel());
				try {
					if (entityModel == null) {
						validationMessages.add("Erro analizando o relacionamento " + main.getName() + "na entidade " + entity.getName() + ". Não existe a entidade " + main.getModel());
					}
					if (ownerName != null) {
						Boolean ownerNotFound = true;

						for (Relationship attr : entityModel.getRelationships()) {
							if (attr.getName().equals(ownerName)) {
								ownerNotFound = false;
							}
						}
						if (ownerNotFound) {
							validationMessages.add("Erro analizando a entidade " + entityModel + ": Não existe o atributo/relacionamento de nome \"" + main.getOwnerName() + "\" na entidade \"" + entityModel + "\". Verifique o valor de 'ownerName' no relacionamento de nome  \""
									+ main.getName() + "\" na entidade  \"" + entity + "\"");
						}
					}
				} catch (Exception e) {
					validationMessages.add("Erro analizando a entidade " + entityModel + "(modelName=" + main.getModel() + "): Não existe o atributo/relacionamento de nome \"" + main.getOwnerName() + "\" na entidade \"" + entityModel
							+ "\". Verifique o valor de 'ownerName' no relacionamento de nome  \"" + main.getName() + "\" na entidade  \"" + entity + "\"");

				}
			}
		}

		if (validationMessages.size() > 0) {
			LOGGER.warn("Encontrados os seguintes problemas...");
			for (String msg : validationMessages) {
				LOGGER.warn(msg);
			}
			LOGGER.warn("A aplicação não será gerada...");
			return false;
		}
		return true;
	}

	private Relationship reverseRelation(Entity main, Entity reverse) {
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
