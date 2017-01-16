package br.com.locadora.core.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.transaction.annotation.Transactional;

import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;

import ${application.rootPackage}.model.Group;
import ${application.rootPackage}.model.Item;
import ${application.rootPackage}.model.Permission;
import ${application.rootPackage}.model.Role;
import ${application.rootPackage}.model.User;

@Named
@Transactional
public class AuthorizationServiceImp implements AuthorizationService {

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

	public List<Permission> getAllPermissions() {
		User currentUser = context.getCurrentUser();

		List<Permission> permitions = new ArrayList<Permission>();

		for (Role role : currentUser.getRoles()) {
			for (Group group : role.getGroups()) {
				permitions.addAll(group.getPermissions());
			}
		}
		return permitions;
	}

	public Boolean authorizedAccess(final String type, final String identifier) {
		Boolean authorize = Boolean.FALSE;
		List<Permission> allPermissions = getAllPermissions();

		Predicate<Permission> predicate = new Predicate<Permission>() {
			@Override
			public boolean apply(Permission permission) {
				if (permission.getItem() != null && permission.getItem().getItemType() != null)
					return permission.getItem().getItemType().equals(type);
				else
					return false;
			}
		};
		Collection<Permission> collectionPermissions = Collections2.filter(allPermissions, predicate);

		if (type.equals("SCREEN")) {
			for (Permission permission : collectionPermissions) {
				Item item = permission.getItem();
				if (item != null && identifier.matches(item.getIdentifier())) {
					return Boolean.TRUE;
				}
			}
		}

		return authorize;
	}
}
