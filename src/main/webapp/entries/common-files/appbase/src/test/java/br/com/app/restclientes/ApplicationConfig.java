package ${application.rootPackage}.restclientes;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import ${application.rootPackage}.rs.DepartamentoResources;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Antonio Goncalves
 *         http://www.antoniogoncalves.org
 *         --
 */
@ApplicationPath("rs")
public class ApplicationConfig extends Application {

	// ======================================
	// = Attributes =
	// ======================================

	private final Set<Class<?>> classes;

	// ======================================
	// = Constructors =
	// ======================================

	public ApplicationConfig() {
		HashSet<Class<?>> c = new HashSet<Class<?>>();
		c.add(DepartamentoResources.class);
		classes = Collections.unmodifiableSet(c);
	}

	// ======================================
	// = Getters & Setters =
	// ======================================

	@Override
	public Set<Class<?>> getClasses() {
		return classes;
	}
}