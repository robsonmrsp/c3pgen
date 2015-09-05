package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
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