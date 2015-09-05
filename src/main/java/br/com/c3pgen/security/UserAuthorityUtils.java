package br.com.c3pgen.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import br.com.c3pgen.model.Role;
import br.com.c3pgen.model.User;

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