package br.com.c3pgen.json;

import java.io.Serializable;

import org.apache.commons.lang3.exception.ExceptionUtils;

//TODO O que fazer com essa classe de modo que o cliente possa usufruir das mensages
public class JsonError implements Serializable {
	private static final long serialVersionUID = 1L;
	private String errorCode;
	private String errorMessage;
	private Object returnObjectError;
	private String legalMessage;

	public JsonError(Exception error, String legalMessage) {
		this(ExceptionUtils.getStackTrace(error), legalMessage);
	}

	public JsonError(String errorMessage, String leString) {
		this(errorMessage, null, leString);
	}

	public JsonError(String errorMessage, Object returnObject) {
		this(errorMessage, returnObject, "");
	}

	public JsonError(Exception e, String errorMessage, Object returnObject, String legalMessage) {
		this(ExceptionUtils.getStackTrace(e) + " " + errorMessage, returnObject, legalMessage);
	}

	public JsonError(String errorMessage, Object returnObject, String legalMessage) {
		setErrorMessage(errorMessage);
		setLegalMessage(legalMessage);
		setReturnObjectError(returnObject);
	}

	public JsonError() {

	}

	public JsonError(Exception e, String errorMessage, Object returnObject) {

		this(ExceptionUtils.getStackTrace(e) + " " + errorMessage, returnObject, null);
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		if (errorMessage.length() > 2000) {
			this.errorMessage = errorMessage.substring(0, 2000);
		} else {
			this.errorMessage = errorMessage;
		}
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public Object getReturnObjectError() {
		return returnObjectError;
	}

	public void setReturnObjectError(Object returnObject) {
		this.returnObjectError = returnObject;
	}

	public String getLegalMessage() {
		return legalMessage;
	}

	public void setLegalMessage(String legalMessage) {
		this.legalMessage = legalMessage;
	}
}
