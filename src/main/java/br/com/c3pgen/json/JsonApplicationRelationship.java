package br.com.c3pgen.json;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonApplicationRelationship {

	private Integer id;

	private JsonApplication application;

	public JsonRelationship source;

	public JsonRelationship target;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public JsonApplication getApplication() {
		return application;
	}

	public void setApplication(JsonApplication application) {
		this.application = application;
	}

	public JsonRelationship getSource() {
		return source;
	}

	public void setSource(JsonRelationship source) {
		this.source = source;
	}

	public JsonRelationship getTarget() {
		return target;
	}

	public void setTarguet(JsonRelationship targuet) {
		this.target = targuet;
	}

}
