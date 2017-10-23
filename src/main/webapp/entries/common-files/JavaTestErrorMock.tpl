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
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import ${package}.core.model.Owner;
import ${package}.core.persistence.pagination.PaginationParams;
import ${package}.core.security.SpringSecurityUserContext;

import ${package}.json.Json${entity.name};
import ${package}.model.${entity.name};
import ${package}.rs.${entity.name}Controller;
import ${package}.service.${entity.name}Service;

@RunWith(SpringRunner.class)
@WebMvcTest(${entity.name}Controller.class)
public class ${entity.name}ErrorMockTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ${entity.name}Service service;
	@MockBean
	private SpringSecurityUserContext context;

	@Test
	public void errorGetiting${entity.name}ById() throws Exception {
		when(service.get(any(Integer.class), any(Owner.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));

		when(context.getOwner()).thenReturn(new Owner());

		this.mockMvc.perform(get("/rs/crud/${firstLower(entity.name)}s/1")).andDo(print()).andExpect(status().is5xxServerError()).andExpect(content().string(containsString("Error Getting ${entity.name}")));
	}

	@Test
	public void errorGetitingFilterEqual${entity.name}() throws Exception {
		when(service.filter(any(PaginationParams.class), any(Owner.class), any(Boolean.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));

		when(context.getOwner()).thenReturn(new Owner());

		this.mockMvc.perform(get("/rs/crud/${firstLower(entity.name)}s/filterEqual")).andDo(print()).andExpect(status().is5xxServerError()).andExpect(content().string(containsString("Error Getting ${entity.name}")));
	}

	@Test
	public void errorGetitingFilterAlike${entity.name}() throws Exception {
		when(service.filter(any(PaginationParams.class), any(Owner.class), any(Boolean.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));

		when(context.getOwner()).thenReturn(new Owner());

		this.mockMvc.perform(get("/rs/crud/${firstLower(entity.name)}s/filterAlike")).andDo(print()).andExpect(status().is5xxServerError()).andExpect(content().string(containsString("Error Getting ${entity.name}")));
	}

	@Test
	public void errorGetitingAll${entity.name}() throws Exception {
		when(service.all(any(Owner.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));

		when(context.getOwner()).thenReturn(new Owner());

		this.mockMvc.perform(get("/rs/crud/${firstLower(entity.name)}s/all")).andDo(print()).andExpect(status().is5xxServerError()).andExpect(content().string(containsString("Error Getting ${entity.name}")));
	}

	@Test
	public void errorGetitingAllPager${entity.name}() throws Exception {
		when(service.all(any(PaginationParams.class),any(Owner.class))).thenThrow(new RuntimeException("Error Getting ${entity.name}"));

		when(context.getOwner()).thenReturn(new Owner());

		this.mockMvc.perform(get("/rs/crud/${firstLower(entity.name)}s")).andDo(print()).andExpect(status().is5xxServerError()).andExpect(content().string(containsString("Error Getting ${entity.name}")));
	}

	@Test
	public void errorPostiting${entity.name}() throws Exception {
		when(service.save(any(${entity.name}.class))).thenThrow(new RuntimeException("Error creating ${entity.name}"));
		when(context.getOwner()).thenReturn(new Owner());

		this.mockMvc.perform(post("/rs/crud/${firstLower(entity.name)}s").param("nome", "chco").contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().is5xxServerError()).andExpect(content().string(containsString("Error Getting ${entity.name}")));
	}

	@Test
	public void errorDeleting${entity.name}() throws Exception {
		when(service.delete(any(Integer.class))).thenThrow(new RuntimeException("Error removing ${entity.name}"));

		when(context.getOwner()).thenReturn(new Owner());

		this.mockMvc.perform(delete("/rs/crud/${firstLower(entity.name)}s/1")).andDo(print()).andExpect(status().is5xxServerError()).andExpect(content().string(containsString("Error removing ${entity.name}")));
	}

	@Test
	public void errorUpdating${entity.name}() throws Exception {
		when(service.update(any(${entity.name}.class))).thenThrow(new RuntimeException("Error updating ${entity.name}"));

		when(context.getOwner()).thenReturn(new Owner());

		this.mockMvc.perform(put("/rs/crud/${firstLower(entity.name)}s/1")).andDo(print()).andExpect(status().is5xxServerError()).andExpect(content().string(containsString("Error updating ${entity.name}")));
	}
}