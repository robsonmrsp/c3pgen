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
*  generated: 01/09/2016 17:25:05
**/
public class FilterEndereco implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String complemento;  			
	
	private String numero;  			

	private Integer cep;		
	
	public  FilterEndereco() {
		
	}
	

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}
		
	public Integer getCep() {
		return cep;
	}
	
	public void setCep(Integer cep) {
		this.cep = cep;
	}
	
}