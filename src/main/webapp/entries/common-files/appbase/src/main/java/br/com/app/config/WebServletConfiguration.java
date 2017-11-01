package br.com.netflics.config;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.DispatcherServlet;

import com.thetransactioncompany.cors.CORSFilter;

public class WebServletConfiguration implements WebApplicationInitializer {

	public void onStartup(ServletContext ctx) throws ServletException {
		AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
		webCtx.register(SpringConfig.class);
		
		webCtx.setServletContext(ctx);

		FilterRegistration.Dynamic filter = ctx.addFilter("CORS", new CORSFilter());// ("dispatcher", new DispatcherServlet(webCtx));
		filter.setInitParameter("cors.allowOrigin", "*");
		filter.setInitParameter("cors.allowSubdomains", "true");
		filter.setInitParameter("cors.supportedMethods", "GET, POST, PUT, DELETE, OPTIONS");

		ServletRegistration.Dynamic servlet = ctx.addServlet("dispatcher", new DispatcherServlet(webCtx));
		servlet.setLoadOnStartup(1);
		servlet.addMapping("/");

		// FilterRegistration.Dynamic filterSecurity = ctx.addFilter("springSecurityFilterChain", new DelegatingFilterProxy());
		// filterSecurity.add

	}
}