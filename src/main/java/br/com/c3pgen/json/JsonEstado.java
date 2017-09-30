package br.com.c3pgen.json;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;

/**
*  generated: 03/09/2015 14:51:48
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonEstado implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String nome;
	private String faixaCep1Ini;
	private String faixaCep1Fim;
	private String faixaCep2Ini;
	private String faixaCep2Fim;
	
	public  JsonEstado() {
		
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
	public String getFaixaCep1Ini() {
		return faixaCep1Ini;
	}

	public void setFaixaCep1Ini(String faixaCep1Ini) {
		this.faixaCep1Ini = faixaCep1Ini;
	}
	public String getFaixaCep1Fim() {
		return faixaCep1Fim;
	}

	public void setFaixaCep1Fim(String faixaCep1Fim) {
		this.faixaCep1Fim = faixaCep1Fim;
	}
	public String getFaixaCep2Ini() {
		return faixaCep2Ini;
	}

	public void setFaixaCep2Ini(String faixaCep2Ini) {
		this.faixaCep2Ini = faixaCep2Ini;
	}
	public String getFaixaCep2Fim() {
		return faixaCep2Fim;
	}

	public void setFaixaCep2Fim(String faixaCep2Fim) {
		this.faixaCep2Fim = faixaCep2Fim;
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