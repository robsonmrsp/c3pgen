package br.com.gvs.core.security;

import br.com.gvs.qualidade.model.User;

public interface UserContext {

	User getCurrentUser();

	String getCurrentUserName();
	
	void setCurrentUser(User user);
}
