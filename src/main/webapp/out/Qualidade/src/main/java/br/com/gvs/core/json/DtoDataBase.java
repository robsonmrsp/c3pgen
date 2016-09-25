package br.com.gvs.core.json;

import java.util.ArrayList;
import java.util.List;


public class DtoDataBase {

	private String clienteId;

	private List<JsonApontamentoQualidadePacking> apontamentoQualidadePackings  = new ArrayList<JsonApontamentoQualidadePacking>();
	private List<Conflict<JsonApontamentoQualidadePacking>> apontamentoQualidadePackingsConflict = new ArrayList<Conflict<JsonApontamentoQualidadePacking>>();
	private List<JsonBolsao> bolsaos  = new ArrayList<JsonBolsao>();
	private List<Conflict<JsonBolsao>> bolsaosConflict = new ArrayList<Conflict<JsonBolsao>>();
	private List<JsonGenerador> generadors  = new ArrayList<JsonGenerador>();
	private List<Conflict<JsonGenerador>> generadorsConflict = new ArrayList<Conflict<JsonGenerador>>();


	public String getClienteId() {
		return clienteId;
	}
	
	public void setClienteId(String clienteId) {
		this.clienteId = clienteId;
	}

	public List<JsonApontamentoQualidadePacking> getApontamentoQualidadePackings() {
		return apontamentoQualidadePackings;
	}

	public void setApontamentoQualidadePackings(List<JsonApontamentoQualidadePacking> apontamentoQualidadePackings) {
		this.apontamentoQualidadePackings = apontamentoQualidadePackings;
	}
	
	public List<Conflict<JsonApontamentoQualidadePacking>> getApontamentoQualidadePackingsConflict() {
		return apontamentoQualidadePackingsConflict;
	}
	
	public void setApontamentoQualidadePackingsConflict(List<Conflict<JsonApontamentoQualidadePacking>> apontamentoQualidadePackingsConflict) {
		this.apontamentoQualidadePackingsConflict = apontamentoQualidadePackingsConflict;
	}
	public void addConflict(JsonApontamentoQualidadePacking changedByMe, JsonApontamentoQualidadePacking changedByOther) {
		Conflict<JsonApontamentoQualidadePacking> e = new Conflict<JsonApontamentoQualidadePacking>(changedByMe, changedByOther);
		getApontamentoQualidadePackingsConflict().add(e);
	}

	public List<JsonBolsao> getBolsaos() {
		return bolsaos;
	}

	public void setBolsaos(List<JsonBolsao> bolsaos) {
		this.bolsaos = bolsaos;
	}
	
	public List<Conflict<JsonBolsao>> getBolsaosConflict() {
		return bolsaosConflict;
	}
	
	public void setBolsaosConflict(List<Conflict<JsonBolsao>> bolsaosConflict) {
		this.bolsaosConflict = bolsaosConflict;
	}
	public void addConflict(JsonBolsao changedByMe, JsonBolsao changedByOther) {
		Conflict<JsonBolsao> e = new Conflict<JsonBolsao>(changedByMe, changedByOther);
		getBolsaosConflict().add(e);
	}

	public List<JsonGenerador> getGeneradors() {
		return generadors;
	}

	public void setGeneradors(List<JsonGenerador> generadors) {
		this.generadors = generadors;
	}
	
	public List<Conflict<JsonGenerador>> getGeneradorsConflict() {
		return generadorsConflict;
	}
	
	public void setGeneradorsConflict(List<Conflict<JsonGenerador>> generadorsConflict) {
		this.generadorsConflict = generadorsConflict;
	}
	public void addConflict(JsonGenerador changedByMe, JsonGenerador changedByOther) {
		Conflict<JsonGenerador> e = new Conflict<JsonGenerador>(changedByMe, changedByOther);
		getGeneradorsConflict().add(e);
	}

}
