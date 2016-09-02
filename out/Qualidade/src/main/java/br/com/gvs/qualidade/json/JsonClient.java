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
public class JsonClient implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private ArrayList<JsonPacking> packings = new ArrayList<JsonPacking>();		
	private ArrayList<JsonLatada> latadas = new ArrayList<JsonLatada>();		
	private ArrayList<JsonFuncionario> funcionarios = new ArrayList<JsonFuncionario>();		
	
	public  JsonClient() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public ArrayList<JsonPacking> getPackings() {
		return packings;
	}
	
	public void setPackings(ArrayList<JsonPacking> packing) {
		this.packings = packing;
	}

	public ArrayList<JsonLatada> getLatadas() {
		return latadas;
	}
	
	public void setLatadas(ArrayList<JsonLatada> latada) {
		this.latadas = latada;
	}

	public ArrayList<JsonFuncionario> getFuncionarios() {
		return funcionarios;
	}
	
	public void setFuncionarios(ArrayList<JsonFuncionario> funcionario) {
		this.funcionarios = funcionario;
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