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
*  generated: 24/09/2016 12:52:15
**/
public class FilterCep implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String logradouro;  			
	
	private String numero;  			

	private Integer bairro;		
	private Integer cidade;		
	private Integer estado;		
	
	public  FilterCep() {
		
	}
	

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}
		
	public Integer getBairro() {
		return bairro;
	}
	
	public void setBairro(Integer bairro) {
		this.bairro = bairro;
	}
	public Integer getCidade() {
		return cidade;
	}
	
	public void setCidade(Integer cidade) {
		this.cidade = cidade;
	}
	public Integer getEstado() {
		return estado;
	}
	
	public void setEstado(Integer estado) {
		this.estado = estado;
	}
	
}