package ${application.corePackage}.security;

import ${application.rootPackage}.model.User;
/**
*  generated: ${.now}
**/

public interface UserContext {

	User getCurrentUser();

	String getCurrentUserName();
	
	void setCurrentUser(User user);
}
