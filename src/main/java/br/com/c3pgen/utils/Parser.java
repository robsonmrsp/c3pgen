package br.com.c3pgen.utils;

import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import br.com.c3pgen.json.JsonApplication;
import br.com.c3pgen.json.JsonAttribute;
import br.com.c3pgen.json.JsonAttributeType;
import br.com.c3pgen.json.JsonBairro;
import br.com.c3pgen.json.JsonCep;
import br.com.c3pgen.json.JsonCidade;
import br.com.c3pgen.json.JsonClient;
import br.com.c3pgen.json.JsonCliente;
import br.com.c3pgen.json.JsonEndereco;
import br.com.c3pgen.json.JsonEstado;
import br.com.c3pgen.json.JsonItem;
import br.com.c3pgen.json.JsonItemType;
import br.com.c3pgen.json.JsonOperation;
import br.com.c3pgen.json.JsonPais;
import br.com.c3pgen.json.JsonPermission;
import br.com.c3pgen.json.JsonRelationship;
import br.com.c3pgen.json.JsonRole;
import br.com.c3pgen.json.JsonSession;
import br.com.c3pgen.json.JsonTheEntity;
import br.com.c3pgen.json.JsonUser;
import br.com.c3pgen.json.JsonViewApproach;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.Attribute;
import br.com.c3pgen.model.AttributeType;
import br.com.c3pgen.model.Bairro;
import br.com.c3pgen.model.Cep;
import br.com.c3pgen.model.Cidade;
import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.Cliente;
import br.com.c3pgen.model.Endereco;
import br.com.c3pgen.model.Estado;
import br.com.c3pgen.model.Item;
import br.com.c3pgen.model.ItemType;
import br.com.c3pgen.model.Operation;
import br.com.c3pgen.model.Pais;
import br.com.c3pgen.model.Permission;
import br.com.c3pgen.model.Relationship;
import br.com.c3pgen.model.Role;
import br.com.c3pgen.model.Session;
import br.com.c3pgen.model.TheEntity;
import br.com.c3pgen.model.User;
import br.com.c3pgen.model.ViewApproach;

//saporra
public class Parser {

	private static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");
	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy");
	private static final DateTimeFormatter HOUR_FORMAT = DateTimeFormat.forPattern("HH:mm");

	public static String getHourAsString(LocalDateTime date) {
		String format = "";
		try {
			format = HOUR_FORMAT.print(date);
		} catch (Exception e) {
			format = "00:00";
		}
		return format;
	}

	public static String getDateTimeAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_TIME_FORMAT.print(date);
		} catch (Exception e) {
			format = DATE_TIME_FORMAT.print(new DateTime());
		}
		return format;
	}

	public static String getDateAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_FORMAT.print(date);
		} catch (Exception e) {
			format = DATE_FORMAT.print(new DateTime());
		}
		return format;
	}

	//
	private static DateTime getHour(String date) {
		if (!date.isEmpty()) {
			try {
				return HOUR_FORMAT.parseDateTime(date);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static LocalDateTime getDate(String date) {
		if (!date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static LocalDateTime getDateTime(String date) {
		if (!date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_TIME_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	// converte de entidade para json --------------------
	private static JsonApplication toBasicJson(Application application) {
		JsonApplication jsonApplication = new JsonApplication();
		applyBasicJsonValues(jsonApplication, application);
		return jsonApplication;
	}

	private static Application toBasicEntity(JsonApplication jsonApplication) {
		Application application = new Application();
		applyBasicEntityValues(application, jsonApplication);
		return application;
	}

	private static void applyBasicJsonValues(JsonApplication jsonApplication, Application application) {
		jsonApplication.setId(application.getId());
		jsonApplication.setName(application.getName());
		jsonApplication.setSkin(application.getSkin());
		jsonApplication.setDescription(application.getDescription());
		jsonApplication.setRootPackage(application.getRootPackage());
	}

	private static void applyBasicEntityValues(Application application, JsonApplication jsonApplication) {
		application.setId(jsonApplication.getId());
		application.setName(jsonApplication.getName());
		application.setSkin(jsonApplication.getSkin());
		application.setDescription(jsonApplication.getDescription());
		application.setRootPackage(jsonApplication.getRootPackage());
	}

	public static JsonApplication toJson(Application application) {
		JsonApplication jsonApplication = new JsonApplication();

		applyBasicJsonValues(jsonApplication, application);

		List<TheEntity> listEntities = application.getEntities();
		if (listEntities != null) {
			for (TheEntity loopTheEntity : listEntities) {
				jsonApplication.getEntities().add(toJson(loopTheEntity));
			}
		}
		return jsonApplication;
	}

	public static Application apply(Application application, JsonApplication jsonApplication) {

		if (application == null)
			application = new Application();

		applyBasicEntityValues(application, jsonApplication);

		ArrayList<JsonTheEntity> listEntities = jsonApplication.getEntities();
		if (listEntities != null) {
			for (JsonTheEntity loopJsonTheEntity : listEntities) {
				application.addEntities(toEntity(loopJsonTheEntity));
			}
		}

		return application;

	}

	public static Application toEntity(JsonApplication jsonApplication) {
		Application application = new Application();

		return apply(application, jsonApplication);
	}

	public static List<JsonApplication> toListJsonApplications(List<Application> all) {
		List<JsonApplication> jsonApplications = new ArrayList<JsonApplication>();
		for (Application application : all) {
			jsonApplications.add(toJson(application));
		}
		return jsonApplications;
	}

	// converte de entidade para json --------------------
	private static JsonAttribute toBasicJson(Attribute attribute) {
		JsonAttribute jsonAttribute = new JsonAttribute();
		applyBasicJsonValues(jsonAttribute, attribute);
		return jsonAttribute;
	}

	private static Attribute toBasicEntity(JsonAttribute jsonAttribute) {
		Attribute attribute = new Attribute();
		applyBasicEntityValues(attribute, jsonAttribute);
		return attribute;
	}

	private static void applyBasicJsonValues(JsonAttribute jsonAttribute, Attribute attribute) {
		jsonAttribute.setId(attribute.getId());
		jsonAttribute.setName(attribute.getName());
		jsonAttribute.setDisplayName(attribute.getDisplayName());
		jsonAttribute.setMaxLen(attribute.getMaxLen());
		jsonAttribute.setTableFieldName(attribute.getTableFieldName());
		jsonAttribute.setmask(attribute.getMask());
		jsonAttribute.setDefaultValue(attribute.getDefaultValue());
		jsonAttribute.setPlaceholder(attribute.getPlaceholder());
		jsonAttribute.setRequired(attribute.getRequired());
		jsonAttribute.setUnique(attribute.getUnique());
	}

	private static void applyBasicEntityValues(Attribute attribute, JsonAttribute jsonAttribute) {
		attribute.setId(jsonAttribute.getId());
		attribute.setName(jsonAttribute.getName());
		attribute.setDisplayName(jsonAttribute.getDisplayName());
		attribute.setMaxLen(jsonAttribute.getMaxLen());
		attribute.setTableFieldName(jsonAttribute.getTableFieldName());
		attribute.setMask(jsonAttribute.getmask());
		attribute.setDefaultValue(jsonAttribute.getDefaultValue());
		attribute.setPlaceholder(jsonAttribute.getPlaceholder());
		attribute.setRequired(jsonAttribute.getRequired());
		attribute.setUnique(jsonAttribute.getUnique());
	}

	public static JsonAttribute toJson(Attribute attribute) {
		JsonAttribute jsonAttribute = new JsonAttribute();

		applyBasicJsonValues(jsonAttribute, attribute);

		TheEntity entity = attribute.getEntity();
		if (entity != null) {
			jsonAttribute.setEntity(toBasicJson(entity));
		}
		AttributeType type = attribute.getType();
		if (type != null) {
			jsonAttribute.setType(toJson(type));
		}
		ViewApproach viewApproach = attribute.getViewApproach();
		if (viewApproach != null) {
			jsonAttribute.setViewApproach(toJson(viewApproach));
		}
		return jsonAttribute;
	}

	public static Attribute apply(Attribute attribute, JsonAttribute jsonAttribute) {

		if (attribute == null)
			attribute = new Attribute();

		applyBasicEntityValues(attribute, jsonAttribute);

		JsonTheEntity entity = jsonAttribute.getEntity();
		if (entity != null) {
			attribute.setEntity(toBasicEntity(entity));
		}
		JsonAttributeType type = jsonAttribute.getType();
		if (type != null) {
			attribute.setType(toEntity(type));
		}
		JsonViewApproach viewApproach = jsonAttribute.getViewApproach();
		if (viewApproach != null) {
			attribute.setViewApproach(toEntity(viewApproach));
		}
		return attribute;

	}

	public static Attribute toEntity(JsonAttribute jsonAttribute) {
		Attribute attribute = new Attribute();

		return apply(attribute, jsonAttribute);
	}

	public static List<JsonAttribute> toListJsonAttributes(List<Attribute> all) {
		List<JsonAttribute> jsonAttributes = new ArrayList<JsonAttribute>();
		for (Attribute attribute : all) {
			jsonAttributes.add(toJson(attribute));
		}
		return jsonAttributes;
	}

	// converte de entidade para json --------------------
	private static JsonAttributeType toBasicJson(AttributeType attributeType) {
		JsonAttributeType jsonAttributeType = new JsonAttributeType();
		applyBasicJsonValues(jsonAttributeType, attributeType);
		return jsonAttributeType;
	}

	private static AttributeType toBasicEntity(JsonAttributeType jsonAttributeType) {
		AttributeType attributeType = new AttributeType();
		applyBasicEntityValues(attributeType, jsonAttributeType);
		return attributeType;
	}

	private static void applyBasicJsonValues(JsonAttributeType jsonAttributeType, AttributeType attributeType) {
		jsonAttributeType.setId(attributeType.getId());
		jsonAttributeType.setClassName(attributeType.getClassName());
		jsonAttributeType.setFormat(attributeType.getFormat());
	}

	private static void applyBasicEntityValues(AttributeType attributeType, JsonAttributeType jsonAttributeType) {
		attributeType.setId(jsonAttributeType.getId());
		attributeType.setClassName(jsonAttributeType.getClassName());
		attributeType.setFormat(jsonAttributeType.getFormat());
	}

	public static JsonAttributeType toJson(AttributeType attributeType) {
		JsonAttributeType jsonAttributeType = new JsonAttributeType();

		applyBasicJsonValues(jsonAttributeType, attributeType);

		return jsonAttributeType;
	}

	public static AttributeType apply(AttributeType attributeType, JsonAttributeType jsonAttributeType) {

		if (attributeType == null)
			attributeType = new AttributeType();

		applyBasicEntityValues(attributeType, jsonAttributeType);

		return attributeType;

	}

	public static AttributeType toEntity(JsonAttributeType jsonAttributeType) {
		AttributeType attributeType = new AttributeType();

		return apply(attributeType, jsonAttributeType);
	}

	public static List<JsonAttributeType> toListJsonAttributeTypes(List<AttributeType> all) {
		List<JsonAttributeType> jsonAttributeTypes = new ArrayList<JsonAttributeType>();
		for (AttributeType attributeType : all) {
			jsonAttributeTypes.add(toJson(attributeType));
		}
		return jsonAttributeTypes;
	}

	// converte de entidade para json --------------------
	private static JsonTheEntity toBasicJson(TheEntity theEntity) {
		JsonTheEntity jsonTheEntity = new JsonTheEntity();
		applyBasicJsonValues(jsonTheEntity, theEntity);
		return jsonTheEntity;
	}

	private static TheEntity toBasicEntity(JsonTheEntity jsonTheEntity) {
		TheEntity theEntity = new TheEntity();
		applyBasicEntityValues(theEntity, jsonTheEntity);
		return theEntity;
	}

	private static void applyBasicJsonValues(JsonTheEntity jsonTheEntity, TheEntity theEntity) {
		jsonTheEntity.setId(theEntity.getId());
		jsonTheEntity.setName(theEntity.getName());
		jsonTheEntity.setNotes(theEntity.getNotes());
		jsonTheEntity.setDisplayName(theEntity.getDisplayName());
		jsonTheEntity.setTableName(theEntity.getTableName());
		jsonTheEntity.setHasOwner(theEntity.getHasOwner());
		jsonTheEntity.setHasMobile(theEntity.getHasMobile());
	}

	private static void applyBasicEntityValues(TheEntity theEntity, JsonTheEntity jsonTheEntity) {
		theEntity.setId(jsonTheEntity.getId());
		theEntity.setName(jsonTheEntity.getName());
		theEntity.setNotes(jsonTheEntity.getNotes());
		theEntity.setDisplayName(jsonTheEntity.getDisplayName());
		theEntity.setTableName(jsonTheEntity.getTableName());
		theEntity.setHasOwner(jsonTheEntity.getHasOwner());
		theEntity.setHasMobile(jsonTheEntity.getHasMobile());
	}

	public static JsonTheEntity toJson(TheEntity theEntity) {
		JsonTheEntity jsonTheEntity = new JsonTheEntity();

		applyBasicJsonValues(jsonTheEntity, theEntity);

		Application application = theEntity.getApplication();
		if (application != null) {
			jsonTheEntity.setApplication(toBasicJson(application));
		}
		List<Attribute> listAttributes = theEntity.getAttributes();
		if (listAttributes != null) {
			for (Attribute loopAttribute : listAttributes) {
				jsonTheEntity.getAttributes().add(toJson(loopAttribute));
			}
		}
		List<Relationship> listRelationships = theEntity.getRelationships();
		if (listRelationships != null) {
			for (Relationship loopRelationship : listRelationships) {
				jsonTheEntity.getRelationships().add(toJson(loopRelationship));
			}
		}
		return jsonTheEntity;
	}

	public static TheEntity apply(TheEntity theEntity, JsonTheEntity jsonTheEntity) {

		if (theEntity == null)
			theEntity = new TheEntity();

		applyBasicEntityValues(theEntity, jsonTheEntity);

		JsonApplication application = jsonTheEntity.getApplication();
		if (application != null) {
			theEntity.setApplication(toBasicEntity(application));
		}
		ArrayList<JsonAttribute> listAttributes = jsonTheEntity.getAttributes();
		if (listAttributes != null) {
			for (JsonAttribute loopJsonAttribute : listAttributes) {
				theEntity.addAttributes(toEntity(loopJsonAttribute));
			}
		}

		ArrayList<JsonRelationship> listRelationships = jsonTheEntity.getRelationships();
		if (listRelationships != null) {
			for (JsonRelationship loopJsonRelationship : listRelationships) {
				theEntity.addRelationships(toEntity(loopJsonRelationship));
			}
		}

		return theEntity;

	}

	public static TheEntity toEntity(JsonTheEntity jsonTheEntity) {
		TheEntity theEntity = new TheEntity();

		return apply(theEntity, jsonTheEntity);
	}

	public static List<JsonTheEntity> toListJsonTheEntitys(List<TheEntity> all) {
		List<JsonTheEntity> jsonTheEntitys = new ArrayList<JsonTheEntity>();
		for (TheEntity theEntity : all) {
			jsonTheEntitys.add(toJson(theEntity));
		}
		return jsonTheEntitys;
	}

	// converte de entidade para json --------------------
	private static JsonRelationship toBasicJson(Relationship relationship) {
		JsonRelationship jsonRelationship = new JsonRelationship();
		applyBasicJsonValues(jsonRelationship, relationship);
		return jsonRelationship;
	}

	private static Relationship toBasicEntity(JsonRelationship jsonRelationship) {
		Relationship relationship = new Relationship();
		applyBasicEntityValues(relationship, jsonRelationship);
		return relationship;
	}

	private static void applyBasicJsonValues(JsonRelationship jsonRelationship, Relationship relationship) {
		jsonRelationship.setId(relationship.getId());
		jsonRelationship.setName(relationship.getName());
		jsonRelationship.setType(relationship.getType());
		jsonRelationship.setDisplayName(relationship.getDisplayName());
		jsonRelationship.setOwnerName(relationship.getOwnerName());
		jsonRelationship.setModel(relationship.getModel());
		jsonRelationship.setUniDirecional(relationship.getUniDirecional());
	}

	private static void applyBasicEntityValues(Relationship relationship, JsonRelationship jsonRelationship) {
		relationship.setId(jsonRelationship.getId());
		relationship.setName(jsonRelationship.getName());
		relationship.setType(jsonRelationship.getType());
		relationship.setDisplayName(jsonRelationship.getDisplayName());
		relationship.setOwnerName(jsonRelationship.getOwnerName());
		relationship.setModel(jsonRelationship.getModel());
		relationship.setUniDirecional(jsonRelationship.getUniDirecional());
	}

	public static JsonRelationship toJson(Relationship relationship) {
		JsonRelationship jsonRelationship = new JsonRelationship();

		applyBasicJsonValues(jsonRelationship, relationship);

		TheEntity entity = relationship.getEntity();
		if (entity != null) {
			jsonRelationship.setEntity(toBasicJson(entity));
		}
		ViewApproach viewApproach = relationship.getViewApproach();
		if (viewApproach != null) {
			jsonRelationship.setViewApproach(toJson(viewApproach));
		}
		return jsonRelationship;
	}

	public static Relationship apply(Relationship relationship, JsonRelationship jsonRelationship) {

		if (relationship == null)
			relationship = new Relationship();

		applyBasicEntityValues(relationship, jsonRelationship);

		JsonTheEntity entity = jsonRelationship.getEntity();
		if (entity != null) {
			relationship.setEntity(toBasicEntity(entity));
		}
		JsonViewApproach viewApproach = jsonRelationship.getViewApproach();
		if (viewApproach != null) {
			relationship.setViewApproach(toEntity(viewApproach));
		}
		return relationship;

	}

	public static Relationship toEntity(JsonRelationship jsonRelationship) {
		Relationship relationship = new Relationship();

		return apply(relationship, jsonRelationship);
	}

	public static List<JsonRelationship> toListJsonRelationships(List<Relationship> all) {
		List<JsonRelationship> jsonRelationships = new ArrayList<JsonRelationship>();
		for (Relationship relationship : all) {
			jsonRelationships.add(toJson(relationship));
		}
		return jsonRelationships;
	}

	// converte de entidade para json --------------------
	private static JsonViewApproach toBasicJson(ViewApproach viewApproach) {
		JsonViewApproach jsonViewApproach = new JsonViewApproach();
		applyBasicJsonValues(jsonViewApproach, viewApproach);
		return jsonViewApproach;
	}

	private static ViewApproach toBasicEntity(JsonViewApproach jsonViewApproach) {
		ViewApproach viewApproach = new ViewApproach();
		applyBasicEntityValues(viewApproach, jsonViewApproach);
		return viewApproach;
	}

	private static void applyBasicJsonValues(JsonViewApproach jsonViewApproach, ViewApproach viewApproach) {
		jsonViewApproach.setId(viewApproach.getId());
		jsonViewApproach.setType(viewApproach.getType());
		jsonViewApproach.setComboId(viewApproach.getComboId());
		jsonViewApproach.setComboName(viewApproach.getComboName());
		jsonViewApproach.setComboVal(viewApproach.getComboVal());
		jsonViewApproach.setTextField(viewApproach.getTextField());
		jsonViewApproach.setHiddenField(viewApproach.getHiddenField());
	}

	private static void applyBasicEntityValues(ViewApproach viewApproach, JsonViewApproach jsonViewApproach) {
		viewApproach.setId(jsonViewApproach.getId());
		viewApproach.setType(jsonViewApproach.getType());
		viewApproach.setComboId(jsonViewApproach.getComboId());
		viewApproach.setComboName(jsonViewApproach.getComboName());
		viewApproach.setComboVal(jsonViewApproach.getComboVal());
		viewApproach.setTextField(jsonViewApproach.getTextField());
		viewApproach.setHiddenField(jsonViewApproach.getHiddenField());
	}

	public static JsonViewApproach toJson(ViewApproach viewApproach) {
		JsonViewApproach jsonViewApproach = new JsonViewApproach();

		applyBasicJsonValues(jsonViewApproach, viewApproach);

		return jsonViewApproach;
	}

	public static ViewApproach apply(ViewApproach viewApproach, JsonViewApproach jsonViewApproach) {

		if (viewApproach == null)
			viewApproach = new ViewApproach();

		applyBasicEntityValues(viewApproach, jsonViewApproach);

		return viewApproach;

	}

	public static ViewApproach toEntity(JsonViewApproach jsonViewApproach) {
		ViewApproach viewApproach = new ViewApproach();

		return apply(viewApproach, jsonViewApproach);
	}

	public static List<JsonViewApproach> toListJsonViewApproachs(List<ViewApproach> all) {
		List<JsonViewApproach> jsonViewApproachs = new ArrayList<JsonViewApproach>();
		for (ViewApproach viewApproach : all) {
			jsonViewApproachs.add(toJson(viewApproach));
		}
		return jsonViewApproachs;
	}

	// converte de entidade para json --------------------
	private static JsonBairro toBasicJson(Bairro bairro) {
		JsonBairro jsonBairro = new JsonBairro();
		applyBasicJsonValues(jsonBairro, bairro);
		return jsonBairro;
	}

	private static Bairro toBasicEntity(JsonBairro jsonBairro) {
		Bairro bairro = new Bairro();
		applyBasicEntityValues(bairro, jsonBairro);
		return bairro;
	}

	private static void applyBasicJsonValues(JsonBairro jsonBairro, Bairro bairro) {
		jsonBairro.setId(bairro.getId());
		jsonBairro.setNome(bairro.getNome());
	}

	private static void applyBasicEntityValues(Bairro bairro, JsonBairro jsonBairro) {
		bairro.setId(jsonBairro.getId());
		bairro.setNome(jsonBairro.getNome());
	}

	public static JsonBairro toJson(Bairro bairro) {
		JsonBairro jsonBairro = new JsonBairro();

		applyBasicJsonValues(jsonBairro, bairro);

		Cidade cidade = bairro.getCidade();
		if (cidade != null) {
			jsonBairro.setCidade(toJson(cidade));
		}
		Estado estado = bairro.getEstado();
		if (estado != null) {
			jsonBairro.setEstado(toJson(estado));
		}
		return jsonBairro;
	}

	public static Bairro apply(Bairro bairro, JsonBairro jsonBairro) {

		if (bairro == null)
			bairro = new Bairro();

		applyBasicEntityValues(bairro, jsonBairro);

		JsonCidade cidade = jsonBairro.getCidade();
		if (cidade != null) {
			bairro.setCidade(toEntity(cidade));
		}
		JsonEstado estado = jsonBairro.getEstado();
		if (estado != null) {
			bairro.setEstado(toEntity(estado));
		}
		return bairro;

	}

	public static Bairro toEntity(JsonBairro jsonBairro) {
		Bairro bairro = new Bairro();

		return apply(bairro, jsonBairro);
	}

	public static List<JsonBairro> toListJsonBairros(List<Bairro> all) {
		List<JsonBairro> jsonBairros = new ArrayList<JsonBairro>();
		for (Bairro bairro : all) {
			jsonBairros.add(toJson(bairro));
		}
		return jsonBairros;
	}

	// converte de entidade para json --------------------
	private static JsonCep toBasicJson(Cep cep) {
		JsonCep jsonCep = new JsonCep();
		applyBasicJsonValues(jsonCep, cep);
		return jsonCep;
	}

	private static Cep toBasicEntity(JsonCep jsonCep) {
		Cep cep = new Cep();
		applyBasicEntityValues(cep, jsonCep);
		return cep;
	}

	private static void applyBasicJsonValues(JsonCep jsonCep, Cep cep) {
		jsonCep.setId(cep.getId());
		jsonCep.setLogradouro(cep.getLogradouro());
		jsonCep.setNumero(cep.getNumero());
	}

	private static void applyBasicEntityValues(Cep cep, JsonCep jsonCep) {
		cep.setId(jsonCep.getId());
		cep.setLogradouro(jsonCep.getLogradouro());
		cep.setNumero(jsonCep.getNumero());
	}

	public static JsonCep toJson(Cep cep) {
		JsonCep jsonCep = new JsonCep();

		applyBasicJsonValues(jsonCep, cep);

		Bairro bairro = cep.getBairro();
		if (bairro != null) {
			jsonCep.setBairro(toJson(bairro));
		}
		Cidade cidade = cep.getCidade();
		if (cidade != null) {
			jsonCep.setCidade(toJson(cidade));
		}
		Estado estado = cep.getEstado();
		if (estado != null) {
			jsonCep.setEstado(toJson(estado));
		}
		return jsonCep;
	}

	public static Cep apply(Cep cep, JsonCep jsonCep) {

		if (cep == null)
			cep = new Cep();

		applyBasicEntityValues(cep, jsonCep);

		JsonBairro bairro = jsonCep.getBairro();
		if (bairro != null) {
			cep.setBairro(toEntity(bairro));
		}
		JsonCidade cidade = jsonCep.getCidade();
		if (cidade != null) {
			cep.setCidade(toEntity(cidade));
		}
		JsonEstado estado = jsonCep.getEstado();
		if (estado != null) {
			cep.setEstado(toEntity(estado));
		}
		return cep;

	}

	public static Cep toEntity(JsonCep jsonCep) {
		Cep cep = new Cep();

		return apply(cep, jsonCep);
	}

	public static List<JsonCep> toListJsonCeps(List<Cep> all) {
		List<JsonCep> jsonCeps = new ArrayList<JsonCep>();
		for (Cep cep : all) {
			jsonCeps.add(toJson(cep));
		}
		return jsonCeps;
	}

	// converte de entidade para json --------------------
	private static JsonCidade toBasicJson(Cidade cidade) {
		JsonCidade jsonCidade = new JsonCidade();
		applyBasicJsonValues(jsonCidade, cidade);
		return jsonCidade;
	}

	private static Cidade toBasicEntity(JsonCidade jsonCidade) {
		Cidade cidade = new Cidade();
		applyBasicEntityValues(cidade, jsonCidade);
		return cidade;
	}

	private static void applyBasicJsonValues(JsonCidade jsonCidade, Cidade cidade) {
		jsonCidade.setId(cidade.getId());
		jsonCidade.setNome(cidade.getNome());
		jsonCidade.setCep(cidade.getCep());
	}

	private static void applyBasicEntityValues(Cidade cidade, JsonCidade jsonCidade) {
		cidade.setId(jsonCidade.getId());
		cidade.setNome(jsonCidade.getNome());
		cidade.setCep(jsonCidade.getCep());
	}

	public static JsonCidade toJson(Cidade cidade) {
		JsonCidade jsonCidade = new JsonCidade();

		applyBasicJsonValues(jsonCidade, cidade);

		Estado estado = cidade.getEstado();
		if (estado != null) {
			jsonCidade.setEstado(toJson(estado));
		}
		return jsonCidade;
	}

	public static Cidade apply(Cidade cidade, JsonCidade jsonCidade) {

		if (cidade == null)
			cidade = new Cidade();

		applyBasicEntityValues(cidade, jsonCidade);

		JsonEstado estado = jsonCidade.getEstado();
		if (estado != null) {
			cidade.setEstado(toEntity(estado));
		}
		return cidade;

	}

	public static Cidade toEntity(JsonCidade jsonCidade) {
		Cidade cidade = new Cidade();

		return apply(cidade, jsonCidade);
	}

	public static List<JsonCidade> toListJsonCidades(List<Cidade> all) {
		List<JsonCidade> jsonCidades = new ArrayList<JsonCidade>();
		for (Cidade cidade : all) {
			jsonCidades.add(toJson(cidade));
		}
		return jsonCidades;
	}

	// converte de entidade para json --------------------
	private static JsonEndereco toBasicJson(Endereco endereco) {
		JsonEndereco jsonEndereco = new JsonEndereco();
		applyBasicJsonValues(jsonEndereco, endereco);
		return jsonEndereco;
	}

	private static Endereco toBasicEntity(JsonEndereco jsonEndereco) {
		Endereco endereco = new Endereco();
		applyBasicEntityValues(endereco, jsonEndereco);
		return endereco;
	}

	private static void applyBasicJsonValues(JsonEndereco jsonEndereco, Endereco endereco) {
		jsonEndereco.setId(endereco.getId());
		jsonEndereco.setComplemento(endereco.getComplemento());
		jsonEndereco.setNumero(endereco.getNumero());
	}

	private static void applyBasicEntityValues(Endereco endereco, JsonEndereco jsonEndereco) {
		endereco.setId(jsonEndereco.getId());
		endereco.setComplemento(jsonEndereco.getComplemento());
		endereco.setNumero(jsonEndereco.getNumero());
	}

	public static JsonEndereco toJson(Endereco endereco) {
		JsonEndereco jsonEndereco = new JsonEndereco();

		applyBasicJsonValues(jsonEndereco, endereco);

		Cep cep = endereco.getCep();
		if (cep != null) {
			jsonEndereco.setCep(toJson(cep));
		}
		return jsonEndereco;
	}

	public static Endereco apply(Endereco endereco, JsonEndereco jsonEndereco) {

		if (endereco == null)
			endereco = new Endereco();

		applyBasicEntityValues(endereco, jsonEndereco);

		JsonCep cep = jsonEndereco.getCep();
		if (cep != null) {
			endereco.setCep(toEntity(cep));
		}
		return endereco;

	}

	public static Endereco toEntity(JsonEndereco jsonEndereco) {
		Endereco endereco = new Endereco();

		return apply(endereco, jsonEndereco);
	}

	public static List<JsonEndereco> toListJsonEnderecos(List<Endereco> all) {
		List<JsonEndereco> jsonEnderecos = new ArrayList<JsonEndereco>();
		for (Endereco endereco : all) {
			jsonEnderecos.add(toJson(endereco));
		}
		return jsonEnderecos;
	}

	// converte de entidade para json --------------------
	private static JsonEstado toBasicJson(Estado estado) {
		JsonEstado jsonEstado = new JsonEstado();
		applyBasicJsonValues(jsonEstado, estado);
		return jsonEstado;
	}

	private static Estado toBasicEntity(JsonEstado jsonEstado) {
		Estado estado = new Estado();
		applyBasicEntityValues(estado, jsonEstado);
		return estado;
	}

	private static void applyBasicJsonValues(JsonEstado jsonEstado, Estado estado) {
		jsonEstado.setId(estado.getId());
		jsonEstado.setNome(estado.getNome());
		jsonEstado.setFaixaCep1Ini(estado.getFaixaCep1Ini());
		jsonEstado.setFaixaCep1Fim(estado.getFaixaCep1Fim());
		jsonEstado.setFaixaCep2Ini(estado.getFaixaCep2Ini());
		jsonEstado.setFaixaCep2Fim(estado.getFaixaCep2Fim());
	}

	private static void applyBasicEntityValues(Estado estado, JsonEstado jsonEstado) {
		estado.setId(jsonEstado.getId());
		estado.setNome(jsonEstado.getNome());
		estado.setFaixaCep1Ini(jsonEstado.getFaixaCep1Ini());
		estado.setFaixaCep1Fim(jsonEstado.getFaixaCep1Fim());
		estado.setFaixaCep2Ini(jsonEstado.getFaixaCep2Ini());
		estado.setFaixaCep2Fim(jsonEstado.getFaixaCep2Fim());
	}

	public static JsonEstado toJson(Estado estado) {
		JsonEstado jsonEstado = new JsonEstado();

		applyBasicJsonValues(jsonEstado, estado);

		return jsonEstado;
	}

	public static Estado apply(Estado estado, JsonEstado jsonEstado) {

		if (estado == null)
			estado = new Estado();

		applyBasicEntityValues(estado, jsonEstado);

		return estado;

	}

	public static Estado toEntity(JsonEstado jsonEstado) {
		Estado estado = new Estado();

		return apply(estado, jsonEstado);
	}

	public static List<JsonEstado> toListJsonEstados(List<Estado> all) {
		List<JsonEstado> jsonEstados = new ArrayList<JsonEstado>();
		for (Estado estado : all) {
			jsonEstados.add(toJson(estado));
		}
		return jsonEstados;
	}

	// converte de entidade para json --------------------
	private static JsonPais toBasicJson(Pais pais) {
		JsonPais jsonPais = new JsonPais();
		applyBasicJsonValues(jsonPais, pais);
		return jsonPais;
	}

	private static Pais toBasicEntity(JsonPais jsonPais) {
		Pais pais = new Pais();
		applyBasicEntityValues(pais, jsonPais);
		return pais;
	}

	private static void applyBasicJsonValues(JsonPais jsonPais, Pais pais) {
		jsonPais.setId(pais.getId());
		jsonPais.setCodigo(pais.getCodigo());
		jsonPais.setNome(pais.getNome());
	}

	private static void applyBasicEntityValues(Pais pais, JsonPais jsonPais) {
		pais.setId(jsonPais.getId());
		pais.setCodigo(jsonPais.getCodigo());
		pais.setNome(jsonPais.getNome());
	}

	public static JsonPais toJson(Pais pais) {
		JsonPais jsonPais = new JsonPais();

		applyBasicJsonValues(jsonPais, pais);

		return jsonPais;
	}

	public static Pais apply(Pais pais, JsonPais jsonPais) {

		if (pais == null)
			pais = new Pais();

		applyBasicEntityValues(pais, jsonPais);

		return pais;

	}

	public static Pais toEntity(JsonPais jsonPais) {
		Pais pais = new Pais();

		return apply(pais, jsonPais);
	}

	public static List<JsonPais> toListJsonPaiss(List<Pais> all) {
		List<JsonPais> jsonPaiss = new ArrayList<JsonPais>();
		for (Pais pais : all) {
			jsonPaiss.add(toJson(pais));
		}
		return jsonPaiss;
	}

	// converte de entidade para json --------------------
	private static JsonClient toBasicJson(Client client) {
		JsonClient jsonClient = new JsonClient();
		applyBasicJsonValues(jsonClient, client);
		return jsonClient;
	}

	private static Client toBasicEntity(JsonClient jsonClient) {
		Client client = new Client();
		applyBasicEntityValues(client, jsonClient);
		return client;
	}

	private static void applyBasicJsonValues(JsonClient jsonClient, Client client) {
		jsonClient.setId(client.getId());
		jsonClient.setLogo(client.getLogo());
		jsonClient.setName(client.getName());
		jsonClient.setCnpj(client.getCnpj());
		jsonClient.setPhoneNumber(client.getPhoneNumber());
		jsonClient.setCorporateName(client.getCorporateName());
	}

	private static void applyBasicEntityValues(Client client, JsonClient jsonClient) {
		client.setId(jsonClient.getId());
		client.setLogo(jsonClient.getLogo());
		client.setName(jsonClient.getName());
		client.setCnpj(jsonClient.getCnpj());
		client.setPhoneNumber(jsonClient.getPhoneNumber());
		client.setCorporateName(jsonClient.getCorporateName());
	}

	public static JsonClient toJson(Client client) {
		JsonClient jsonClient = new JsonClient();

		applyBasicJsonValues(jsonClient, client);

		return jsonClient;
	}

	public static Client apply(Client client, JsonClient jsonClient) {

		if (client == null)
			client = new Client();

		applyBasicEntityValues(client, jsonClient);

		return client;

	}

	public static Client toEntity(JsonClient jsonClient) {
		Client client = new Client();

		return apply(client, jsonClient);
	}

	public static List<JsonClient> toListJsonClients(List<Client> all) {
		List<JsonClient> jsonClients = new ArrayList<JsonClient>();
		for (Client client : all) {
			jsonClients.add(toJson(client));
		}
		return jsonClients;
	}

	// converte de entidade para json --------------------
	private static JsonCliente toBasicJson(Cliente cliente) {
		JsonCliente jsonCliente = new JsonCliente();
		applyBasicJsonValues(jsonCliente, cliente);
		return jsonCliente;
	}

	private static Cliente toBasicEntity(JsonCliente jsonCliente) {
		Cliente cliente = new Cliente();
		applyBasicEntityValues(cliente, jsonCliente);
		return cliente;
	}

	private static void applyBasicJsonValues(JsonCliente jsonCliente, Cliente cliente) {
		jsonCliente.setId(cliente.getId());
		jsonCliente.setNome(cliente.getNome());
		jsonCliente.setEmail(cliente.getEmail());
		jsonCliente.setCpf(cliente.getCpf());
		jsonCliente.setTelefone(cliente.getTelefone());
		jsonCliente.setOutroTelefone(cliente.getOutroTelefone());
	}

	private static void applyBasicEntityValues(Cliente cliente, JsonCliente jsonCliente) {
		cliente.setId(jsonCliente.getId());
		cliente.setNome(jsonCliente.getNome());
		cliente.setEmail(jsonCliente.getEmail());
		cliente.setCpf(jsonCliente.getCpf());
		cliente.setTelefone(jsonCliente.getTelefone());
		cliente.setOutroTelefone(jsonCliente.getOutroTelefone());
	}

	public static JsonCliente toJson(Cliente cliente) {
		JsonCliente jsonCliente = new JsonCliente();

		applyBasicJsonValues(jsonCliente, cliente);

		Endereco endereco = cliente.getEndereco();
		if (endereco != null) {
			jsonCliente.setEndereco(toJson(endereco));
		}
		return jsonCliente;
	}

	public static Cliente apply(Cliente cliente, JsonCliente jsonCliente) {

		if (cliente == null)
			cliente = new Cliente();

		applyBasicEntityValues(cliente, jsonCliente);

		JsonEndereco endereco = jsonCliente.getEndereco();
		if (endereco != null) {
			cliente.setEndereco(toEntity(endereco));
		}
		return cliente;

	}

	public static Cliente toEntity(JsonCliente jsonCliente) {
		Cliente cliente = new Cliente();

		return apply(cliente, jsonCliente);
	}

	public static List<JsonCliente> toListJsonClientes(List<Cliente> all) {
		List<JsonCliente> jsonClientes = new ArrayList<JsonCliente>();
		for (Cliente cliente : all) {
			jsonClientes.add(toJson(cliente));
		}
		return jsonClientes;
	}

	// converte de entidade para json --------------------
	private static JsonItem toBasicJson(Item item) {
		JsonItem jsonItem = new JsonItem();
		applyBasicJsonValues(jsonItem, item);
		return jsonItem;
	}

	private static Item toBasicEntity(JsonItem jsonItem) {
		Item item = new Item();
		applyBasicEntityValues(item, jsonItem);
		return item;
	}

	private static void applyBasicJsonValues(JsonItem jsonItem, Item item) {
		jsonItem.setId(item.getId());
		jsonItem.setName(item.getName());
		jsonItem.setDescription(item.getDescription());
	}

	private static void applyBasicEntityValues(Item item, JsonItem jsonItem) {
		item.setId(jsonItem.getId());
		item.setName(jsonItem.getName());
		item.setDescription(jsonItem.getDescription());
	}

	public static JsonItem toJson(Item item) {
		JsonItem jsonItem = new JsonItem();

		applyBasicJsonValues(jsonItem, item);

		ItemType type = item.getType();
		if (type != null) {
			jsonItem.setType(toJson(type));
		}
		List<Permission> listPermissions = item.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonItem.getPermissions().add(toBasicJson(loopPermission));
			}
		}
		return jsonItem;
	}

	public static Item apply(Item item, JsonItem jsonItem) {

		if (item == null)
			item = new Item();

		applyBasicEntityValues(item, jsonItem);

		JsonItemType type = jsonItem.getType();
		if (type != null) {
			item.setType(toEntity(type));
		}
		ArrayList<JsonPermission> listPermissions = jsonItem.getPermissions();
		if (listPermissions != null) {
			for (JsonPermission loopJsonPermission : listPermissions) {
				item.addPermissions(toBasicEntity(loopJsonPermission));
			}
		}

		return item;

	}

	public static Item toEntity(JsonItem jsonItem) {
		Item item = new Item();

		return apply(item, jsonItem);
	}

	public static List<JsonItem> toListJsonItems(List<Item> all) {
		List<JsonItem> jsonItems = new ArrayList<JsonItem>();
		for (Item item : all) {
			jsonItems.add(toJson(item));
		}
		return jsonItems;
	}

	// converte de entidade para json --------------------
	private static JsonItemType toBasicJson(ItemType itemType) {
		JsonItemType jsonItemType = new JsonItemType();
		applyBasicJsonValues(jsonItemType, itemType);
		return jsonItemType;
	}

	private static ItemType toBasicEntity(JsonItemType jsonItemType) {
		ItemType itemType = new ItemType();
		applyBasicEntityValues(itemType, jsonItemType);
		return itemType;
	}

	private static void applyBasicJsonValues(JsonItemType jsonItemType, ItemType itemType) {
		jsonItemType.setId(itemType.getId());
		jsonItemType.setName(itemType.getName());
		jsonItemType.setDescription(itemType.getDescription());
	}

	private static void applyBasicEntityValues(ItemType itemType, JsonItemType jsonItemType) {
		itemType.setId(jsonItemType.getId());
		itemType.setName(jsonItemType.getName());
		itemType.setDescription(jsonItemType.getDescription());
	}

	public static JsonItemType toJson(ItemType itemType) {
		JsonItemType jsonItemType = new JsonItemType();

		applyBasicJsonValues(jsonItemType, itemType);

		return jsonItemType;
	}

	public static ItemType apply(ItemType itemType, JsonItemType jsonItemType) {

		if (itemType == null)
			itemType = new ItemType();

		applyBasicEntityValues(itemType, jsonItemType);

		return itemType;

	}

	public static ItemType toEntity(JsonItemType jsonItemType) {
		ItemType itemType = new ItemType();

		return apply(itemType, jsonItemType);
	}

	public static List<JsonItemType> toListJsonItemTypes(List<ItemType> all) {
		List<JsonItemType> jsonItemTypes = new ArrayList<JsonItemType>();
		for (ItemType itemType : all) {
			jsonItemTypes.add(toJson(itemType));
		}
		return jsonItemTypes;
	}

	// converte de entidade para json --------------------
	private static JsonOperation toBasicJson(Operation operation) {
		JsonOperation jsonOperation = new JsonOperation();
		applyBasicJsonValues(jsonOperation, operation);
		return jsonOperation;
	}

	private static Operation toBasicEntity(JsonOperation jsonOperation) {
		Operation operation = new Operation();
		applyBasicEntityValues(operation, jsonOperation);
		return operation;
	}

	private static void applyBasicJsonValues(JsonOperation jsonOperation, Operation operation) {
		jsonOperation.setId(operation.getId());
		jsonOperation.setName(operation.getName());
		jsonOperation.setCanEdit(operation.getCanEdit());
		jsonOperation.setCanRead(operation.getCanRead());
		jsonOperation.setCanUpdate(operation.getCanUpdate());
		jsonOperation.setCanDelete(operation.getCanDelete());
		jsonOperation.setCanExecute(operation.getCanExecute());
	}

	private static void applyBasicEntityValues(Operation operation, JsonOperation jsonOperation) {
		operation.setId(jsonOperation.getId());
		operation.setName(jsonOperation.getName());
		operation.setCanEdit(jsonOperation.getCanEdit());
		operation.setCanRead(jsonOperation.getCanRead());
		operation.setCanUpdate(jsonOperation.getCanUpdate());
		operation.setCanDelete(jsonOperation.getCanDelete());
		operation.setCanExecute(jsonOperation.getCanExecute());
	}

	public static JsonOperation toJson(Operation operation) {
		JsonOperation jsonOperation = new JsonOperation();

		applyBasicJsonValues(jsonOperation, operation);

		List<Permission> listPermissions = operation.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonOperation.getPermissions().add(toBasicJson(loopPermission));
			}
		}
		return jsonOperation;
	}

	public static Operation apply(Operation operation, JsonOperation jsonOperation) {

		if (operation == null)
			operation = new Operation();

		applyBasicEntityValues(operation, jsonOperation);

		ArrayList<JsonPermission> listPermissions = jsonOperation.getPermissions();
		if (listPermissions != null) {
			for (JsonPermission loopJsonPermission : listPermissions) {
				operation.addPermissions(toBasicEntity(loopJsonPermission));
			}
		}

		return operation;

	}

	public static Operation toEntity(JsonOperation jsonOperation) {
		Operation operation = new Operation();

		return apply(operation, jsonOperation);
	}

	public static List<JsonOperation> toListJsonOperations(List<Operation> all) {
		List<JsonOperation> jsonOperations = new ArrayList<JsonOperation>();
		for (Operation operation : all) {
			jsonOperations.add(toJson(operation));
		}
		return jsonOperations;
	}

	// converte de entidade para json --------------------
	private static JsonPermission toBasicJson(Permission permission) {
		JsonPermission jsonPermission = new JsonPermission();
		applyBasicJsonValues(jsonPermission, permission);
		return jsonPermission;
	}

	private static Permission toBasicEntity(JsonPermission jsonPermission) {
		Permission permission = new Permission();
		applyBasicEntityValues(permission, jsonPermission);
		return permission;
	}

	private static void applyBasicJsonValues(JsonPermission jsonPermission, Permission permission) {
		jsonPermission.setId(permission.getId());
		jsonPermission.setName(permission.getName());
	}

	private static void applyBasicEntityValues(Permission permission, JsonPermission jsonPermission) {
		permission.setId(jsonPermission.getId());
		permission.setName(jsonPermission.getName());
	}

	public static JsonPermission toJson(Permission permission) {
		JsonPermission jsonPermission = new JsonPermission();

		applyBasicJsonValues(jsonPermission, permission);

		List<Role> listRoles = permission.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonPermission.getRoles().add(toBasicJson(loopRole));
			}
		}

		Operation operation = permission.getOperation();
		if (operation != null) {
			jsonPermission.setOperation(toJson(operation));
		}
		Item item = permission.getItem();
		if (item != null) {
			jsonPermission.setItem(toJson(item));
		}
		return jsonPermission;
	}

	public static Permission apply(Permission permission, JsonPermission jsonPermission) {

		if (permission == null)
			permission = new Permission();

		applyBasicEntityValues(permission, jsonPermission);

		ArrayList<JsonRole> listRoles = jsonPermission.getRoles();
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				permission.addRoles(toBasicEntity(loopJsonRole));
			}
		}

		JsonOperation operation = jsonPermission.getOperation();
		if (operation != null) {
			permission.setOperation(toEntity(operation));
		}
		JsonItem item = jsonPermission.getItem();
		if (item != null) {
			permission.setItem(toEntity(item));
		}
		return permission;

	}

	public static Permission toEntity(JsonPermission jsonPermission) {
		Permission permission = new Permission();

		return apply(permission, jsonPermission);
	}

	public static List<JsonPermission> toListJsonPermissions(List<Permission> all) {
		List<JsonPermission> jsonPermissions = new ArrayList<JsonPermission>();
		for (Permission permission : all) {
			jsonPermissions.add(toJson(permission));
		}
		return jsonPermissions;
	}

	// converte de entidade para json --------------------
	private static JsonRole toBasicJson(Role role) {
		JsonRole jsonRole = new JsonRole();
		applyBasicJsonValues(jsonRole, role);
		return jsonRole;
	}

	private static Role toBasicEntity(JsonRole jsonRole) {
		Role role = new Role();
		applyBasicEntityValues(role, jsonRole);
		return role;
	}

	private static void applyBasicJsonValues(JsonRole jsonRole, Role role) {
		jsonRole.setId(role.getId());
		jsonRole.setAuthority(role.getAuthority());
		jsonRole.setDescription(role.getDescription());
	}

	private static void applyBasicEntityValues(Role role, JsonRole jsonRole) {
		role.setId(jsonRole.getId());
		role.setAuthority(jsonRole.getAuthority());
		role.setDescription(jsonRole.getDescription());
	}

	public static JsonRole toJson(Role role) {
		JsonRole jsonRole = new JsonRole();

		applyBasicJsonValues(jsonRole, role);

		List<Session> listSessions = role.getSessions();
		if (listSessions != null) {
			for (Session loopSession : listSessions) {
				jsonRole.getSessions().add(toBasicJson(loopSession));
			}
		}

		List<User> listUsers = role.getUsers();
		if (listUsers != null) {
			for (User loopUser : listUsers) {
				jsonRole.getUsers().add(toBasicJson(loopUser));
			}
		}

		List<Permission> listPermissions = role.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonRole.getPermissions().add(toJson(loopPermission));
			}
		}

		return jsonRole;
	}

	public static Role apply(Role role, JsonRole jsonRole) {

		if (role == null)
			role = new Role();

		applyBasicEntityValues(role, jsonRole);

		ArrayList<JsonSession> listSessions = jsonRole.getSessions();
		if (listSessions != null) {
			for (JsonSession loopJsonSession : listSessions) {
				role.addSessions(toBasicEntity(loopJsonSession));
			}
		}

		ArrayList<JsonUser> listUsers = jsonRole.getUsers();
		if (listUsers != null) {
			for (JsonUser loopJsonUser : listUsers) {
				role.addUsers(toBasicEntity(loopJsonUser));
			}
		}

		ArrayList<JsonPermission> listPermissions = jsonRole.getPermissions();
		if (listPermissions != null) {
			for (JsonPermission loopJsonPermission : listPermissions) {
				role.addPermissions(toEntity(loopJsonPermission));
			}
		}
		return role;

	}

	public static Role toEntity(JsonRole jsonRole) {
		Role role = new Role();

		return apply(role, jsonRole);
	}

	public static List<JsonRole> toListJsonRoles(List<Role> all) {
		List<JsonRole> jsonRoles = new ArrayList<JsonRole>();
		for (Role role : all) {
			jsonRoles.add(toJson(role));
		}
		return jsonRoles;
	}

	// converte de entidade para json --------------------
	private static JsonSession toBasicJson(Session session) {
		JsonSession jsonSession = new JsonSession();
		applyBasicJsonValues(jsonSession, session);
		return jsonSession;
	}

	private static Session toBasicEntity(JsonSession jsonSession) {
		Session session = new Session();
		applyBasicEntityValues(session, jsonSession);
		return session;
	}

	private static void applyBasicJsonValues(JsonSession jsonSession, Session session) {
		jsonSession.setId(session.getId());
		jsonSession.setName(session.getName());
		jsonSession.setCreationDate(DateUtil.localDateTimeAsString(session.getCreationDate()));
	}

	private static void applyBasicEntityValues(Session session, JsonSession jsonSession) {
		session.setId(jsonSession.getId());
		session.setName(jsonSession.getName());
		session.setCreationDate(DateUtil.stringAsLocalDateTime(jsonSession.getCreationDate()));
	}

	public static JsonSession toJson(Session session) {
		JsonSession jsonSession = new JsonSession();

		applyBasicJsonValues(jsonSession, session);

		List<Role> listRoles = session.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonSession.getRoles().add(toJson(loopRole));
			}
		}

		User user = session.getUser();
		if (user != null) {
			jsonSession.setUser(toJson(user));
		}
		return jsonSession;
	}

	public static Session apply(Session session, JsonSession jsonSession) {

		if (session == null)
			session = new Session();

		applyBasicEntityValues(session, jsonSession);

		ArrayList<JsonRole> listRoles = jsonSession.getRoles();
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				session.addRoles(toEntity(loopJsonRole));
			}
		}
		JsonUser user = jsonSession.getUser();
		if (user != null) {
			session.setUser(toEntity(user));
		}
		return session;

	}

	public static Session toEntity(JsonSession jsonSession) {
		Session session = new Session();

		return apply(session, jsonSession);
	}

	public static List<JsonSession> toListJsonSessions(List<Session> all) {
		List<JsonSession> jsonSessions = new ArrayList<JsonSession>();
		for (Session session : all) {
			jsonSessions.add(toJson(session));
		}
		return jsonSessions;
	}

	// converte de entidade para json --------------------
	private static JsonUser toBasicJson(User user) {
		JsonUser jsonUser = new JsonUser();
		applyBasicJsonValues(jsonUser, user);
		return jsonUser;
	}

	private static User toBasicEntity(JsonUser jsonUser) {
		User user = new User();
		applyBasicEntityValues(user, jsonUser);
		return user;
	}

	private static void applyBasicJsonValues(JsonUser jsonUser, User user) {
		jsonUser.setId(user.getId());
		jsonUser.setName(user.getName());
		jsonUser.setUsername(user.getUsername());
		jsonUser.setPassword(user.getPassword());
		jsonUser.setEnable(user.getEnable());
		jsonUser.setImage(user.getImage());
	}

	private static void applyBasicEntityValues(User user, JsonUser jsonUser) {
		user.setId(jsonUser.getId());
		user.setName(jsonUser.getName());
		user.setUsername(jsonUser.getUsername());
		user.setPassword(jsonUser.getPassword());
		user.setEnable(jsonUser.getEnable());
		user.setImage(jsonUser.getImage());
	}

	public static JsonUser toJson(User user) {
		JsonUser jsonUser = new JsonUser();

		applyBasicJsonValues(jsonUser, user);

		List<Role> listRoles = user.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonUser.getRoles().add(toJson(loopRole));
			}
		}

		Client owner = user.getOwner();
		if (owner != null) {
			jsonUser.setOwner(toJson(owner));
		}
		return jsonUser;
	}

	public static User apply(User user, JsonUser jsonUser) {

		if (user == null)
			user = new User();

		applyBasicEntityValues(user, jsonUser);

		ArrayList<JsonRole> listRoles = jsonUser.getRoles();
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				user.addRoles(toEntity(loopJsonRole));
			}
		}
		JsonClient owner = jsonUser.getOwner();
		if (owner != null) {
			user.setOwner(toEntity(owner));
		}
		return user;

	}

	public static User toEntity(JsonUser jsonUser) {
		User user = new User();

		return apply(user, jsonUser);
	}

	public static List<JsonUser> toListJsonUsers(List<User> all) {
		List<JsonUser> jsonUsers = new ArrayList<JsonUser>();
		for (User user : all) {
			jsonUsers.add(toJson(user));
		}
		return jsonUsers;
	}

}
