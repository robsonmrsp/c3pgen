package br.com.c3pgen.base;

public class GenerateFileInfo {

	private ApplicationValidatorMessages applicationValidatorMessages;
	private String realFilePath;
	private String staticFilePath;
	private Boolean generateSuccess;

	public String getRealFilePath() {
		return realFilePath;
	}

	public String getStaticFilePath() {
		return staticFilePath;
	}

	public void setRealFilePath(String path) {
		this.realFilePath = path;

	}

	public void setStaticFilePath(String webPath) {
		this.staticFilePath = webPath;
	}

	public ApplicationValidatorMessages getApplicationValidatorMessages() {
		return applicationValidatorMessages;
	}

	public void setApplicationValidatorMessages(ApplicationValidatorMessages applicationValidatorMessages) {
		this.applicationValidatorMessages = applicationValidatorMessages;
	}

	public void setGenerateSuccess(Boolean success) {
		this.generateSuccess = success;
	}

	public Boolean getGenerateSuccess() {
		return generateSuccess != null ? generateSuccess : Boolean.FALSE;
	}
}
