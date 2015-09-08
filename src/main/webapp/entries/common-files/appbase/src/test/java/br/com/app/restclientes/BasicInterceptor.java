package ${application.rootPackage}.restclientes;

import java.util.List;
import java.util.Map;

import org.apache.cxf.interceptor.Fault;
import org.apache.cxf.interceptor.security.AccessDeniedException;
import org.apache.cxf.message.Message;
import org.apache.cxf.phase.AbstractPhaseInterceptor;
import org.apache.cxf.phase.Phase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class BasicInterceptor extends AbstractPhaseInterceptor<Message> {

	@Autowired
	UserDetailsService userServiceDetailsService;

	public BasicInterceptor() {
		super(Phase.POST_PROTOCOL);
	}

	public void handleMessage(Message message) throws Fault {

		Map<String, List> headers = (Map<String, List>) message.get(Message.PROTOCOL_HEADERS);
		try {
			System.out.println(headers);
			System.out.println("BasicInterceptor.handleMessage() " + headers.get("Authorization"));

			String userName = TokenUtils.getUserNameFromToken(headers.get("Authorization"));
			String userPass = TokenUtils.getPassNameFromToken(headers.get("Authorization"));

			if (userName != null) {

				UserDetails userDetails = userServiceDetailsService.loadUserByUsername(userName);

				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

				SecurityContextHolder.getContext().setAuthentication(authentication);
				return;
			}

		} catch (Exception ce) {
			throw new Fault(ce);
		}

		throw new AccessDeniedException("Unauthorized");
	}
}
