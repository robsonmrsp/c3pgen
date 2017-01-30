<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>${application.rootPackage}</groupId>
	<artifactId>${application.appName}</artifactId>
	<version>1.0-SNAPSHOT</version>
	<packaging>war</packaging>
	<name>${application.appName}</name>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<jackson.version>2.4.4</jackson.version>
		<cxf.version>3.0.1</cxf.version>
		<joda.time.version>2.4</joda.time.version>
		<spring.version>4.0.6.RELEASE</spring.version>
		<spring.security.version>3.2.4.RELEASE</spring.security.version>
		<hibernate.version>4.3.6.Final</hibernate.version>
		<jasperreports.version>3.5.3</jasperreports.version>
		<jandira.usertype.version>3.2.0.GA</jandira.usertype.version>
	</properties>
		
	<dependencies>
		<dependency>
			<groupId>com.restfuse</groupId>
			<artifactId>com.eclipsesource.restfuse</artifactId>
			<version>1.2.0</version>
		</dependency>

		<dependency>
			<groupId>com.thetransactioncompany</groupId>
			<artifactId>cors-filter</artifactId>
			<version>2.4</version>
		</dependency>
				
		<dependency>
			<groupId>jasperreports</groupId>
			<artifactId>jasperreports</artifactId>
			<version>${r"${jasperreports.version}"}</version>
		</dependency>
		<dependency>
			<groupId>org.reflections</groupId>
			<artifactId>reflections</artifactId>
			<version>0.9.9-RC1</version>
		</dependency>
		
		<dependency>
			<groupId>com.fasterxml.jackson.dataformat</groupId>
			<artifactId>jackson-dataformat-xml</artifactId>
			<version>${r"${jackson.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.apache.tomcat</groupId>
			<artifactId>tomcat-catalina</artifactId>
			<version>7.0.39</version>
			<scope>provided</scope>
		</dependency>


		<dependency>
			<groupId>org.jadira.usertype</groupId>
			<artifactId>usertype.core</artifactId>
			<version>${r"${jandira.usertype.version}"}</version>
		</dependency>

		<dependency>
			<groupId>joda-time</groupId>
			<artifactId>joda-time</artifactId>
			<version>${r"${joda.time.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-rt-frontend-jaxrs</artifactId>
			<version>${r"${cxf.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-rt-transports-http-jetty</artifactId>
			<version>${r"${cxf.version}"}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-rt-rs-client</artifactId>
			<version>${r"${cxf.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-rt-transports-http</artifactId>
			<version>${r"${cxf.version}"}</version>
		</dependency>

		<dependency>
			<groupId>com.fasterxml.jackson.jaxrs</groupId>
			<artifactId>jackson-jaxrs-json-provider</artifactId>
			<version>${r"${jackson.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-orm</artifactId>
			<version>${r"${spring.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${r"${spring.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-core</artifactId>
			<version>${r"${spring.security.version}"}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-web</artifactId>
			<version>${r"${spring.security.version}"}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-config</artifactId>
			<version>${r"${spring.security.version}"}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-taglibs</artifactId>
			<version>${r"${spring.security.version}"}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-web</artifactId>
			<version>${r"${spring.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${r"${spring.version}"}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-test</artifactId>
			<version>${r"${spring.version}"}</version>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.imgscalr</groupId>
			<artifactId>imgscalr-lib</artifactId>
			<version>4.2</version>
			<type>jar</type>
			<scope>compile</scope>
		</dependency>

		<!-- não sei porque quando adicionamos essa dependencia o projeto deixa de ser um projeto web. Pos isso somente adicionaremos quando for executar algum teste. -->
		<dependency>
			<groupId>org.apache.tomcat</groupId>
			<artifactId>tomcat-servlet-api</artifactId>
			<version>7.0.39</version>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>

		<dependency>
			<groupId>org.apache.tomcat</groupId>
			<artifactId>tomcat-coyote</artifactId>
			<version>7.0.39</version>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>javax.websocket</groupId>
			<artifactId>javax.websocket-api</artifactId>
			<version>1.0</version>
		</dependency>

		<dependency>
			<groupId>cglib</groupId>
			<artifactId>cglib</artifactId>
			<version>2.2.2</version>
			<scope>runtime</scope>
		</dependency>

		<!-- JSR 330 é a especificação da injeção de dependencia. Significa que não pretendemos usar as Annotations do Spring , a não ser que seja necessário.-->
		<dependency>
			<groupId>javax.inject</groupId>
			<artifactId>javax.inject</artifactId>
			<version>1</version>
		</dependency>

		<dependency>
			<groupId>commons-dbcp</groupId>
			<artifactId>commons-dbcp</artifactId>
			<version>1.4</version>
		</dependency>

		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-core</artifactId>
			<version>${r"${hibernate.version}"}</version>
		</dependency>

		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-envers</artifactId>
			<version>${r"${hibernate.version}"}</version>
		</dependency>

		<!-- Pool de conexões gerenciado pelo hibernate -->
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-c3p0</artifactId>
			<!-- <version>${r"${hibernate.version}"}</version> -->
			<version>${r"${hibernate.version}"}</version>
		</dependency>

		<dependency>
			<groupId>log4j</groupId>
			<artifactId>log4j</artifactId>
			<version>1.2.16</version>
		</dependency>
		<dependency>
			<groupId>commons-codec</groupId>
			<artifactId>commons-codec</artifactId>
			<version>1.2</version>
		</dependency>


		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-api</artifactId>
			<version>1.6.6</version>
		</dependency>


		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.11</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>javax.validation</groupId>
			<artifactId>validation-api</artifactId>
			<version>1.0.0.GA</version>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>javax.validation</groupId>
			<artifactId>validation-api</artifactId>
			<version>1.0.0.GA</version>
			<classifier>sources</classifier>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>com.microsoft.sqlserver</groupId>
			<artifactId>sqljdbc4</artifactId>
			<version>4.0</version>
		</dependency>

		<dependency>
			<groupId>postgresql</groupId>
			<artifactId>postgresql</artifactId>
			<!-- Com essa linha abaixo, o arquivo de driver não foi copiado para a pasta lib da aplicação, consequentemente o war não foi completo -->
			<!-- <scope>provided</scope> -->
			<version>8.4-701.jdbc3</version>
		</dependency>


		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-validator</artifactId>
			<version>4.3.1.Final</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aop</artifactId>
			<version>${r"${spring.version}"}</version>
		</dependency>

		<dependency>
			<groupId>net.sf.dozer</groupId>
			<artifactId>dozer</artifactId>
			<version>5.4.0</version>
		</dependency>

	</dependencies>

	<build>
		<pluginManagement>
			<plugins>
				<plugin>
					<groupId>org.apache.tomcat.maven</groupId>
					<artifactId>tomcat7-maven-plugin</artifactId>
					<version>2.0</version>
					<executions>
						<execution>
							<id>default-cli</id>
							<goals>
								<goal>run</goal>
							</goals>
							<configuration>
								<port>13000</port>
								<path>/jaxrs-service</path>
								<useSeparateTomcatClassLoader>true</useSeparateTomcatClassLoader>
							</configuration>
						</execution>
					</executions>
				</plugin>

				<plugin>
					<groupId>org.apache.maven.plugins</groupId>
					<artifactId>maven-compiler-plugin</artifactId>
					<version>3.1</version>
					<configuration>
						<source>1.6</source>
						<target>1.6</target>
					</configuration>
				</plugin>
				<plugin>
					<groupId>org.apache.maven.plugins</groupId>
					<artifactId>maven-eclipse-plugin</artifactId>
					<configuration>
						<downloadSources>true</downloadSources>
						<projectNameTemplate>[artifactId]-[version]</projectNameTemplate>
						<wtpmanifest>true</wtpmanifest>
						<wtpapplicationxml>true</wtpapplicationxml>
						<wtpversion>2.0</wtpversion>
					</configuration>
				</plugin>
			</plugins>
		</pluginManagement>

		<plugins>
			<plugin>
				<groupId>org.codehaus.mojo</groupId>
				<artifactId>build-helper-maven-plugin</artifactId>
				<version>1.5</version>
				<executions>
					<execution>
						<id>reserve-network-port</id>
						<goals>
							<goal>reserve-network-port</goal>
						</goals>
						<phase>process-test-resources</phase>
						<configuration>
							<portNames>
								<portName>test.server.port</portName>
							</portNames>
						</configuration>
					</execution>
				</executions>
			</plugin>
			<plugin>
				<groupId>org.apache.tomcat.maven</groupId>
				<artifactId>tomcat7-maven-plugin</artifactId>
				<executions>
					<execution>
						<id>start-tomcat</id>
						<goals>
							<goal>run-war</goal>
						</goals>
						<phase>pre-integration-test</phase>
						<configuration>
							<port>${r"${test.server.port}"}</port>
							<path>/jaxrs-service</path>
							<fork>true</fork>
							<useSeparateTomcatClassLoader>true</useSeparateTomcatClassLoader>
						</configuration>
					</execution>
					<execution>
						<id>stop-tomcat</id>
						<goals>
							<goal>shutdown</goal>
						</goals>
						<phase>post-integration-test</phase>
						<configuration>
							<path>/jaxrs-service</path>
						</configuration>
					</execution>
				</executions>
			</plugin>

			<!-- A longo prazo, será mais simples manter a minificação dos css e js com os plugins abaixo. Isso porque, dada a maneira que estamos criando a view, serão vários arquivos js. -->
				<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-war-plugin</artifactId>
				<version>2.4</version>
				<configuration>
					<warSourceExcludes>j/**,js/**,css/**,produ/**, assets/**, vendor/**</warSourceExcludes>
					
					<webResources>
						<resource>
							<!-- this is relative to the pom.xml directory -->
							<directory>produ</directory>
						</resource>
					</webResources>
				</configuration>
			</plugin>
			<plugin>
				<groupId>com.github.mcheely</groupId>
				<artifactId>requirejs-maven-plugin</artifactId>
				<version>2.0.0</version>
				<executions>
					<execution>
						<goals>
							<goal>optimize</goal>
						</goals>
					</execution>
				</executions>
				<configuration>
					<configFile>
						${r"${basedir}"}/src/main/resources/optimizejs/build.js
					</configFile>
					<optimizerFile>
						${r"${basedir}"}/src/main/resources/optimizejs/r.js
					</optimizerFile>
					<filterConfig>
						true
					</filterConfig>
					<skip>
						false
					</skip>
				</configuration>
			</plugin>
			
			<plugin>
				<groupId>com.samaxes.maven</groupId>
				<artifactId>minify-maven-plugin</artifactId>
				<version>1.7.4</version>
				<executions>
					<execution>
						<id>default-minify</id>
						<phase>process-resources</phase>
						<configuration>
							<charset>UTF-8</charset>
							<cssSourceDir>css</cssSourceDir>
							<cssSourceFiles>
								<cssSourceFile>../vendor/bootstrap/css/bootstrap.css</cssSourceFile>
								<cssSourceFile>../vendor/jquery.ui/jquery-ui-1.10.4.custom.min.css</cssSourceFile>
								<cssSourceFile>../vendor/font.awesome/font-awesome-4.6.3/css/font-awesome.css</cssSourceFile>
								<cssSourceFile>../vendor/backgrid/backgrid.css</cssSourceFile>
								<cssSourceFile>../vendor/bootstrap.datetimepicker/bootstrap-datetimepicker.css</cssSourceFile>
								<cssSourceFile>../vendor/jquery.validationEngine/validationEngine.jquery.css</cssSourceFile>
								<cssSourceFile>../vendor/nprogressbar/nprogress.css</cssSourceFile>
								<cssSourceFile>../vendor/jquery.gritter-1.7.4/css/jquery.gritter.css</cssSourceFile>
								<cssSourceFile>../vendor/selectize/css/selectize.bootstrap3.css</cssSourceFile>
								<cssSourceFile>../vendor/theme/ace.css</cssSourceFile>
								<cssSourceFile>../vendor/theme/ace-fonts.css</cssSourceFile>
								<cssSourceFile>../vendor/chosen_v1.6.2/chosen.css</cssSourceFile>
								<cssSourceFile>../vendor/chosen_v1.6.2/bootstrap-chosen.css</cssSourceFile>
								<cssSourceFile>../vendor/Backgrid.ColumnManager/lib/Backgrid.ColumnManager.css</cssSourceFile>
								<cssSourceFile>../vendor/sweetalert-1.1.3/dist/sweetalert.css</cssSourceFile>

								<cssSourceFile>custom.css</cssSourceFile>
							</cssSourceFiles>
							<cssFinalFile>main-built.css</cssFinalFile>
							<jsEngine>CLOSURE</jsEngine>
						</configuration>
						<goals>
							<goal>minify</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
	<repositories>
		
		<repository>
			<id>OSGEO GeoTools repo</id>
			<url>http://download.osgeo.org/webdav/geotools</url>
		</repository>
		
		<repository>
			<id>SqlServer repo</id>
			<url>http://clojars.org/repo</url>
		</repository>
		
		<repository>
			<id>maven2-repository.dev.java.net</id>
			<name>Java.net Maven 2 Repository</name>
			<url>http://download.java.net/maven/2</url>
			<layout>default</layout>
			<snapshots>
				<enabled>true</enabled>
			</snapshots>
		</repository>
	</repositories>
</project>
