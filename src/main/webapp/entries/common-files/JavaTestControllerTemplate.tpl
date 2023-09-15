/** generated: ${.now} **/
package ${package}.integration;

import br.com.six2six.fixturefactory.Fixture;
import ${package}.core.persistence.pagination.Pager;
import ${package}.fixture.FixtureUtils;
import ${package}.model.${firstUpper(entity.name)};
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Testcontainers
@ActiveProfiles("test-containers")
@Sql("classpath:init-data-${firstUpper(entity.name)}.sql")
public class ${firstUpper(entity.name)}ControllerTest {

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
    void testAdd${firstUpper(entity.name)}() throws Exception {

        ${firstUpper(entity.name)} ${firstLower(entity.name)} = Fixture.from(${firstUpper(entity.name)}.class).gimme("novo");
        TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

        ResponseEntity<${firstUpper(entity.name)}> responseEntity = withBasicAuth.postForEntity(URL, ${firstLower(entity.name)}, ${firstUpper(entity.name)}.class);

        HttpStatus status = responseEntity.getStatusCode();
        ${firstUpper(entity.name)} result${firstUpper(entity.name)} = responseEntity.getBody();

        assertEquals(HttpStatus.CREATED, status, "Incorrect Response Status: ");
        assertNotNull(result${firstUpper(entity.name)}, "A not null ${firstLower(entity.name)} should be returned: ");
        assertNotNull(result${firstUpper(entity.name)}.getId(), "A not null ${firstLower(entity.name)} identifier should be returned:");
    }

    @Test
    void testGet${firstUpper(entity.name)}() throws Exception {

        TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

        ResponseEntity<${firstUpper(entity.name)}> responseEntity = withBasicAuth.getForEntity(URL + "/{id}", ${firstUpper(entity.name)}.class, 1);

        HttpStatus status = responseEntity.getStatusCode();
        ${firstUpper(entity.name)} result${firstUpper(entity.name)} = responseEntity.getBody();

        assertEquals(HttpStatus.OK, status,"Incorrect Response Status");
        assertNotNull(result${firstUpper(entity.name)}, "A not null ${firstLower(entity.name)} should be returned: ");
        assertEquals(1, result${firstUpper(entity.name)}.getId(), "A id ${firstLower(entity.name)} == 1 must be returned: ");
    }

    @Test
    void testGet${firstUpper(entity.name)}NotExist() throws Exception {

        TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

        ResponseEntity<${firstUpper(entity.name)}> responseEntity = withBasicAuth.getForEntity(URL + "/{id}", ${firstUpper(entity.name)}.class, 100);

        HttpStatus status = responseEntity.getStatusCode();
        ${firstUpper(entity.name)} result${firstUpper(entity.name)} = responseEntity.getBody();

        assertEquals(HttpStatus.NOT_FOUND, status, "Incorrect Response Status");
        assertNull(result${firstUpper(entity.name)});
    }
<#if entity.getPrimaryStringAttribute()?has_content>
    @Test
    void testGet${firstUpper(entity.name)}ByParameter() throws Exception {

        TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

        ResponseEntity<Pager<${firstUpper(entity.name)}>> responseEntity = withBasicAuth
                .exchange(URL + "?${entity.getPrimaryStringAttribute().name}={${entity.getPrimaryStringAttribute().name}}", HttpMethod.GET, null, new ParameterizedTypeReference<>() {
                }, "${entity.getPrimaryStringAttribute().name} ${firstLower(entity.name)}1");

        Pager<${firstUpper(entity.name)}> ${firstLower(entity.name)}s = responseEntity.getBody();
        HttpStatus status = responseEntity.getStatusCode();

        ${firstLower(entity.name)}s.getItems().forEach(${firstLower(entity.name)} -> assertEquals("${entity.getPrimaryStringAttribute().name} ${firstLower(entity.name)}1", ${firstLower(entity.name)}.get${firstUpper(entity.getPrimaryStringAttribute().name)}(), "A not null ${firstUpper(entity.name)} should be returned white the 'name' = 'name ${firstLower(entity.name)}1'"));

        assertEquals(HttpStatus.OK, status, "Incorrect Response Status");
        assertFalse(${firstLower(entity.name)}s.getItems().isEmpty(), "A Array of ${firstUpper(entity.name)} should be returned ");
    }
</#if>

    @Test
    void testUpdate${firstUpper(entity.name)}() throws Exception {

        TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

        ${firstUpper(entity.name)} ${firstLower(entity.name)} = Fixture.from(${firstUpper(entity.name)}.class).gimme("novo");
        ${firstLower(entity.name)}.setId(1);

        HttpEntity<${firstUpper(entity.name)}> requestEntity = new HttpEntity<${firstUpper(entity.name)}>(${firstLower(entity.name)});

        ResponseEntity<${firstUpper(entity.name)}> responseEntity = withBasicAuth
                .exchange(URL + "/{id}", HttpMethod.PUT, requestEntity, ${firstUpper(entity.name)}.class, 1);

        HttpStatus status = responseEntity.getStatusCode();

        assertEquals(HttpStatus.OK, status, "Incorrect Response Status");
    }


    @Test
    public void testDelete${firstUpper(entity.name)}() throws Exception {

        TestRestTemplate withBasicAuth = testRestTemplate.withBasicAuth("jsetup", "123456");

        ResponseEntity<Boolean> responseEntity = withBasicAuth.exchange(URL + "/{id}", HttpMethod.DELETE, null, Boolean.class, 1);

        HttpStatus status = responseEntity.getStatusCode();

        ResponseEntity<${firstUpper(entity.name)}> responseTesteDelete = withBasicAuth.getForEntity(URL + "/{id}", ${firstUpper(entity.name)}.class, 1);

        HttpStatus responseTesteDeleteStatus = responseTesteDelete.getStatusCode();
        ${firstUpper(entity.name)} result${firstUpper(entity.name)} = responseTesteDelete.getBody();

        assertEquals(HttpStatus.NOT_FOUND, responseTesteDeleteStatus, "Incorrect Response Status after delete the ${firstLower(entity.name)} id = 1");
        assertNull(result${firstUpper(entity.name)});

        assertEquals(HttpStatus.NO_CONTENT, status, "Incorrect Response Status");
    }

    @TestConfiguration
    static class MyTestConfig {

    }
}

//generated by JSetup ${JSetupVersion} :  at ${.now}