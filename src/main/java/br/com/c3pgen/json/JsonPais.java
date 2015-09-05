package br.com.c3pgen.json;

import java.io.Serializable;

import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 03/09/2015 14:51:48
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonPais implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private Integer codigo;
	private String nome;
	
	public  JsonPais() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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