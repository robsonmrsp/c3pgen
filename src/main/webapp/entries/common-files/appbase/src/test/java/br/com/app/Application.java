package ${application.rootPackage}.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("${application.rootPackage}")
@EntityScan({ "${application.rootPackage}.model", "${application.rootPackage}.core.model" })
@EnableJpaRepositories("${application.rootPackage}")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
} 