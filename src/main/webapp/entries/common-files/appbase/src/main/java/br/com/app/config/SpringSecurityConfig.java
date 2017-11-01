package br.com.netflics.config;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//https://docs.spring.io/spring-security/site/docs/current/reference/html/jc.html
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Inject
	UserDetailsService userDetailsService;

	// <beans:bean id="encoder" class="org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder">
	// <beans:constructor-arg name="strength" value="11" />
	// </beans:bean>

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder(11));
	}

//	@Override
//	@Bean
//	protected AuthenticationManager authenticationManager() throws Exception {
//		// This bean is required for using method security annotations
//		return super.authenticationManager();
//	}

	// <http auto-config="true" use-expressions="true">
	// <intercept-url pattern="/index.jsp" access="isFullyAuthenticated()" />
	// <csrf disabled="true" />
	// <form-login login-processing-url="/j_spring_security_check" username-parameter="j_username" password-parameter="j_password" login-page="/login.html" default-target-url="/" authentication-failure-url="/login.html?login_error=1" />
	// <logout logout-url="/j_spring_security_logout" logout-success-url="/login.html" />
	//
	// <session-management invalid-session-url="/login.html" session-fixation-protection="newSession">
	// <concurrency-control expired-url="/login.html?erro=expirado" max-sessions="1" error-if-maximum-exceeded="false" />
	// </session-management>
	// </http>

//	@Override
	protected void configure(HttpSecurity http) throws Exception {

	    http
	    	.authorizeRequests()
	    		.antMatchers("/js/**", "/css/**", "/images/**", "fonts/**").permitAll()
	    		.antMatchers("/index.jsp").fullyAuthenticated()
	    		.antMatchers("/").fullyAuthenticated()
	            .and()
	            .formLogin()
	            	.loginPage("/login.html")//
	                //.loginPage( "/" )
	                .loginProcessingUrl( "/j_spring_security_check" )
					.usernameParameter("j_username")//
					.passwordParameter("j_password")//
	                .defaultSuccessUrl( "/" )
	                .failureUrl( "/loginfailed" )
	                .permitAll()
	            .and()
	            .userDetailsService(this.userDetailsService)//
	            .logout()
	                .logoutUrl( "/j_spring_security_logout" )
	                .logoutSuccessUrl( "/login.html" )
	                .invalidateHttpSession( true )
	            .and()
	            .exceptionHandling().accessDeniedPage( "/WEB-INF/pages/403.jsp" )
	            .and()
	            .csrf().disable()
	            ;
//	            .httpBasic();
	}
	
//	@Override
	protected void configu_re(HttpSecurity http) throws Exception {
		http//
				.authorizeRequests().antMatchers("/js/**", "/css/**", "/images/**", "fonts/**").permitAll()
				.anyRequest().authenticated() 
				.and()//
				.sessionManagement().invalidSessionUrl("/login.html")//
				.maximumSessions(1).expiredUrl("/login.html").maxSessionsPreventsLogin(true).and()//
				.sessionFixation().newSession().and()//
				.formLogin()//
				/**/.loginPage("/login.html")//
				.loginProcessingUrl("/j_spring_security_check")//
				.usernameParameter("j_username")//
				.passwordParameter("j_password")//
				.failureUrl("/login?error=1")//
				.defaultSuccessUrl("/", false).and()//
				.userDetailsService(this.userDetailsService)//
				.logout()//
				.logoutUrl("/j_spring_security_logout")//
				.logoutSuccessUrl("/login.html").invalidateHttpSession(true).and() // Permissions here
				.csrf().disable();
	}

}