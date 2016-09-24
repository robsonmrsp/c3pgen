package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterBairro implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String nome;  			

	private Integer cidade;		
	private Integer estado;		
	
	public  FilterBairro() {
		
	}
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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