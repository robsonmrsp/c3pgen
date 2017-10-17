package ${application.rootPackage}.restclientes;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.ext.RuntimeDelegate;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

@RunWith(Suite.class)
@SuiteClasses({ DepartamentoResourcesIT.class })
public class AllTests {

	private static HttpServer server;
	private static URI uri = UriBuilder.fromUri("http://localhost/").port(8282).build();
	private static Client client = ClientBuilder.newClient();

	// ======================================
	// = Lifecycle Methods =
	// ======================================

	@BeforeClass
	public static void init() throws IOException {
		// create a new server listening at port 8080
		server = HttpServer.create(new InetSocketAddress(uri.getPort()), 0);

		// create a handler wrapping the JAX-RS application
		HttpHandler handler = RuntimeDelegate.getInstance().createEndpoint(new ApplicationConfig(), HttpHandler.class);

		// map JAX-RS handler to the server root
		server.createContext(uri.getPath(), handler);

		// start the server
		server.start();
	}

	@AfterClass
	public static void stop() {
		server.stop(0);
	}

}
