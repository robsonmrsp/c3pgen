package ${application.rootPackage}.security;

import ${application.rootPackage}.model.User;

public interface UserContext {

	User getCurrentUser();

	void setCurrentUser(User user);
}
