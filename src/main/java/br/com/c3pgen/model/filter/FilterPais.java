package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterPais implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer codigo;  			
	
	private String nome;  			

	
	public  FilterPais() {
		
	}
	

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
		
	
}