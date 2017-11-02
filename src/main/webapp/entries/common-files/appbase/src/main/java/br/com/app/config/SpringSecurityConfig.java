package ${application.rootPackage}.config;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	@Inject
	UserDetailsService userDetailsService;

	@Inject
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder(11));
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

	    http
	    	.authorizeRequests()
	    		.antMatchers("/js/**", "/css/**", "/images/**", "fonts/**").permitAll()
	    		.antMatchers("/index.jsp").fullyAuthenticated()
	    		.antMatchers("/").fullyAuthenticated()
	            .and()
	            .formLogin()
	            	.loginPage("/login.html")//
	                .loginProcessingUrl( "/j_spring_security_check" )
					.usernameParameter("j_username")//
					.passwordParameter("j_password")//
	                .defaultSuccessUrl( "/" )
	                .failureUrl("/login.html?error=INVALID_USER_OR_PASSWORD" )
	                .permitAll()
	            .and()
	            .userDetailsService(this.userDetailsService)//
	            .logout()
	                .logoutUrl( "/j_spring_security_logout" )
	                .logoutSuccessUrl( "/login.html" )
	                .invalidateHttpSession( true )
	            .and()
	            .csrf().disable()
	            ;
	}

}