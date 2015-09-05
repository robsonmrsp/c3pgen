package br.com.c3pgen.json;

import java.io.Serializable;

import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 03/09/2015 14:51:48
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonCliente implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String nome;
	private String email;
	private String cpf;
	private String telefone;
	private String outroTelefone;
	private JsonEndereco endereco;	
	
	public  JsonCliente() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
	
	public JsonEndereco getEndereco() {
		return endereco;
	}
	
	public void setEndereco(JsonEndereco endereco) {
		this.endereco = endereco;
	}

	public SyncOperation getSyncOperation (){
		if(syncOperation == null){
			this.syncOperation = SyncOperation.NONE;
		}
		return syncOperation;
	}
	
	public void setSyncOperation (SyncOperation  syncOperation){
		this.syncOperation = syncOperation;
	}
	
}