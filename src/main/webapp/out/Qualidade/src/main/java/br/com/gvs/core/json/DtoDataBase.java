package br.com.gvs.core.json;

import java.util.ArrayList;
import java.util.List;


public class DtoDataBase {

	private String clienteId;

	private List<JsonApontamentoQualidadePacking> apontamentoQualidadePackings  = new ArrayList<JsonApontamentoQualidadePacking>();
	private List<Conflict<JsonApontamentoQualidadePacking>> apontamentoQualidadePackingsConflict = new ArrayList<Conflict<JsonApontamentoQualidadePacking>>();
	private List<JsonBolsao> bolsaos  = new ArrayList<JsonBolsao>();
	private List<Conflict<JsonBolsao>> bolsaosConflict = new ArrayList<Conflict<JsonBolsao>>();
	private List<JsonCabine> cabines  = new ArrayList<JsonCabine>();
	private List<Conflict<JsonCabine>> cabinesConflict = new ArrayList<Conflict<JsonCabine>>();
	private List<JsonCargo> cargos  = new ArrayList<JsonCargo>();
	private List<Conflict<JsonCargo>> cargosConflict = new ArrayList<Conflict<JsonCargo>>();
	private List<JsonCliente> clientes  = new ArrayList<JsonCliente>();
	private List<Conflict<JsonCliente>> clientesConflict = new ArrayList<Conflict<JsonCliente>>();
	private List<JsonCor> cors  = new ArrayList<JsonCor>();
	private List<Conflict<JsonCor>> corsConflict = new ArrayList<Conflict<JsonCor>>();
	private List<JsonEmbalagem> embalagems  = new ArrayList<JsonEmbalagem>();
	private List<Conflict<JsonEmbalagem>> embalagemsConflict = new ArrayList<Conflict<JsonEmbalagem>>();
	private List<JsonGenerador> generadors  = new ArrayList<JsonGenerador>();
	private List<Conflict<JsonGenerador>> generadorsConflict = new ArrayList<Conflict<JsonGenerador>>();
	private List<JsonLatada> latadas  = new ArrayList<JsonLatada>();
	private List<Conflict<JsonLatada>> latadasConflict = new ArrayList<Conflict<JsonLatada>>();
	private List<JsonPacking> packings  = new ArrayList<JsonPacking>();
	private List<Conflict<JsonPacking>> packingsConflict = new ArrayList<Conflict<JsonPacking>>();
	private List<JsonSacola> sacolas  = new ArrayList<JsonSacola>();
	private List<Conflict<JsonSacola>> sacolasConflict = new ArrayList<Conflict<JsonSacola>>();
	private List<JsonVariedade> variedades  = new ArrayList<JsonVariedade>();
	private List<Conflict<JsonVariedade>> variedadesConflict = new ArrayList<Conflict<JsonVariedade>>();


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

	public List<JsonCabine> getCabines() {
		return cabines;
	}

	public void setCabines(List<JsonCabine> cabines) {
		this.cabines = cabines;
	}
	
	public List<Conflict<JsonCabine>> getCabinesConflict() {
		return cabinesConflict;
	}
	
	public void setCabinesConflict(List<Conflict<JsonCabine>> cabinesConflict) {
		this.cabinesConflict = cabinesConflict;
	}
	public void addConflict(JsonCabine changedByMe, JsonCabine changedByOther) {
		Conflict<JsonCabine> e = new Conflict<JsonCabine>(changedByMe, changedByOther);
		getCabinesConflict().add(e);
	}

	public List<JsonCargo> getCargos() {
		return cargos;
	}

	public void setCargos(List<JsonCargo> cargos) {
		this.cargos = cargos;
	}
	
	public List<Conflict<JsonCargo>> getCargosConflict() {
		return cargosConflict;
	}
	
	public void setCargosConflict(List<Conflict<JsonCargo>> cargosConflict) {
		this.cargosConflict = cargosConflict;
	}
	public void addConflict(JsonCargo changedByMe, JsonCargo changedByOther) {
		Conflict<JsonCargo> e = new Conflict<JsonCargo>(changedByMe, changedByOther);
		getCargosConflict().add(e);
	}

	public List<JsonCliente> getClientes() {
		return clientes;
	}

	public void setClientes(List<JsonCliente> clientes) {
		this.clientes = clientes;
	}
	
	public List<Conflict<JsonCliente>> getClientesConflict() {
		return clientesConflict;
	}
	
	public void setClientesConflict(List<Conflict<JsonCliente>> clientesConflict) {
		this.clientesConflict = clientesConflict;
	}
	public void addConflict(JsonCliente changedByMe, JsonCliente changedByOther) {
		Conflict<JsonCliente> e = new Conflict<JsonCliente>(changedByMe, changedByOther);
		getClientesConflict().add(e);
	}

	public List<JsonCor> getCors() {
		return cors;
	}

	public void setCors(List<JsonCor> cors) {
		this.cors = cors;
	}
	
	public List<Conflict<JsonCor>> getCorsConflict() {
		return corsConflict;
	}
	
	public void setCorsConflict(List<Conflict<JsonCor>> corsConflict) {
		this.corsConflict = corsConflict;
	}
	public void addConflict(JsonCor changedByMe, JsonCor changedByOther) {
		Conflict<JsonCor> e = new Conflict<JsonCor>(changedByMe, changedByOther);
		getCorsConflict().add(e);
	}

	public List<JsonEmbalagem> getEmbalagems() {
		return embalagems;
	}

	public void setEmbalagems(List<JsonEmbalagem> embalagems) {
		this.embalagems = embalagems;
	}
	
	public List<Conflict<JsonEmbalagem>> getEmbalagemsConflict() {
		return embalagemsConflict;
	}
	
	public void setEmbalagemsConflict(List<Conflict<JsonEmbalagem>> embalagemsConflict) {
		this.embalagemsConflict = embalagemsConflict;
	}
	public void addConflict(JsonEmbalagem changedByMe, JsonEmbalagem changedByOther) {
		Conflict<JsonEmbalagem> e = new Conflict<JsonEmbalagem>(changedByMe, changedByOther);
		getEmbalagemsConflict().add(e);
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

	public List<JsonLatada> getLatadas() {
		return latadas;
	}

	public void setLatadas(List<JsonLatada> latadas) {
		this.latadas = latadas;
	}
	
	public List<Conflict<JsonLatada>> getLatadasConflict() {
		return latadasConflict;
	}
	
	public void setLatadasConflict(List<Conflict<JsonLatada>> latadasConflict) {
		this.latadasConflict = latadasConflict;
	}
	public void addConflict(JsonLatada changedByMe, JsonLatada changedByOther) {
		Conflict<JsonLatada> e = new Conflict<JsonLatada>(changedByMe, changedByOther);
		getLatadasConflict().add(e);
	}

	public List<JsonPacking> getPackings() {
		return packings;
	}

	public void setPackings(List<JsonPacking> packings) {
		this.packings = packings;
	}
	
	public List<Conflict<JsonPacking>> getPackingsConflict() {
		return packingsConflict;
	}
	
	public void setPackingsConflict(List<Conflict<JsonPacking>> packingsConflict) {
		this.packingsConflict = packingsConflict;
	}
	public void addConflict(JsonPacking changedByMe, JsonPacking changedByOther) {
		Conflict<JsonPacking> e = new Conflict<JsonPacking>(changedByMe, changedByOther);
		getPackingsConflict().add(e);
	}

	public List<JsonSacola> getSacolas() {
		return sacolas;
	}

	public void setSacolas(List<JsonSacola> sacolas) {
		this.sacolas = sacolas;
	}
	
	public List<Conflict<JsonSacola>> getSacolasConflict() {
		return sacolasConflict;
	}
	
	public void setSacolasConflict(List<Conflict<JsonSacola>> sacolasConflict) {
		this.sacolasConflict = sacolasConflict;
	}
	public void addConflict(JsonSacola changedByMe, JsonSacola changedByOther) {
		Conflict<JsonSacola> e = new Conflict<JsonSacola>(changedByMe, changedByOther);
		getSacolasConflict().add(e);
	}

	public List<JsonVariedade> getVariedades() {
		return variedades;
	}

	public void setVariedades(List<JsonVariedade> variedades) {
		this.variedades = variedades;
	}
	
	public List<Conflict<JsonVariedade>> getVariedadesConflict() {
		return variedadesConflict;
	}
	
	public void setVariedadesConflict(List<Conflict<JsonVariedade>> variedadesConflict) {
		this.variedadesConflict = variedadesConflict;
	}
	public void addConflict(JsonVariedade changedByMe, JsonVariedade changedByOther) {
		Conflict<JsonVariedade> e = new Conflict<JsonVariedade>(changedByMe, changedByOther);
		getVariedadesConflict().add(e);
	}

}
