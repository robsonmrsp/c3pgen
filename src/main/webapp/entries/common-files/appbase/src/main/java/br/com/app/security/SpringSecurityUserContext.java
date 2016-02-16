package ${application.rootPackage}.security;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import ${application.rootPackage}.model.User;
import ${application.rootPackage}.persistence.DaoUser;

@Named
public class SpringSecurityUserContext implements UserContext {
	private Collection<? extends GrantedAuthority> credentials;

	@Inject
	DaoUser daoUser;

	@Override
	public String  getCurrentUserName() {
		SecurityContext context = SecurityContextHolder.getContext();
		Authentication authentication = context.getAuthentication();
		if (authentication == null) {
			return null;
		}
		org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
		if(user != null)
			return user.getUsername();
		return "USER_NOT_IN_SESSION";
	}
	public User getCurrentUser() {
		return daoUser.findByUsername(getCurrentUserName());
	}

	@Override
	public void setCurrentUser(User user) {
		if (user == null) {
			throw new IllegalArgumentException("user cannot be null");
		}
		Collection<? extends GrantedAuthority> authorities = UserAuthorityUtils.createAuthorities(user);
		setCredentials(authorities);

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, user.getPassword(), authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	private void setCredentials(Collection<? extends GrantedAuthority> credentials) {
		this.credentials = credentials;
	}

	public Collection<? extends GrantedAuthority> getUserCredentials() {
		return credentials;
	}
}
