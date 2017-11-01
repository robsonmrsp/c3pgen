package br.com.netflics.config;

import java.sql.SQLFeatureNotSupportedException;
import java.util.Properties;
import java.util.logging.Level;

import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AvailableSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.DatabasePopulator;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.zaxxer.hikari.HikariDataSource;

/**
 * 
 * @author bytesTree
 * @see <a href="http://www.bytestree.com/">BytesTree</a>
 * 
 */
@Configuration
@EnableTransactionManagement
@PropertySource(value = { "classpath:application.properties" })
public class HibernateConfig {

	@Autowired
	private Environment env;

	@Value("classpath:db/seed.sql")
	private Resource schemaScript;

	@Bean
	public DataSourceInitializer dataSourceInitializer(final DataSource dataSource) {
		final DataSourceInitializer initializer = new DataSourceInitializer();
		initializer.setDataSource(dataSource);
		initializer.setDatabasePopulator(databasePopulator());

		return initializer;
	}

	/**
	 * teste
	 */
	private DatabasePopulator databasePopulator() {
		final ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
		populator.addScript(schemaScript);
		populator.setIgnoreFailedDrops(true);
		populator.setContinueOnError(true);
		return populator;
	}

	@Bean
	/**
	 * <code>
	 * 	<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" destroy-method="close">
	 *    <property name="driverClass" value="org.postgresql.Driver" />
	 *    <property name="jdbcUrl" value="jdbc:postgresql://localhost:5432/db_netflics" />
	 *    <property name="user" value="postgres" />
	 *    <property name="password" value="MasterKey@123" />
	 *    
	 *    <property name="acquireIncrement" value="10" />
	 *    <property name="minPoolSize" value="10" />
	 *    <property name="maxPoolSize" value="80" />
	 *    <property name="maxIdleTime" value="200" />
	 *    
	 *  < /bean>
	 * </code>
	 * 
	 * @return
	 */

	public DataSource getDataSource() {
		final HikariDataSource ds = new HikariDataSource();
		ds.setMaximumPoolSize(100);
		// ds.setDataSourceClassName("org.postgresql.ds.PGSimpleDataSource");
		ds.setDriverClassName("org.postgresql.Driver");
		ds.setJdbcUrl("jdbc:postgresql://localhost:5432/db_netflics");
		ds.setUsername("postgres");
		ds.setPassword("MasterKey@123");
		// ds.addDataSourceProperty("url", "jdbc:postgresql://localhost:5432/db_netflics");
		// ds.addDataSourceProperty("user", "postgres");
		// ds.addDataSourceProperty("password", "MasterKey@123");
		//
		ds.addDataSourceProperty("cachePrepStmts", true);
		ds.addDataSourceProperty("prepStmtCacheSize", 250);
		ds.addDataSourceProperty("prepStmtCacheSqlLimit", 2048);
		ds.addDataSourceProperty("useServerPrepStmts", true);
		return ds;
	}

	public DataSource getDataSource_() {

		ComboPooledDataSource dataSource = new ComboPooledDataSource();
		try {
			dataSource.getParentLogger().setLevel(Level.SEVERE);
		} catch (SQLFeatureNotSupportedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (SecurityException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		dataSource.setJdbcUrl(env.getRequiredProperty("datasource.url"));
		dataSource.setUser(env.getRequiredProperty("datasource.username"));
		dataSource.setPassword(env.getRequiredProperty("datasource.password"));

		dataSource.setAcquireIncrement(env.getRequiredProperty("datasource.pool.acquire.increment", Integer.class));
		dataSource.setMaxPoolSize(env.getRequiredProperty("datasource.pool.max.size", Integer.class));
		dataSource.setMaxIdleTime(env.getRequiredProperty("datasource.pool.max.idle.time", Integer.class));
		dataSource.setMaxIdleTimeExcessConnections(env.getRequiredProperty("datasource.pool.max.time.excess.connections", Integer.class));

		try {
			dataSource.setDriverClass(env.getRequiredProperty("datasource.driver"));
		} catch (Exception e) {
		}

		return dataSource;
	}

	/**
	 * Initialize hibernate properties
	 * 
	 * @return Properties
	 */
	private Properties getHibernateProperties() {
		Properties properties = new Properties();
		properties.put(AvailableSettings.DIALECT, env.getRequiredProperty("hibernate.dialect"));
		properties.put(AvailableSettings.SHOW_SQL, env.getRequiredProperty("hibernate.show_sql"));
		properties.put(AvailableSettings.STATEMENT_BATCH_SIZE, env.getRequiredProperty("hibernate.batch.size"));
		properties.put(AvailableSettings.HBM2DDL_AUTO, env.getRequiredProperty("hibernate.hbm2ddl.auto"));
		properties.put(AvailableSettings.CURRENT_SESSION_CONTEXT_CLASS, env.getRequiredProperty("hibernate.current.session.context.class"));
		return properties;
	}

	@Bean
	public LocalSessionFactoryBean getSessionFactory() {
		LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
		sessionFactory.setDataSource(getDataSource());
		sessionFactory.setPackagesToScan(new String[] { "br.com.netflics.core.model", "br.com.netflics.model" });
		sessionFactory.setHibernateProperties(getHibernateProperties());
		return sessionFactory;
	}

	/**
	 * Initialize Transaction Manager
	 * 
	 * @param sessionFactory
	 * @return HibernateTransactionManager
	 */
	@Bean
	public HibernateTransactionManager transactionManager(SessionFactory sessionFactory) {
		HibernateTransactionManager txManager = new HibernateTransactionManager();
		txManager.setSessionFactory(sessionFactory);
		return txManager;
	}
}
