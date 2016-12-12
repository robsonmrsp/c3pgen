package br.com.c3pgen.json;

import br.com.c3pgen.base.ApplicationValidatorMessages;

public class JsonGenerateFileInfo {

	private ApplicationValidatorMessages applicationValidatorMessages;
	private String realFilePath;
	private String staticFilePath;
	private Boolean generateSuccess;
	private JsonApplication application;

	public ApplicationValidatorMessages getApplicationValidatorMessages() {
		return applicationValidatorMessages;
	}

	public void setApplicationValidatorMessages(ApplicationValidatorMessages applicationValidatorMessages) {
		this.applicationValidatorMessages = applicationValidatorMessages;
	}

	public String getRealFilePath() {
		return realFilePath;
	}

	public void setRealFilePath(String realFilePath) {
		this.realFilePath = realFilePath;
	}

	public String getStaticFilePath() {
		return staticFilePath;
	}

	public void setStaticFilePath(String staticFilePath) {
		this.staticFilePath = staticFilePath;
	}

	public Boolean getGenerateSuccess() {
		return generateSuccess;
	}

	public void setGenerateSuccess(Boolean generateSuccess) {
		this.generateSuccess = generateSuccess;
	}

	public JsonApplication getApplication() {
		return application;
	}

	public void setApplication(JsonApplication application) {
		this.application = application;
	}

}
