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
*  generated: 02/09/2016 16:23:48
**/
public class FilterPacking implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer client;		
	
	public  FilterPacking() {
		
	}
	

		
	public Integer getClient() {
		return client;
	}
	
	public void setClient(Integer client) {
		this.client = client;
	}
	
}