package br.com.c3pgen.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 30/08/2015 20:23:12
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonCidade implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	
	private String nome;
	private String cep;
	private JsonEstado estado;		
	
	public  JsonCidade() {
		
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
	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}
	
	public JsonEstado getEstado() {
		return estado;
	}
	
	public void setEstado(JsonEstado estado) {
		this.estado = estado;
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