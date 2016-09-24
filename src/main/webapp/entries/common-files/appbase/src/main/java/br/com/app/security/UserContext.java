package ${application.rootPackage}.security;

import ${application.rootPackage}.model.User;

public interface UserContext {

	User getCurrentUser();

	String getCurrentUserName();
	
	void setCurrentUser(User user);
}
