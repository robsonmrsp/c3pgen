package br.com.c3pgen.json;

public class JsonApplicationRelationship {

	private Integer id;

	private JsonApplication application;

	public JsonRelationship source;

	public JsonRelationship targuet;

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

	public JsonRelationship getTarguet() {
		return targuet;
	}

	public void setTarguet(JsonRelationship targuet) {
		this.targuet = targuet;
	}

}
