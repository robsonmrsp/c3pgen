<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:tx="http://www.springframework.org/schema/tx" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:jaxrs="http://cxf.apache.org/jaxrs" xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop" xmlns:jdbc="http://www.springframework.org/schema/jdbc"

	xsi:schemaLocation="
					http://www.springframework.org/schema/beans 
					http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
					http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd
					http://cxf.apache.org/jaxrs
					http://cxf.apache.org/schemas/jaxrs.xsd
					http://www.springframework.org/schema/tx 
					http://www.springframework.org/schema/tx/spring-tx-4.3.xsd 
					http://www.springframework.org/schema/aop 
					http://www.springframework.org/schema/aop/spring-aop-4.3.xsd 
					http://www.springframework.org/schema/context  
					http://www.springframework.org/schema/context/spring-context-4.3.xsd
					http://www.springframework.org/schema/jdbc 
					http://www.springframework.org/schema/jdbc/spring-jdbc-4.3.xsd 
					">
	<import resource="classpath:META-INF/cxf/cxf.xml" />
	<tx:annotation-driven />
	<context:property-placeholder />
	<context:annotation-config />
	
	
	<!-- CXF Swagger2Feature -->
	<bean id="swagger2Feature" class="org.apache.cxf.jaxrs.swagger.Swagger2Feature"> </bean>

	<jaxrs:server address="/" basePackages="${application.rootPackage}.rs,${application.corePackage}.rs, ${application.corePackage}.security">
		<jaxrs:providers>
			<bean class="com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider" />
			<bean class="${application.corePackage}.rs.exception.ExceptionHandler" />
		</jaxrs:providers>
		<jaxrs:inInterceptors>
			<bean class="${application.corePackage}.security.AuthorizationInterceptor" />
		</jaxrs:inInterceptors>
		<jaxrs:features>
			<ref bean="swagger2Feature" />
		</jaxrs:features>
	</jaxrs:server>

	<context:annotation-config />
	<context:component-scan base-package="${application.rootPackage}" />

	<jdbc:initialize-database ignore-failures="ALL">
		<jdbc:script location="classpath:db/seed.sql" />
		<jdbc:script location="classpath:db/rbac.sql" />
	</jdbc:initialize-database>

	<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource"
		destroy-method="close">
		<property name="driverClass" value="org.postgresql.Driver" />
		<property name="jdbcUrl" value="jdbc:postgresql://localhost:5432/db_${lowercase(application.appName)}" />
		<property name="user" value="postgres" />
		<property name="password" value="sints" />

		<property name="acquireIncrement" value="10" />
		<property name="minPoolSize" value="10" />
		<property name="maxPoolSize" value="80" />
		<property name="maxIdleTime" value="200" />
	</bean>


	<bean id="transactionManager"
		class="org.springframework.orm.hibernate5.HibernateTransactionManager">
		<property name="sessionFactory" ref="sessionFactory" />
	</bean>

	<bean id="sessionFactory"
		class="org.springframework.orm.hibernate5.LocalSessionFactoryBean"
		scope="singleton">
		<property name="dataSource" ref="dataSource" />
		<property name="packagesToScan" value="${application.rootPackage}.model, ${application.corePackage}.model" />

		<property name="hibernateProperties">
			<props>
				<prop key="hibernate.dialect">org.hibernate.dialect.PostgreSQL82Dialect	</prop>
				<prop key="hibernate.format_sql">true</prop>
				<prop key="hibernate.show_sql">true</prop>
				<prop key="hibernate.hbm2ddl.auto">update</prop>
				<prop key="hibernate.transaction.flush_before_completion">true</prop>
			</props>
		</property>
	</bean>
	<bean id="afterThrow" class="${application.corePackage}.persistence.CatchThrowConstraintViolationException" />
	<bean
		class="org.springframework.aop.framework.autoproxy.BeanNameAutoProxyCreator">
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
</beans>