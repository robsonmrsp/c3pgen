package br.com.c3pgen.security;

import br.com.c3pgen.model.User;

public interface UserContext {

	User getCurrentUser();

	void setCurrentUser(User user);
}
