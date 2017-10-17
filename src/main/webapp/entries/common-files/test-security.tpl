<?xml version="1.0" encoding="UTF-8"?>
<beans:beans xmlns="http://www.springframework.org/schema/security" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:beans="http://www.springframework.org/schema/beans" xmlns:sec="http://www.springframework.org/schema/security"
	xsi:schemaLocation="http://www.springframework.org/schema/security http://www.springframework.org/schema/security/spring-security-4.2.xsd
 					    http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd">
	<http auto-config="true" use-expressions="true">
		<intercept-url pattern="/index.jsp" access="isFullyAuthenticated()" />
		<csrf disabled="true" />
		<form-login login-processing-url="/j_spring_security_check" username-parameter="j_username" password-parameter="j_password" login-page="/login.html" default-target-url="/" authentication-failure-url="/login.html?login_error=1" />
		<logout logout-url="/j_spring_security_logout" logout-success-url="/login.html" />

		<session-management invalid-session-url="/login.html" session-fixation-protection="newSession">
			<concurrency-control expired-url="/login.html?erro=expirado" max-sessions="1" error-if-maximum-exceeded="false" />
		</session-management>
	</http>

	<authentication-manager>
		<authentication-provider user-service-ref="userDetailsServiceImp">
			<password-encoder ref="encoder" />
		</authentication-provider>
	</authentication-manager>

	<beans:bean id="encoder" class="org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder">
		<beans:constructor-arg name="strength" value="11" />
	</beans:bean>
</beans:beans>