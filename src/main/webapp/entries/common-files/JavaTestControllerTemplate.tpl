/** generated: ${.now} **/
package ${package}.integration;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.function.Consumer;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ${package}.core.persistence.pagination.Pager;
import ${package}.model.${entity.name};
import ${package}.fixture.FixtureUtils;
import br.com.six2six.fixturefactory.Fixture;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Sql("classpath:init-data-${entity.name}.sql")
public class ${entity.name}ControllerTest {

	@Autowired
	TestRestTemplate testRestTemplate;

	private static final String URL = "/api/crud/${firstLower(entity.name)}s";

	@BeforeAll
	public static void setUp() {
		FixtureUtils.init();
	}

	@BeforeEach
	public void before() {
	}

	@Test
	public void testAdd${entity.name}() throws Exception {

		${entity.name} ${firstLower(entity.name)} = Fixture.from(${entity.name}.class).gimme("novo");
		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<${entity.name}> responseEntity = withBasicAuth.postForEntity(URL, ${firstLower(entity.name)}, ${entity.name}.class);

		HttpStatus status = responseEntity.getStatusCode();
		${entity.name} result${entity.name} = responseEntity.getBody();

		assertEquals("Incorrect Response Status: ", HttpStatus.CREATED, status);
		assertNotNull("A not null gender should be returned: ", result${entity.name});
		assertNotNull("A not null gender identifier should be returned:", result${entity.name}.getId());
	}

	@Test
	public void testGet${entity.name}() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<${entity.name}> responseEntity = withBasicAuth.getForEntity(URL + "/{id}", ${entity.name}.class, new Integer(1));

		HttpStatus status = responseEntity.getStatusCode();
		${entity.name} result${entity.name} = responseEntity.getBody();

		assertEquals("Incorrect Response Status", HttpStatus.OK, status);
		assertNotNull("A not null gender should be returned: ", result${entity.name});
		assertEquals("A id gender == 1 must be returned: ", result${entity.name}.getId(), new Integer(1));
	}

	@Test
	public void testGetPager${entity.name}() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<Pager> responseEntity = withBasicAuth.getForEntity(URL, Pager.class);

		HttpStatus status = responseEntity.getStatusCode();
		Pager<${entity.name}> resultPager${entity.name} = responseEntity.getBody();

		assertEquals("Incorrect Response Status", HttpStatus.OK, status);
		assertNotNull("A not null gender should be returned: ", resultPager${entity.name});
	}

	@Test
	public void testGet${entity.name}NotExist() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<${entity.name}> responseEntity = withBasicAuth.getForEntity(URL + "/{id}", ${entity.name}.class, new Long(100));

		HttpStatus status = responseEntity.getStatusCode();
		${entity.name} result${entity.name} = responseEntity.getBody();

		assertEquals("Incorrect Response Status", HttpStatus.NOT_FOUND, status);
		assertNull(result${entity.name});
	}

	@Test
	public void testGet${entity.name}ByParameter() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<Pager<${entity.name}>> responseEntity = withBasicAuth.exchange(URL + "?${firstLower(entity.primaryStringAttribute)}={${firstLower(entity.primaryStringAttribute)}}", HttpMethod.GET, null, new ParameterizedTypeReference<Pager<${entity.name}>>() {}, "${firstLower(entity.primaryStringAttribute)} ${firstLower(entity.name)}1");
		Pager<${entity.name}> ${firstLower(entity.name)}s = responseEntity.getBody();
		HttpStatus status = responseEntity.getStatusCode();

		${firstLower(entity.name)}s.getItems().forEach(new Consumer<${entity.name}>() {
			@Override
			public void accept(${entity.name} ${firstLower(entity.name)}) {
			<#if entity.primaryStringAttribute??>
				assertEquals("A not null ${entity.name} should be returned white the 'name' = '${firstLower(entity.primaryStringAttribute)} ${firstLower(entity.name)}1'", ${firstLower(entity.name)}.get${firstUpper(entity.primaryStringAttribute)}(), "${firstLower(entity.primaryStringAttribute)} ${firstLower(entity.name)}1");
			</#if>
			}
		});

		assertEquals("Incorrect Response Status", HttpStatus.OK, status);
		assertTrue("A Array of ${entity.name} should be returned ", ${firstLower(entity.name)}s.getItems().size() > 0);
	}
	
	@Test
	public void testUpdate${entity.name}() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		${entity.name} ${firstLower(entity.name)} = Fixture.from(${entity.name}.class).gimme("novo");
		${firstLower(entity.name)}.setId(1);

		HttpEntity<${entity.name}> requestEntity = new HttpEntity<${entity.name}>(${firstLower(entity.name)});

		ResponseEntity<${entity.name}> responseEntity = withBasicAuth.exchange(URL + "/{id}", HttpMethod.PUT, requestEntity, ${entity.name}.class, new Integer(1));

		HttpStatus status = responseEntity.getStatusCode();

		assertEquals("Incorrect Response Status", HttpStatus.OK, status);

	}

	@Test
	public void testDelete${entity.name}() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<Boolean> responseEntity = withBasicAuth.exchange(URL + "/{id}", HttpMethod.DELETE, null, Boolean.class, new Integer(1));

		HttpStatus status = responseEntity.getStatusCode();

		ResponseEntity<${entity.name}> responseTesteDelete = withBasicAuth.getForEntity(URL + "/{id}", ${entity.name}.class, new Integer(1));

		HttpStatus responseTesteDeleteStatus = responseTesteDelete.getStatusCode();
		${entity.name} result${entity.name} = responseTesteDelete.getBody();

		assertEquals("Incorrect Response Status after delete the ${firstLower(entity.name)} id = 1", HttpStatus.NOT_FOUND, responseTesteDeleteStatus);
		assertNull(result${entity.name});

		assertEquals("Incorrect Response Status", HttpStatus.NO_CONTENT, status);

	}
	
	@TestConfiguration
	static class MyTestConfig {

	}
}
//generated by JSetup ${JSetupVersion} :  at ${.now}