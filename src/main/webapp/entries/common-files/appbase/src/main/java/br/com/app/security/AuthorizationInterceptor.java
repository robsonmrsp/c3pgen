package ${application.corePackage}.security;


import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
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

import br.com.locadora.model.User;

public class AuthorizationInterceptor extends AbstractPhaseInterceptor<Message> {

	@Autowired
	UserDetailsService userServiceDetailsService;

	@Autowired
	AuthorizationService authorizationService;

	// UserContext context;
	// @Autowired

	public AuthorizationInterceptor() {
		super(Phase.POST_PROTOCOL);
	}

	public void handleMessage(Message message) throws Fault {
		printMessage(message);
		String requestURI = (String) message.get(Message.REQUEST_URL);
		// Map<String, List> headers = (Map<String, List>)
		// message.get(Message.PROTOCOL_HEADERS);
		Boolean authorizedAccess = authorizationService.authorizedAccess(requestURI);
		try {
			// System.out.println(headers);
			// System.out.println("BasicInterceptor.handleMessage() " +
			// headers.get("Authorization"));

			// String userName =
			// getUserNameFromToken(headers.get("Authorization"));
			// String userPass =
			// getPassNameFromToken(headers.get("Authorization"));

			// org.springframework.security.core.userdetails.User principal =
			// (org.springframework.security.core.userdetails.User)
			// SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			// System.out.println("AccountNonExpired: " +
			// principal.isAccountNonExpired());
			// System.out.println("CredentialsNonExpired: " +
			// principal.isCredentialsNonExpired());
			// System.out.println("Authorities: " + principal.getAuthorities());
			// // basic authentication
			// UserDetails loadUserByUsername =
			// userServiceDetailsService.loadUserByUsername(principal.getUsername());
			// System.out.println("AuthInterceptor.handleMessage()" +
			// loadUserByUsername);

			// if (userName != null) {

			// UserDetails userDetails =
			// userServiceDetailsService.loadUserByUsername(userName);

			// UsernamePasswordAuthenticationToken authentication = new
			// UsernamePasswordAuthenticationToken(userDetails, null,
			// userDetails.getAuthorities());
			// SecurityContextHolder.getContext().setAuthentication(authentication);

			// } else {
			// User currentUser = context.getCurrentUser();
			// if (currentUser != null) {
			// System.out.println("AuthInterceptor.handleMessage()" +
			// currentUser);
			// return;
			// }
			// }

		} catch (Exception ce) {
			throw new Fault(ce);
		}
		if (authorizedAccess)
			throw new AccessDeniedException("Unauthorized");
	}

	private void printMessage(Message message) {
		System.out.println("TRANSPORT " + message.get(Message.TRANSPORT));
		System.out.println("REST_MESSAGE " + message.get(Message.REST_MESSAGE));
		System.out.println("REQUESTOR_ROLE " + message.get(Message.REQUESTOR_ROLE));
		System.out.println("INBOUND_MESSAGE " + message.get(Message.INBOUND_MESSAGE));
		System.out.println("INVOCATION_CONTEXT " + message.get(Message.INVOCATION_CONTEXT));
		System.out.println("SERVICE_OBJECT " + message.get(Message.SERVICE_OBJECT));
		System.out.println("MIME_HEADERS " + message.get(Message.MIME_HEADERS));
		System.out.println("ASYNC_POST_RESPONSE_DISPATCH " + message.get(Message.ASYNC_POST_RESPONSE_DISPATCH));
		System.out.println("DECOUPLED_CHANNEL_MESSAGE " + message.get(Message.DECOUPLED_CHANNEL_MESSAGE));
		System.out.println("PARTIAL_RESPONSE_MESSAGE " + message.get(Message.PARTIAL_RESPONSE_MESSAGE));
		System.out.println("EMPTY_PARTIAL_RESPONSE_MESSAGE " + message.get(Message.EMPTY_PARTIAL_RESPONSE_MESSAGE));
		System.out.println("ONE_WAY_REQUEST " + message.get(Message.ONE_WAY_REQUEST));
		System.out.println("PROCESS_ONEWAY_RESPONSE " + message.get(Message.PROCESS_ONEWAY_RESPONSE));
		System.out.println("THREAD_CONTEXT_SWITCHED " + message.get(Message.THREAD_CONTEXT_SWITCHED));
		System.out.println("ROBUST_ONEWAY " + message.get(Message.ROBUST_ONEWAY));
		System.out.println("HTTP_REQUEST_METHOD " + message.get(Message.HTTP_REQUEST_METHOD));
		System.out.println("REQUEST_URI " + message.get(Message.REQUEST_URI));
		System.out.println("REQUEST_URL " + message.get(Message.REQUEST_URL));
		System.out.println("PROTOCOL_HEADERS " + message.get(Message.PROTOCOL_HEADERS));
		System.out.println("RESPONSE_CODE " + message.get(Message.RESPONSE_CODE));
		System.out.println("ENDPOINT_ADDRESS " + message.get(Message.ENDPOINT_ADDRESS));
		System.out.println("PATH_INFO " + message.get(Message.PATH_INFO));
		System.out.println("QUERY_STRING " + message.get(Message.QUERY_STRING));
		System.out.println("PROPOGATE_EXCEPTION " + message.get(Message.PROPOGATE_EXCEPTION));
		System.out.println("MTOM_ENABLED " + message.get(Message.MTOM_ENABLED));
		System.out.println("MTOM_THRESHOLD " + message.get(Message.MTOM_THRESHOLD));
		System.out.println("SCHEMA_VALIDATION_ENABLED " + message.get(Message.SCHEMA_VALIDATION_ENABLED));
		System.out.println("FAULT_STACKTRACE_ENABLED " + message.get(Message.FAULT_STACKTRACE_ENABLED));
		System.out.println("EXCEPTION_MESSAGE_CAUSE_ENABLED " + message.get(Message.EXCEPTION_MESSAGE_CAUSE_ENABLED));
		System.out.println("EXCEPTION_CAUSE_SUFFIX " + message.get(Message.EXCEPTION_CAUSE_SUFFIX));
		System.out.println("CONTENT_TYPE " + message.get(Message.CONTENT_TYPE));
		System.out.println("ACCEPT_CONTENT_TYPE " + message.get(Message.ACCEPT_CONTENT_TYPE));
		System.out.println("BASE_PATH " + message.get(Message.BASE_PATH));
		System.out.println("ENCODING " + message.get(Message.ENCODING));
		System.out.println("FIXED_PARAMETER_ORDER " + message.get(Message.FIXED_PARAMETER_ORDER));
		System.out.println("MAINTAIN_SESSION " + message.get(Message.MAINTAIN_SESSION));
		System.out.println("ATTACHMENTS " + message.get(Message.ATTACHMENTS));
		System.out.println("WSDL_DESCRIPTION " + message.get(Message.WSDL_DESCRIPTION));
		System.out.println("WSDL_SERVICE " + message.get(Message.WSDL_SERVICE));
		System.out.println("WSDL_PORT " + message.get(Message.WSDL_PORT));
		System.out.println("WSDL_INTERFACE " + message.get(Message.WSDL_INTERFACE));
		System.out.println("WSDL_OPERATION " + message.get(Message.WSDL_OPERATION));
		System.out.println("IN_INTERCEPTORS " + message.get(Message.IN_INTERCEPTORS));
		System.out.println("OUT_INTERCEPTORS " + message.get(Message.OUT_INTERCEPTORS));
		System.out.println("FAULT_IN_INTERCEPTORS " + message.get(Message.FAULT_IN_INTERCEPTORS));
		System.out.println("FAULT_OUT_INTERCEPTORS " + message.get(Message.FAULT_OUT_INTERCEPTORS));
		System.out.println("INTERCEPTOR_PROVIDERS " + message.get(Message.INTERCEPTOR_PROVIDERS));
		System.out.println("CONNECTION_TIMEOUT " + message.get(Message.CONNECTION_TIMEOUT));
		System.out.println("RECEIVE_TIMEOUT " + message.get(Message.RECEIVE_TIMEOUT));
	}

	public static String getUserNameFromToken(List list) {
		String username = null;
		String authorization = "";
		if ((list != null && list.size() > 0)) {
			authorization = (String) list.get(0);
		}

		try {

			if (authorization != null && authorization.startsWith("Basic")) {
				// Authorization: Basic base64credentials
				String base64Credentials = authorization.substring(6).trim();
				String credentials;
				credentials = new String(Base64.decodeBase64(base64Credentials.getBytes("UTF-8")));
				// credentials = username:password
				final String[] values = credentials.split(":", 2);
				username = values[0];
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return username;
	}

	public static String getPassNameFromToken(List list) {
		// TODO Auto-generated method stub
		return null;
	}

}
