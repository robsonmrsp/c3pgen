package ${application.corePackage}.security;


import ${application.rootPackage}.model.Group;
import ${application.rootPackage}.model.Item;
import ${application.rootPackage}.model.Permission;
import ${application.rootPackage}.model.Role;
import ${application.rootPackage}.model.User;


public interface AuthorizationService {

	public Boolean authorizedAccess(String requestURI) ;

	public List<Permission> getAllPermissions(); 
	
	public Boolean authorizedAccess(final String type, final String identifier); 
	
}
