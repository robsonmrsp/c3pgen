package ${application.corePackage}.security;

import java.util.ArrayList;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import ${application.rootPackage}.model.User;
import ${application.rootPackage}.model.Role;

//deverá mudar quando tivermos que implementar autorização.
public final class UserAuthorityUtils {

	public static final List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();

	public static Collection<? extends GrantedAuthority> createAuthorities(User user) {
		List<Role> roles = user.getRoles();

		if (roles != null) {
			AUTHORITIES.clear();
			for (Role role : roles) {
				String authority = role.getAuthority();
				SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(authority);
				AUTHORITIES.add(simpleGrantedAuthority);
			}
		}
		return AUTHORITIES;
	}

	private UserAuthorityUtils() {

	}
}