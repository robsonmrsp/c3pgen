package ${application.corePackage}.json;

import java.io.Serializable;

public class JsonOk implements Serializable{

	private final Serializable resp;

	public JsonOk(Serializable resp) {
		this.resp = resp;

	}

	public Serializable getResp() {
		return resp;
	}
}