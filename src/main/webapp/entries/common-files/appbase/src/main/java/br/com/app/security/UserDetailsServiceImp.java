package ${application.corePackage}.security;

import java.util.Collection;


import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;

import ${application.rootPackage}.utils.Parser;

import ${application.rootPackage}.model.User;
import ${application.rootPackage}.persistence.DaoUser;

/**
*  generated: ${.now}
**/

@Named
@Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW)
public class UserDetailsServiceImp implements UserDetailsService {
	private final DaoUser userDao;

	@Inject
	public UserDetailsServiceImp(DaoUser userDao) {
		if (userDao == null) {
			throw new IllegalArgumentException("UserDao cannot be null");
		}
		this.userDao = userDao;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User appUser = userDao.findByUsername(username);
		if (appUser == null) {
			throw new UsernameNotFoundException("Invalid username...");
		}
		Parser.toJson(appUser);// somente para forcar os gets e carregar TODO o
		return appUser;
	}
}