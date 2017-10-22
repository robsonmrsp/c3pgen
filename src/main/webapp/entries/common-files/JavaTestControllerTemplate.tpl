/** generated: ${.now} **/
package ${package}.integration.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.function.Consumer;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.util.UriComponentsBuilder;

import ${package}.core.persistence.pagination.Pager;
import ${package}.model.${entity.name};
import ${package}.fixture.FixtureUtils;
import br.com.six2six.fixturefactory.Fixture;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Sql("classpath:init-data.sql")
public class ${entity.name}ControllerTest {

	@Autowired
	TestRestTemplate testRestTemplate;

	private static final String URL = "/rs/crud/${firstLower(entity.name)}s";

	@BeforeClass
	public static void setUp() {
		FixtureUtils.init();
	}

	@Before
	public void before() {
	}

	@Test
	public void testAdd${entity.name}() throws Exception {

		${entity.name} ${firstLower(entity.name)} = Fixture.from(${entity.name}.class).gimme("novo");
		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<${entity.name}> responseEntity = withBasicAuth.postForEntity(URL, ${firstLower(entity.name)}, ${entity.name}.class);

		HttpStatus status = responseEntity.getStatusCode();
		${entity.name} result${entity.name} = responseEntity.getBody();

		assertEquals("Incorrect Response Status: ", HttpStatus.OK, status);
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

		assertEquals("Incorrect Response Status", HttpStatus.NO_CONTENT, status);
		assertNull(result${entity.name});
	}

	@Test
	public void testGet${entity.name}FilterEqual() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(URL + "/filterEqual").queryParam("${firstLower(entity.primaryStringAttribute)}", "${firstLower(entity.name)}1");

		String uriString = builder.toUriString();
		ResponseEntity<${entity.name}[]> responseEntity = withBasicAuth.getForEntity(uriString, ${entity.name}[].class);
		${entity.name}[] ${firstLower(entity.name)}s = responseEntity.getBody();
		HttpStatus status = responseEntity.getStatusCode();

		assertEquals("Incorrect Response Status", HttpStatus.OK, status);

		assertTrue("A Array of ${entity.name} should be returned ", ${firstLower(entity.name)}s.length > 0);

		Arrays.asList(${firstLower(entity.name)}s).forEach(new Consumer<${entity.name}>() {
			@Override
			public void accept(${entity.name} ${firstLower(entity.name)}) {
			<#if entity.primaryStringAttribute??>
				assertEquals("A not null ${entity.name} should be returned white the 'name' = '${firstLower(entity.name)}1'", ${firstLower(entity.name)}.get${firstUpper(entity.primaryStringAttribute)}(), "${firstLower(entity.name)}1");
			</#if>
			}
		});
	}

	@Test
	public void testGetAll${entity.name}() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<${entity.name}[]> responseEntity = withBasicAuth.getForEntity(URL + "/all", ${entity.name}[].class);
		${entity.name}[] ${firstLower(entity.name)}s = responseEntity.getBody();
		HttpStatus status = responseEntity.getStatusCode();

		assertEquals("Incorrect Response Status", HttpStatus.OK, status);

		assertTrue("A Array of ${entity.name} should be returned ", ${firstLower(entity.name)}s.length > 0);

	}

	@Test
	public void testDelete${entity.name}() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		ResponseEntity<Boolean> responseEntity = withBasicAuth.exchange(URL + "/{id}", HttpMethod.DELETE, null, Boolean.class, new Integer(1));

		Boolean result = responseEntity.getBody();
		HttpStatus status = responseEntity.getStatusCode();

		ResponseEntity<${entity.name}> responseTesteDelete = withBasicAuth.getForEntity(URL + "/{id}", ${entity.name}.class, new Integer(1));

		HttpStatus responseTesteDeleteStatus = responseTesteDelete.getStatusCode();
		${entity.name} result${entity.name} = responseTesteDelete.getBody();

		assertEquals("Incorrect Response Status after delete the ${firstLower(entity.name)} id = 1", HttpStatus.NO_CONTENT, responseTesteDeleteStatus);
		assertNull(result${entity.name});

		assertEquals("Incorrect Response Status", HttpStatus.OK, status);
		assertTrue("A Boolean.TRUE should be returned ", result);

	}

	@Test
	public void testGet${entity.name}FilterALike() throws Exception {

		TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(URL + "/filterAlike").queryParam("${firstLower(entity.primaryStringAttribute)}", "${firstLower(entity.name)}");

		String uriString = builder.toUriString();
		ResponseEntity<${entity.name}[]> responseEntity = withBasicAuth.getForEntity(uriString, ${entity.name}[].class);
		${entity.name}[] ${firstLower(entity.name)}s = responseEntity.getBody();
		HttpStatus status = responseEntity.getStatusCode();

		assertEquals("Incorrect Response Status", HttpStatus.OK, status);

		assertTrue("A Array of ${entity.name} should be returned ", ${firstLower(entity.name)}s.length > 0);

		Arrays.asList(${firstLower(entity.name)}s).forEach(new Consumer<${entity.name}>() {
			@Override
			public void accept(${entity.name} ${firstLower(entity.name)}) {
			<#if entity.primaryStringAttribute??>
				assertTrue("A not null ${entity.name} should be returned white the 'name' like '${firstLower(entity.name)}'", ${firstLower(entity.name)}.get${firstUpper(entity.primaryStringAttribute)}().contains("${firstLower(entity.name)}"));
			</#if>
			}
		});
	}
}

// generated by JSetup v0.95 : at 18/10/2017 08:40:58
//generated by JSetup ${JSetupVersion} :  at ${.now}