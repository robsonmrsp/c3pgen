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
*  generated: 02/09/2016 16:23:48
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonPacking implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private ArrayList<JsonApontamentoQualidadePacking> apontamentoQualidadePackings = new ArrayList<JsonApontamentoQualidadePacking>();		
	private ArrayList<JsonCabine> cabines = new ArrayList<JsonCabine>();		
	private JsonClient client;		
	
	public  JsonPacking() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public ArrayList<JsonApontamentoQualidadePacking> getApontamentoQualidadePackings() {
		return apontamentoQualidadePackings;
	}
	
	public void setApontamentoQualidadePackings(ArrayList<JsonApontamentoQualidadePacking> apontamentoQualidadePacking) {
		this.apontamentoQualidadePackings = apontamentoQualidadePacking;
	}

	public ArrayList<JsonCabine> getCabines() {
		return cabines;
	}
	
	public void setCabines(ArrayList<JsonCabine> cabine) {
		this.cabines = cabine;
	}

	public JsonClient getClient() {
		return client;
	}
	
	public void setClient(JsonClient client) {
		this.client = client;
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