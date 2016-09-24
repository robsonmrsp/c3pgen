package br.com.c3pgen.model.filter;

import java.io.Serializable;

import org.joda.time.LocalDateTime;

import br.com.c3pgen.serialization.CustomLocalDateTimeDeserializer;
import br.com.c3pgen.serialization.CustomLocalDateTimeSerializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;


/**
*  generated: 03/09/2015 14:51:49
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