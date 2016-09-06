package br.com.gvs.qualidade.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.gvs.core.json.SyncOperation;
import br.com.gvs.core.serialization.CustomSyncObjectIdDeserializer;
import br.com.gvs.core.serialization.CustomDoubleDeserializer;

/**
*  generated: 03/09/2016 22:18:33
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonCep implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String logradouro;
	private String numero;
	private JsonBairro bairro;		
	private JsonCidade cidade;		
	private JsonEstado estado;		
	
	public  JsonCep() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
	
	public JsonBairro getBairro() {
		return bairro;
	}
	
	public void setBairro(JsonBairro bairro) {
		this.bairro = bairro;
	}
	public JsonCidade getCidade() {
		return cidade;
	}
	
	public void setCidade(JsonCidade cidade) {
		this.cidade = cidade;
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