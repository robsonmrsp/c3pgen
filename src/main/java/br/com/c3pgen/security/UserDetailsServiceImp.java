package br.com.c3pgen.security;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.model.User;
import br.com.c3pgen.persistence.DaoUser;

@Named
@Transactional
public class UserDetailsServiceImp implements UserDetailsService {
	private final DaoUser userDao;
	private static int count;

	@Inject
	public UserDetailsServiceImp(DaoUser userDao) {
		if (userDao == null) {
			throw new IllegalArgumentException("calendarUserDao cannot be null");
		}
		this.userDao = userDao;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User appUser = userDao.findByUsername(username);
		if (appUser == null) {
			throw new UsernameNotFoundException("Invalid username...");
		}

		Collection<? extends GrantedAuthority> authorities = UserAuthorityUtils.createAuthorities(appUser);

		org.springframework.security.core.userdetails.User user = new org.springframework.security.core.userdetails.User(appUser.getUsername(), appUser.getPassword(), authorities);

		return user;
	}
}
