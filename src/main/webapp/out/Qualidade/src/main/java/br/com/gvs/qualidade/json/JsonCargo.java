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
*  generated: 24/09/2016 11:56:33
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonCargo implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String nome;
	private ArrayList<JsonFuncionario> funcionarios = new ArrayList<JsonFuncionario>();		
	private ArrayList<JsonApontamentoQualidadePacking> apontamentoQualidadePackings = new ArrayList<JsonApontamentoQualidadePacking>();		
	
	public  JsonCargo() {
		
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
	
	public ArrayList<JsonFuncionario> getFuncionarios() {
		return funcionarios;
	}
	
	public void setFuncionarios(ArrayList<JsonFuncionario> funcionario) {
		this.funcionarios = funcionario;
	}

	public ArrayList<JsonApontamentoQualidadePacking> getApontamentoQualidadePackings() {
		return apontamentoQualidadePackings;
	}
	
	public void setApontamentoQualidadePackings(ArrayList<JsonApontamentoQualidadePacking> apontamentoQualidadePacking) {
		this.apontamentoQualidadePackings = apontamentoQualidadePacking;
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