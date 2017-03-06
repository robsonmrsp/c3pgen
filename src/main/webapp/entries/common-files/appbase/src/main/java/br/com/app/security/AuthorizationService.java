package ${application.corePackage}.security;

import java.util.List;

import ${application.rootPackage}.model.Item;
import ${application.rootPackage}.model.Permission;
import ${application.rootPackage}.model.Role;
import ${application.rootPackage}.model.User;

/**
*  generated: ${.now}
**/

public interface AuthorizationService {


	public Boolean authorizeRestServiceAccess(String method, String requestURI);

	public List<Permission> getAllPermissions();

	public Boolean authorizeWebComponentsAccess(final String type, final String identifier);

	
}