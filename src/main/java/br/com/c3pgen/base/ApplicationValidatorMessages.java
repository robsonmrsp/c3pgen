package br.com.c3pgen.base;

import java.util.ArrayList;
import java.util.List;

public class ApplicationValidatorMessages {
	private List<String> messages = new ArrayList<String>();

	public Boolean addMessage(String msg) {
		return getMessages().add(msg);
	}

	public Boolean isEmpty() {
		return getMessages().isEmpty();
	}

	public Boolean isNotEmpty() {
		return !getMessages().isEmpty();
	}

	@Override
	public String toString() {
		String returnStr = "";
		for (String msg : getMessages()) {
			returnStr += msg + "\n";
		}
		return returnStr;
	}

	public List<String> getMessages() {
		return messages;
	}

	public void setMessages(List<String> messages) {
		this.messages = messages;
	}

}
