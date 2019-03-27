/** generated: ${.now} **/
package ${package}.integration.controller;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

<#if application.multitenancy && entity.multitenancy>
import ${package}.core.model.Tenant;
</#if>

import ${package}.core.persistence.pagination.SearchParameters;
import ${package}.core.security.SpringSecurityUserContext;
import ${package}.core.rs.exception.ValidationException;

import ${package}.json.Json${entity.name};
import ${package}.model.${entity.name};
import ${package}.rs.${entity.name}Controller;
import ${package}.service.${entity.name}Service;
import ${package}.util.MockMvcTestUtil;

@RunWith(SpringRunner.class)
@WebMvcTest(${entity.name}Controller.class)
public class ${entity.name}ErrorMockTest {

	static MockHttpSession mockHttpSession = MockMvcTestUtil.getSession();

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ${entity.name}Service service;
	@MockBean
	private SpringSecurityUserContext context;

	@Test
	public void errorGetiting${entity.name}ById() throws Exception {
<#if application.multitenancy && entity.multitenancy>
		when(service.get(any(Integer.class), any(Tenant.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));
		when(context.getTenant()).thenReturn(new Tenant());
<#else>
		when(service.get(any(Integer.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));
</#if>
		this.mockMvc.perform(get("/rs/crud/${firstLower(entity.name)}s/1").session(mockHttpSession))
			.andExpect(status().is5xxServerError())
			.andExpect(content().string(containsString("Error Getting ${entity.name}")));
	}

	@Test
	public void errorGetitingAllPager${entity.name}() throws Exception {
<#if application.multitenancy && entity.multitenancy>
		when(service.get(any(SearchParameters.class),any(Tenant.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));
		when(context.getTenant()).thenReturn(new Tenant());
<#else>
		when(service.get(any(SearchParameters.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));
</#if>		

		this.mockMvc.perform(get("/rs/crud/${firstLower(entity.name)}s").session(mockHttpSession))
			.andExpect(status().is5xxServerError())
			.andExpect(content().string(containsString("Error Getting ${entity.name}")));
	}

	@Test
	public void errorSaving${entity.name}() throws Exception {
<#if application.multitenancy && entity.multitenancy>
		when(service.save(any(${entity.name}.class))).thenThrow(new RuntimeException("Error creating ${entity.name}"));
		when(context.getTenant()).thenReturn(new Tenant());
<#else>
		when(service.save(any(${entity.name}.class))).thenThrow(new RuntimeException("Error creating ${entity.name}"));
</#if>		

		this.mockMvc.perform(post("/rs/crud/${firstLower(entity.name)}s").session(mockHttpSession).contentType(MediaType.APPLICATION_JSON).content("{}"))
			.andExpect(status().is5xxServerError())
			.andExpect(content().string(containsString("Error creating ${entity.name}")));
	}
	
	@Test
	public void errorSavingWithValidation${entity.name}() throws Exception {
<#if application.multitenancy && entity.multitenancy>
		when(service.save(any(${entity.name}.class))).thenThrow(new ValidationException("Error creating-validating ${entity.name}"));
		when(context.getTenant()).thenReturn(new Tenant());
<#else>
		when(service.save(any(${entity.name}.class))).thenThrow(new ValidationException("Error creating-validating ${entity.name}"));
</#if>		

		this.mockMvc.perform(post("/rs/crud/${firstLower(entity.name)}s").session(mockHttpSession).contentType(MediaType.APPLICATION_JSON).content("{}"))
			.andExpect(status().isBadRequest())
			.andExpect(content().string(containsString("Error creating-validating ${entity.name}")));
	}
	
	@Test
	public void errorUpdating${entity.name}() throws Exception {
<#if application.multitenancy && entity.multitenancy>
		when(service.update(any(${entity.name}.class))).thenThrow(new RuntimeException("Error updating ${entity.name}"));
		when(context.getTenant()).thenReturn(new Tenant());
<#else>
		when(service.update(any(${entity.name}.class))).thenThrow(new RuntimeException("Error updating ${entity.name}"));
</#if>		

		this.mockMvc.perform(put("/rs/crud/${firstLower(entity.name)}s/1").session(mockHttpSession).contentType(MediaType.APPLICATION_JSON).content("{}"))
			.andExpect(status().is5xxServerError())
			.andExpect(content().string(containsString("Error updating ${entity.name}")));
	}
	
	@Test
	public void errorUpdatingWithValidation${entity.name}() throws Exception {
<#if application.multitenancy && entity.multitenancy>
		when(service.update(any(${entity.name}.class))).thenThrow(new ValidationException("Error updating-validating ${entity.name}"));
		when(context.getTenant()).thenReturn(new Tenant());
<#else>
		when(service.update(any(${entity.name}.class))).thenThrow(new ValidationException("Error updating-validating ${entity.name}"));
</#if>		

		this.mockMvc.perform(put("/rs/crud/${firstLower(entity.name)}s/1").session(mockHttpSession).contentType(MediaType.APPLICATION_JSON).content("{}"))
			.andExpect(status().isBadRequest())
			.andExpect(content().string(containsString("Error updating-validating ${entity.name}")));
	}

	@Test
	public void errorDeleting${entity.name}() throws Exception {
<#if application.multitenancy && entity.multitenancy>
		when(service.delete(any(Integer.class),any(Tenant.class))).thenThrow(new RuntimeException("Error removing ${entity.name}"));
		when(context.getTenant()).thenReturn(new Tenant());
<#else>
		when(service.delete(any(Integer.class))).thenThrow(new RuntimeException("Error removing ${entity.name}"));
</#if>		
		this.mockMvc.perform(delete("/rs/crud/${firstLower(entity.name)}s/1").session(mockHttpSession))
			.andExpect(status().is5xxServerError())
			.andExpect(content().string(containsString("Error removing ${entity.name}")));
	}

}