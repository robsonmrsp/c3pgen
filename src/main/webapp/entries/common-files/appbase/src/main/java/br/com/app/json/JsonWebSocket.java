package ${application.corePackage}.json;

import java.io.Serializable;

public class JsonWebSocket implements Serializable {
	private static final long serialVersionUID = -7058328429722537703L;
	// key
	private String panelId;
	private String value;

	public JsonWebSocket() {
	}

	public String getPanelId() {
		return panelId;
	}

	public void setPanelId(String panelId) {
		this.panelId = panelId;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
