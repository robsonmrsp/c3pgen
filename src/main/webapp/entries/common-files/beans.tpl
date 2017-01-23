<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:tx="http://www.springframework.org/schema/tx" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:jaxrs="http://cxf.apache.org/jaxrs" xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop" xmlns:jdbc="http://www.springframework.org/schema/jdbc"

	xsi:schemaLocation="
					http://www.springframework.org/schema/beans 
					http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
					http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.0.xsd
					http://cxf.apache.org/jaxrs
					http://cxf.apache.org/schemas/jaxrs.xsd
					http://www.springframework.org/schema/tx 
					http://www.springframework.org/schema/tx/spring-tx-4.0.xsd 
					http://www.springframework.org/schema/aop 
					http://www.springframework.org/schema/aop/spring-aop-4.0.xsd 
					http://www.springframework.org/schema/context  
					http://www.springframework.org/schema/context/spring-context-4.0.xsd
					http://www.springframework.org/schema/jdbc 
					http://www.springframework.org/schema/jdbc/spring-jdbc-4.0.xsd 
					">
	<import resource="classpath:META-INF/cxf/cxf.xml" />
	<tx:annotation-driven />
	<context:property-placeholder />
	<context:annotation-config />
	<bean
		class="org.springframework.web.context.support.ServletContextPropertyPlaceholderConfigurer" />
	<bean
		class="org.springframework.beans.factory.config.PreferencesPlaceholderConfigurer" />
	<jaxrs:server address="/" basePackages="${application.rootPackage}.rs,${application.corePackage}.rs, ${application.corePackage}.security">
		<jaxrs:providers>
			<bean class="com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider" />
			<bean class="${application.corePackage}.rs.exception.ExceptionHandler" />
		</jaxrs:providers>
		<jaxrs:inInterceptors>
			<bean class="${application.corePackage}.security.AuthorizationInterceptor" />
		</jaxrs:inInterceptors>
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
		class="org.springframework.orm.hibernate4.HibernateTransactionManager">
		<property name="sessionFactory" ref="sessionFactory" />
	</bean>

	<bean id="sessionFactory"
		class="org.springframework.orm.hibernate4.LocalSessionFactoryBean"
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
	
	
	<!-- ###############  CONFIGURAÇÃO DO JMS PARA ENVIAR MENSAGENS   ######################### -->
	<!-- a pooling based JMS provider -->
	<!-- 	<bean id="jmsFactory" class="org.apache.activemq.pool.PooledConnectionFactory" -->
	<!-- 		destroy-method="stop"> -->
	<!-- 		<property name="connectionFactory"> -->
	<!-- 			<bean class="org.apache.activemq.ActiveMQConnectionFactory"> -->
	<!-- 				<property name="brokerURL"> -->
	<!-- 					<value>tcp://192.168.0.25:61616</value> -->
	<!-- 				</property> -->
	<!-- 			</bean> -->
	<!-- 		</property> -->
	<!-- 	</bean> -->
	<!-- 	<bean id="myJmsTemplate" class="org.springframework.jms.core.JmsTemplate"> -->
	<!-- 		<property name="connectionFactory" ref="jmsFactory" /> -->
	<!-- 		<property name="pubSubDomain" value="true" /> -->
	<!-- 	</bean> -->
	<!-- #####################..Configuração do JMS para RECEBER MENSAGENS-->
	<!-- ######################################################################################## -->
	<!-- <bean id="amqConnectionFactory" class="org.apache.activemq.ActiveMQConnectionFactory"> -->
	<!-- <constructor-arg index="0" value="jms.broker.url" /> -->
	<!-- </bean> -->
	<!-- <bean id="connectionFactory" class="org.springframework.jms.connection.CachingConnectionFactory"> -->
	<!-- <constructor-arg ref="amqConnectionFactory" /> -->
	<!-- </bean> -->
	<!-- 	CLASSE QUE implements MessageListener -->
	<!-- <bean id="atendimentoReceiver" class="COM.BR.XYZ.Receiver"> -->     
	<!-- </bean> -->
	<!-- <bean id="atendimentoReceiverListener" class="org.springframework.jms.listener.DefaultMessageListenerContainer"> -->
	<!-- <property name="connectionFactory" ref="connectionFactory" /> -->
	<!-- <property name="destinationName" value="jms.atendimento.topico" /> -->
	<!-- <property name="pubSubDomain" value="true" /> -->
	<!-- <property name="messageListener" ref="atendimentoReceiver" /> -->
	<!-- </bean> -->

</beans>