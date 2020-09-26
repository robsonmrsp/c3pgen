package ${application.rootPackage}.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.aop.framework.autoproxy.BeanNameAutoProxyCreator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

<#if application.hasDocRestApi()>
import io.swagger.annotations.ApiOperation;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.BasicAuth;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
</#if>
import ${application.corePackage}.persistence.CatchThrowConstraintViolationException;
import ${application.corePackage}.rs.exception.SimpleErrorMessageHandlerExceptionResolver;
import ${application.corePackage}.serialization.CustomDoubleDeserializer;
import ${application.corePackage}.serialization.CustomLocalDateDeserializer;
import ${application.corePackage}.serialization.CustomLocalDateSerializer;
import ${application.corePackage}.serialization.CustomLocalDateTimeDeserializer;
import ${application.corePackage}.serialization.CustomLocalDateTimeSerializer;

@Configuration
@EnableWebMvc
<#if application.hasDocRestApi()>
@EnableSwagger2
</#if>
public class SpringMVCConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/login.html").addResourceLocations("/login.html");
        registry.addResourceHandler("/SpecRunner.html").addResourceLocations("/SpecRunner.html");
        registry.addResourceHandler("/vendor/**").addResourceLocations("/vendor/");
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
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
    
	@Bean
	public ViewResolver getViewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix("/WEB-INF/jsp/");
		resolver.setSuffix(".jsp");
		return resolver;
	}


    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
        exceptionResolvers.add(new SimpleErrorMessageHandlerExceptionResolver());
    }

    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver createMultipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setMaxInMemorySize(20971520);
        resolver.setMaxInMemorySize(1048576);

        return resolver;
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

    @Bean
    public BeanNameAutoProxyCreator autoProxyCreator() {
        BeanNameAutoProxyCreator autoProxyCreator = new BeanNameAutoProxyCreator();
        autoProxyCreator.setProxyTargetClass(true);
        autoProxyCreator.setBeanNames(new String[] { "*Service", "*ServiceImp" });
        autoProxyCreator.setInterceptorNames("afterThrow");

        return autoProxyCreator;
    }
    <#if application.hasDocRestApi()>
    @Bean
    public Docket createRestApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.securitySchemes(Arrays.asList(new BasicAuth("basicAuth")))
				.apiInfo(apiInfo())
				.select()
				.apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
				.paths(PathSelectors.any())
				.build();
	}
    private ApiInfo apiInfo() {
        ApiInfoBuilder apiInfoBuilder = new ApiInfoBuilder();
        apiInfoBuilder.title("Docs");
        apiInfoBuilder.description("Rest API Docs");
        apiInfoBuilder.contact(new Contact("Robson", "https://github.com/c3pgen", ""));
        apiInfoBuilder.version("1.0");
        return apiInfoBuilder.build();
    }
    </#if>
}