package br.com.netflics.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.inject.Inject;

import org.hibernate.SessionFactory;
import org.springframework.aop.framework.autoproxy.BeanNameAutoProxyCreator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter;
import org.springframework.orm.hibernate5.support.OpenSessionInViewInterceptor;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import br.com.netflics.core.persistence.CatchThrowConstraintViolationException;
import br.com.netflics.core.rs.exception.SimpleErrorMessageHandlerExceptionResolver;
import br.com.netflics.core.serialization.CustomDoubleDeserializer;
import br.com.netflics.core.serialization.CustomLocalDateDeserializer;
import br.com.netflics.core.serialization.CustomLocalDateSerializer;
import br.com.netflics.core.serialization.CustomLocalDateTimeDeserializer;
import br.com.netflics.core.serialization.CustomLocalDateTimeSerializer;

@EnableWebMvc
@ComponentScan(basePackages = "br.com.netflics")
public class SpringMVCConfig extends WebMvcConfigurerAdapter {

	@Inject
	OpenSessionInViewInterceptor interceptor;

	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/login.html").addResourceLocations("/login.html");
		registry.addResourceHandler("/SpecRunner.html").addResourceLocations("/SpecRunner.html");
		registry.addResourceHandler("/vendor/**").addResourceLocations("/vendor/");
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		registry.addResourceHandler("/applets/**").addResourceLocations("/applets/");
		registry.addResourceHandler("/c/**").addResourceLocations("/c/");
		registry.addResourceHandler("/css/**").addResourceLocations("/css/");
		registry.addResourceHandler("/decorators/**").addResourceLocations("/decorators/");
		registry.addResourceHandler("/downloads/**").addResourceLocations("/downloads/");
		registry.addResourceHandler("/fonts/**").addResourceLocations("/fonts/");
		registry.addResourceHandler("/sounds/**").addResourceLocations("/sounds/");
		registry.addResourceHandler("/images/**").addResourceLocations("/images/");
		registry.addResourceHandler("/javascript/**").addResourceLocations("/javascript/");
		registry.addResourceHandler("/js/**").addResourceLocations("/js/");
		registry.addResourceHandler("/j/**").addResourceLocations("/j/");
		registry.addResourceHandler("/uploads/**").addResourceLocations("/uploads/");
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.jsp");
	}

	@Bean
	public HandlerExceptionResolver customExceptionResolver() {
		return new SimpleErrorMessageHandlerExceptionResolver();
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver createMultipartResolver() {
		CommonsMultipartResolver resolver = new CommonsMultipartResolver();
		resolver.setMaxInMemorySize(20971520);
		resolver.setMaxInMemorySize(1048576);

		return resolver;
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addWebRequestInterceptor(interceptor);
	}

	@Bean
	public OpenSessionInViewInterceptor openSessionInViewInterceptor(SessionFactory sf) {
		final OpenSessionInViewInterceptor tor = new OpenSessionInViewInterceptor();
		tor.setSessionFactory(sf);
		return tor;
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder() //
				.indentOutput(true) //

				.deserializerByType(LocalDate.class, new CustomLocalDateDeserializer())//
				.deserializerByType(LocalDateTime.class, new CustomLocalDateTimeDeserializer())//
				.deserializerByType(Double.class, new CustomDoubleDeserializer())//
				//
				.serializerByType(LocalDate.class, new CustomLocalDateSerializer())//
				.serializerByType(LocalDateTime.class, new CustomLocalDateTimeSerializer())//
		;//
		 converters.add(new MappingJackson2HttpMessageConverter(builder.build()));
		 converters.add(new MappingJackson2XmlHttpMessageConverter(Jackson2ObjectMapperBuilder.xml().build()));
	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	@Bean(name = "afterThrow")
	public CatchThrowConstraintViolationException afterThrow() {
		return new CatchThrowConstraintViolationException();
	}

	/**
	 * <code>
	 * 	<bean id="afterThrow" class="br.com.netflics.core.persistence.CatchThrowConstraintViolationException" />
	<bean class="org.springframework.aop.framework.autoproxy.BeanNameAutoProxyCreator">
		<property name="proxyTargetClass" value="true" />
		<property name="beanNames">
			<list>
				<value>*Service</value>
				<value>*ServiceImp</value>
			</list>
		</property>
		<property name="interceptorNames">
			<list>
				<value>afterThrow</value>
			</list>
		</property>
	</bean>
	 * </code>
	 * 
	 * @return
	 */
	@Bean
	public BeanNameAutoProxyCreator autoProxyCreator() {
		BeanNameAutoProxyCreator autoProxyCreator = new BeanNameAutoProxyCreator();
		autoProxyCreator.setProxyTargetClass(true);
		autoProxyCreator.setBeanNames(new String[] { "*Service", "*ServiceImp" });
		autoProxyCreator.setInterceptorNames("afterThrow");

		return autoProxyCreator;
	}

}