package ${application.rootPackage}.restclientes;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation.Builder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ${application.rootPackage}.json.JsonDepartamento;
import ${application.rootPackage}.rs.DepartamentoResources;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:beans.xml", "classpath:spring-security.xml" })
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
//
public class DepartamentoResourcesIT {

	private static final Authenticator USER_AUTHENTICATOR = new Authenticator("marcio", "123");

	private static final GenericType<List<JsonDepartamento>> JSON_DEPARTAMENTO_RESPONSE_TYPE = new GenericType<List<JsonDepartamento>>() {
	};

	@Autowired
	static JAXRSServerFactoryBean server;

	@Autowired
	DepartamentoResources departamentoResources;

	private Client client;

	private WebTarget target;

	// Parece uma gamba forte, mas SERÁ???
	private static JsonDepartamento departamento = new JsonDepartamento();
	static {
		departamento.setDescricao("Descricao departamento");
	}

	@BeforeClass
	public static void init() throws IOException {
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:beans.xml", "classpath:spring-security.xml");
		server = (JAXRSServerFactoryBean) ctx.getBean("server");
		server.setAddress("http://localhost:8080/rs");
		
		server.create();
	}

	@Before
	public void startup() {
		client = ClientBuilder.newClient().register(USER_AUTHENTICATOR);
		client.register(JacksonJsonProvider.class);
		target = client.target("http://localhost:8080/rs");
		
	}

	@AfterClass
	public static void stop() {

	}

	@Test
	@SuppressWarnings({ "unused" })
	public void shouldCheckGetCustomerByLoginResponse() {
		target = target.path("crud/departamentos/all");
		Builder request = target.request(MediaType.APPLICATION_JSON_TYPE);

		Response response = request.get();
		List<JsonDepartamento> readEntity = response.readEntity(JSON_DEPARTAMENTO_RESPONSE_TYPE);

		assertEquals(200, 200);
	}

	@Test
	public void shouldSaveADepartamento() {
		target = target.path("crud/departamentos");
		Builder request = target.request(MediaType.APPLICATION_JSON_TYPE);

		Response response = request.post(Entity.entity(departamento, MediaType.APPLICATION_JSON_TYPE));

		departamento = response.readEntity(JsonDepartamento.class);

		assertEquals(true, departamento.getId() != null && departamento.getId() > 0);
	}

	@Test
	public void shouldUpdateADepartamento() {
		target = target.path("crud/departamentos/" + departamento.getId());
		Builder request = target.request(MediaType.APPLICATION_JSON_TYPE);

		String oldDescription = departamento.getDescricao();
		departamento.setDescricao("descricao departamento alterada");

		Response response = request.put(Entity.entity(departamento, MediaType.APPLICATION_JSON_TYPE));

		departamento = response.readEntity(JsonDepartamento.class);

		assertEquals(true, departamento.getDescricao() != oldDescription);
	}

	@Test
	public void shouldGetAllDepartamento() {
		target = target.path("crud/departamentos/all");
		Builder request = target.request(MediaType.APPLICATION_JSON_TYPE);

		Response response = request.get();
		List<JsonDepartamento> departamentos = response.readEntity(JSON_DEPARTAMENTO_RESPONSE_TYPE);
		assertEquals(true, departamentos.size() > 0);
	}

	@Test
	public void shouldGetPageableDepartamento() {
		target = target.path("crud/departamentos").queryParam("page", 1).queryParam("pageSize", 10).queryParam("description", "descricao departamento alterada");

		Builder request = target.request(MediaType.APPLICATION_JSON_TYPE);

		Response response = request.get();
		List<JsonDepartamento> departamentos = response.readEntity(JSON_DEPARTAMENTO_RESPONSE_TYPE);
		assertEquals(true, departamentos.size() > 0);
		assertEquals(true, departamentos.get(0).getDescricao().equals("descricao departamento alterada"));
	}
}
