package ${application.rootPackage}.config;

import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.google.common.collect.ImmutableList;

@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserDetailsService userDetailsService;

    @Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(11);
	};

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(ImmutableList.of("*"));
        configuration.setAllowedMethods(ImmutableList.of("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/js/**", "/css/**", "/images/**", "fonts/**").permitAll()
                .antMatchers("/").fullyAuthenticated()
				.antMatchers("/index").fullyAuthenticated()
                .antMatchers("/index.jsp").fullyAuthenticated()
                .antMatchers("/rs/**").fullyAuthenticated()
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
                .httpBasic()
                .and()
                .userDetailsService(this.userDetailsService)//
                .logout()
                    .logoutUrl( "/j_spring_security_logout" )
                    .logoutSuccessUrl( "/login.html" )
                    .invalidateHttpSession( true )
                .and()
                .cors()
                .and()
                .csrf().disable();
    }
}
