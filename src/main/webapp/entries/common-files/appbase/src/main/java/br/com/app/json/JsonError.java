package ${application.rootPackage}.json;

import java.io.Serializable;

//TODO O que fazer com essa classe de modo que o cliente possa usufruir das mensages
public class JsonError implements Serializable {
	private static final long serialVersionUID = 1L;
	private String errorCode;
	private String errorMessage;
	private Object parameters;
	private String legalMessage;

	public JsonError(String errorMessage, Object parameters) {
		super();
		this.errorMessage = errorMessage;
		this.parameters = parameters;
	}

	public JsonError(String errorMessage, Object parameters, String legalMessage) {
		this(errorMessage, parameters);
		setLegalMessage(legalMessage);
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public Object getParameters() {
		return parameters;
	}

	public void setParameters(Object parameters) {
		this.parameters = parameters;
	}

	public String getLegalMessage() {
		return legalMessage;
	}

	public void setLegalMessage(String legalMessage) {
		this.legalMessage = legalMessage;
	}
}
