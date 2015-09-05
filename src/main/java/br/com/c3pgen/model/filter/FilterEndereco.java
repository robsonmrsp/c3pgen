package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
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