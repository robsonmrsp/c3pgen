package br.com.gvs.qualidade.model.filter;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;


import br.com.gvs.core.serialization.CustomLocalDateSerializer;
import br.com.gvs.core.serialization.CustomLocalDateDeserializer;
import br.com.gvs.core.serialization.CustomLocalDateTimeSerializer;
import br.com.gvs.core.serialization.CustomLocalDateTimeDeserializer;


/**
*  generated: 24/09/2016 12:52:18
**/
public class FilterSession implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	@JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
	private LocalDateTime creationDate;

	private Integer user;		
	
	public  FilterSession() {
		
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
		
	public Integer getUser() {
		return user;
	}
	
	public void setUser(Integer user) {
		this.user = user;
	}
	
}