package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterCidade implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String nome;  			
	
	private String cep;  			

	private Integer estado;		
	
	public  FilterCidade() {
		
	}
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}
		
	public Integer getEstado() {
		return estado;
	}
	
	public void setEstado(Integer estado) {
		this.estado = estado;
	}
	
}