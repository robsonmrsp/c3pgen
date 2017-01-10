package ${application.corePackage}.security;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import ${application.rootPackage}.model.Item;
import ${application.rootPackage}.model.Permission;
import ${application.rootPackage}.model.Role;
import ${application.rootPackage}.model.User;


@Named
public class AuthorizationService {

	@Inject
	UserContext context;

	public Boolean authorizedAccess(String requestURI) {
		User currentUser = context.getCurrentUser();

		List<Role> roles = currentUser.getRoles();
		for (Role role : roles) {
			List<Permission> permissions = role.getPermissions();
			for (Permission permission : permissions) {
				Item item = permission.getItem();

				item.getItemType();
				if (item.getIdentifier().matches(requestURI)) {
					return Boolean.TRUE;
				}
			}
		}

		return Boolean.FALSE;
	}
}
