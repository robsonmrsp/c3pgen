package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:48
**/
public class FilterCliente implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String nome;  			
	
	private String email;  			
	
	private String cpf;  			
	
	private String telefone;  			
	
	private String outroTelefone;  			

	
	public  FilterCliente() {
		
	}
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getOutroTelefone() {
		return outroTelefone;
	}

	public void setOutroTelefone(String outroTelefone) {
		this.outroTelefone = outroTelefone;
	}
		
	
}