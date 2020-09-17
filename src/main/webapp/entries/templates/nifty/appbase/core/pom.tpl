<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>${application.rootPackage}</groupId>
	<artifactId>${application.appName}</artifactId>
	<version>1.0-SNAPSHOT</version>
	<packaging>war</packaging>
	<name>${application.appName}</name>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		 <version>2.2.1.RELEASE</version>
		<relativePath /> <!-- lookup parent from repository -->
	</parent>

	<properties>
		<java.version>1.12</java.version>
	</properties>
	
		<dependencies>
		<!-- ==============particulares=============== -->
		<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.dataformat/jackson-dataformat-xml -->
		<dependency>
			<groupId>com.fasterxml.jackson.dataformat</groupId>
			<artifactId>jackson-dataformat-xml</artifactId>
		</dependency>
		<#if application.hasDocRestApi()>
		<dependency>
			<groupId>io.springfox</groupId>
			<artifactId>springfox-swagger2</artifactId>
			<version>2.8.0</version>
			<scope>compile</scope>
		</dependency>
		<dependency>
			<groupId>io.springfox</groupId>
			<artifactId>springfox-swagger-ui</artifactId>
			<version>2.8.0</version>
			<scope>compile</scope>
		</dependency>

		</#if>

		<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
		<dependency>
			<groupId>commons-fileupload</groupId>
			<artifactId>commons-fileupload</artifactId>
			<version>1.3.1</version>
		</dependency>

		<dependency>
			<groupId>com.thetransactioncompany</groupId>
			<artifactId>cors-filter</artifactId>
			<version>2.4</version>
		</dependency>
		<!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
		<dependency>
			<groupId>com.google.guava</groupId>
			<artifactId>guava</artifactId>
			<version>27.0.1-jre</version>
		</dependency>
		<!-- https://mvnrepository.com/artifact/org.springframework.data/spring-data-envers -->
		<dependency>
			<groupId>org.springframework.data</groupId>
			<artifactId>spring-data-envers</artifactId>
		</dependency>

		<!-- https://mvnrepository.com/artifact/postgresql/postgresql -->
		<dependency>
			<groupId>org.postgresql</groupId>
			<artifactId>postgresql</artifactId>
		</dependency>
		<!-- as ptoximas 3 dependencias foram necessárias para compilar o index.jsp -->
		<dependency>
			<groupId>org.apache.tomcat.embed</groupId>
			<artifactId>tomcat-embed-jasper</artifactId>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>jstl</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-taglibs</artifactId>
		</dependency>

		<dependency>
			<groupId>br.com.six2six</groupId>
			<artifactId>fixture-factory</artifactId>
			<version>3.1.0</version>
			<scope>test</scope>
		</dependency>

		<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-lang3 -->
		<dependency>
			<groupId>org.apache.commons</groupId>
			<artifactId>commons-lang3</artifactId>
		</dependency>
		<!-- https://mvnrepository.com/artifact/net.sf.jasperreports/jasperreports -->
		<dependency>
			<groupId>net.sf.jasperreports</groupId>
			<artifactId>jasperreports</artifactId>
			<version>6.7.1</version>
		</dependency>

		<dependency>
			<groupId>org.imgscalr</groupId>
			<artifactId>imgscalr-lib</artifactId>
			<version>4.2</version>
			<type>jar</type>
			<scope>compile</scope>
		</dependency>

		<!-- ============================= -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-aop</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>
	
	<build>
		<pluginManagement>
			<plugins>
				<plugin>
					<groupId>org.apache.maven.plugins</groupId>
					<artifactId>maven-compiler-plugin</artifactId>
					<version>3.1</version>
					<configuration>
						<source>1.8</source>
						<target>1.8</target>
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
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
					
			<!-- A longo prazo, será mais simples manter a minificação dos css e js com os plugins abaixo. Isso porque, dada a maneira que estamos criando a view, serão vários arquivos js. -->
				<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-war-plugin</artifactId>
				<version>3.2.0</version>
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
								<cssSourceFile>../vendor/font.awesome/font-awesome-4.7.0/css/font-awesome.css</cssSourceFile>
								<cssSourceFile>../vendor/backgrid/backgrid.css</cssSourceFile>
								<cssSourceFile>../vendor/bootstrap.datetimepicker/bootstrap-datetimepicker.css</cssSourceFile>
								<cssSourceFile>../vendor/jquery.validationEngine/validationEngine.jquery.css</cssSourceFile>
								<cssSourceFile>../vendor/nprogressbar/nprogress.css</cssSourceFile>
								<cssSourceFile>../vendor/jquery.gritter-1.7.4/css/jquery.gritter.css</cssSourceFile>
								<cssSourceFile>../vendor/selectize/css/selectize.bootstrap3.css</cssSourceFile>
								<cssSourceFile>../vendor/chosen_v1.6.2/chosen.css</cssSourceFile>
								<cssSourceFile>../vendor/Backgrid.ColumnManager/lib/Backgrid.ColumnManager.css</cssSourceFile>
								<cssSourceFile>../vendor/chosen_v1.6.2/bootstrap-chosen.css</cssSourceFile>
								<cssSourceFile>../vendor/sweetalert-1.1.3/dist/sweetalert.css</cssSourceFile>
								<cssSourceFile>../vendor/bootstrap-tagsinput-0.8.0/dist/bootstrap-tagsinput.css</cssSourceFile>
								<cssSourceFile>../vendor/bootstrap-switch-3.3.4/dist/css/bootstrap3/bootstrap-switch.css</cssSourceFile>
								<cssSourceFile>../vendor/theme/demo/css/nifty.css</cssSourceFile>
								<cssSourceFile>../vendor/theme/demo/css/nifty-demo-icons.css</cssSourceFile>
								<cssSourceFile>../vendor/theme/demo/css/theme-ocean.css</cssSourceFile>		
								<cssSourceFile>../vendor/noty-3.1.3/lib/noty.css</cssSourceFile>
								<cssSourceFile>../vendor/animate.css/animate.css</cssSourceFile>	
								<cssSourceFile>../vendor/magic-check-master/css/magic-check.css</cssSourceFile>
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
			<id>spring-snapshots</id>
			<name>Spring Snapshots</name>
			<url>https://repo.spring.io/snapshot</url>
			<snapshots>
				<enabled>true</enabled>
			</snapshots>
		</repository>
		<repository>
			<id>spring-milestones</id>
			<name>Spring Milestones</name>
			<url>https://repo.spring.io/milestone</url>
		</repository>
	</repositories>
	<pluginRepositories>
		<pluginRepository>
			<id>spring-snapshots</id>
			<name>Spring Snapshots</name>
			<url>https://repo.spring.io/snapshot</url>
			<snapshots>
				<enabled>true</enabled>
			</snapshots>
		</pluginRepository>
		<pluginRepository>
			<id>spring-milestones</id>
			<name>Spring Milestones</name>
			<url>https://repo.spring.io/milestone</url>
		</pluginRepository>
	</pluginRepositories>
</project>
