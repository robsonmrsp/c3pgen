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
*  generated: 24/09/2016 12:52:13
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonControleCumbuca implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String dataRegistro;  			
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double peso;
	private Integer tipo;
	private Integer quantidadeCachos;
	private JsonCabine cabine;		
	
	public  JsonControleCumbuca() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(String dataRegistro) {
		this.dataRegistro = dataRegistro;
	}				
								
	public Double getPeso() {
		return peso;
	}

	public void setPeso(Double peso) {
		this.peso = peso;
	}
	public Integer getTipo() {
		return tipo;
	}

	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}
	public Integer getQuantidadeCachos() {
		return quantidadeCachos;
	}

	public void setQuantidadeCachos(Integer quantidadeCachos) {
		this.quantidadeCachos = quantidadeCachos;
	}
	
	public JsonCabine getCabine() {
		return cabine;
	}
	
	public void setCabine(JsonCabine cabine) {
		this.cabine = cabine;
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