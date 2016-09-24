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
*  generated: 24/09/2016 11:56:31
**/
public class FilterAnexo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String nome;  			
	
	private String conteudo;  			

	private Integer apontamentoQualidadePacking;		
	
	public  FilterAnexo() {
		
	}
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getConteudo() {
		return conteudo;
	}

	public void setConteudo(String conteudo) {
		this.conteudo = conteudo;
	}
		
	public Integer getApontamentoQualidadePacking() {
		return apontamentoQualidadePacking;
	}
	
	public void setApontamentoQualidadePacking(Integer apontamentoQualidadePacking) {
		this.apontamentoQualidadePacking = apontamentoQualidadePacking;
	}
	
}