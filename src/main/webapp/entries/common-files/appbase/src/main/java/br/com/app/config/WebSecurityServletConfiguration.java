package ${application.rootPackage}.config;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import com.thetransactioncompany.cors.CORSFilter;

public class WebSecurityServletConfiguration extends AbstractSecurityWebApplicationInitializer {

	public void afterSpringSecurityFilterChain(ServletContext ctx) {
		AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
		webCtx.register(SpringMVCConfig.class);

		webCtx.setServletContext(ctx);

		FilterRegistration.Dynamic filter = ctx.addFilter("CORS", new CORSFilter());
		filter.setInitParameter("cors.allowOrigin", "*");
		filter.setInitParameter("cors.allowSubdomains", "true");
		filter.setInitParameter("cors.supportedMethods", "GET, POST, PUT, DELETE, OPTIONS");

		ServletRegistration.Dynamic servlet = ctx.addServlet("dispatcher", new DispatcherServlet(webCtx));
		servlet.setLoadOnStartup(1);
		servlet.addMapping("/");
	}
}