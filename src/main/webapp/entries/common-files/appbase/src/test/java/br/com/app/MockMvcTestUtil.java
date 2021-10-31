package ${application.rootPackage}.util;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import ${application.rootPackage}.model.User;

public class MockMvcTestUtil {

	private static UsernamePasswordAuthenticationToken getPrincipal() {

		User user = new User(); // this.userDetailsService.loadUserByUsername(username);
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());
		return authentication;
	}

	public static MockHttpSession getSession() {

		UsernamePasswordAuthenticationToken principal = getPrincipal();

		MockHttpSession session = new MockHttpSession();
		session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, new MockSecurityContext(principal));

		return session;
	}

}
