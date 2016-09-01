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
*  generated: 01/09/2016 17:25:05
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonApontamentoQualidadePacking implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private Integer aparencia;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double diametroMinimo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double diametroMaximo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double diametroMedio;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double brixMinimo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double brixMaximo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double brixMedio;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pesoCachoMinimo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pesoCachoMaximo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pesoSacolaMinimo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pesoSacolaMaximo;
	private Integer numeroCachoSacola;
	private Integer numeroSacola;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pesoCumbucaMinimo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pesoCumbucaMaximo;
	private Integer numeroCachosCumbuca;
	private Integer numeroCumbucas;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pesoBruto;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pesoLiquido;
	private Integer corposEstranhos;
	private Integer bagasAquosas;
	private Integer bagasCristalinas;
	private Integer firmeza;
	private Integer danos;
	private Integer pragas;
	private Integer doencas;
	private Integer aparenciaEngaco;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double desgrana;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double podridao;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double cicatrizes;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double rachaduras;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double rachadurasCampo;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double amolecimento;
	private String observacao;
	private String dataHora;
	private ArrayList<JsonAnexo> anexos = new ArrayList<JsonAnexo>();		
	private JsonBolsao bolsao;		
	private JsonGenerador generador;		
	private JsonCor cor;		
	private JsonCargo cargo;		
	private JsonVariedade variedade;		
	private JsonLatada latada;		
	private JsonEmbalagem embalagem;		
	private JsonCabine cabine;		
	private JsonSacola sacola;		
	private JsonCliente cliente;		
	private JsonPacking packing;		
	
	public  JsonApontamentoQualidadePacking() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getAparencia() {
		return aparencia;
	}

	public void setAparencia(Integer aparencia) {
		this.aparencia = aparencia;
	}
	public Double getDiametroMinimo() {
		return diametroMinimo;
	}

	public void setDiametroMinimo(Double diametroMinimo) {
		this.diametroMinimo = diametroMinimo;
	}
	public Double getDiametroMaximo() {
		return diametroMaximo;
	}

	public void setDiametroMaximo(Double diametroMaximo) {
		this.diametroMaximo = diametroMaximo;
	}
	public Double getDiametroMedio() {
		return diametroMedio;
	}

	public void setDiametroMedio(Double diametroMedio) {
		this.diametroMedio = diametroMedio;
	}
	public Double getBrixMinimo() {
		return brixMinimo;
	}

	public void setBrixMinimo(Double brixMinimo) {
		this.brixMinimo = brixMinimo;
	}
	public Double getBrixMaximo() {
		return brixMaximo;
	}

	public void setBrixMaximo(Double brixMaximo) {
		this.brixMaximo = brixMaximo;
	}
	public Double getBrixMedio() {
		return brixMedio;
	}

	public void setBrixMedio(Double brixMedio) {
		this.brixMedio = brixMedio;
	}
	public Double getPesoCachoMinimo() {
		return pesoCachoMinimo;
	}

	public void setPesoCachoMinimo(Double pesoCachoMinimo) {
		this.pesoCachoMinimo = pesoCachoMinimo;
	}
	public Double getPesoCachoMaximo() {
		return pesoCachoMaximo;
	}

	public void setPesoCachoMaximo(Double pesoCachoMaximo) {
		this.pesoCachoMaximo = pesoCachoMaximo;
	}
	public Double getPesoSacolaMinimo() {
		return pesoSacolaMinimo;
	}

	public void setPesoSacolaMinimo(Double pesoSacolaMinimo) {
		this.pesoSacolaMinimo = pesoSacolaMinimo;
	}
	public Double getPesoSacolaMaximo() {
		return pesoSacolaMaximo;
	}

	public void setPesoSacolaMaximo(Double pesoSacolaMaximo) {
		this.pesoSacolaMaximo = pesoSacolaMaximo;
	}
	public Integer getNumeroCachoSacola() {
		return numeroCachoSacola;
	}

	public void setNumeroCachoSacola(Integer numeroCachoSacola) {
		this.numeroCachoSacola = numeroCachoSacola;
	}
	public Integer getNumeroSacola() {
		return numeroSacola;
	}

	public void setNumeroSacola(Integer numeroSacola) {
		this.numeroSacola = numeroSacola;
	}
	public Double getPesoCumbucaMinimo() {
		return pesoCumbucaMinimo;
	}

	public void setPesoCumbucaMinimo(Double pesoCumbucaMinimo) {
		this.pesoCumbucaMinimo = pesoCumbucaMinimo;
	}
	public Double getPesoCumbucaMaximo() {
		return pesoCumbucaMaximo;
	}

	public void setPesoCumbucaMaximo(Double pesoCumbucaMaximo) {
		this.pesoCumbucaMaximo = pesoCumbucaMaximo;
	}
	public Integer getNumeroCachosCumbuca() {
		return numeroCachosCumbuca;
	}

	public void setNumeroCachosCumbuca(Integer numeroCachosCumbuca) {
		this.numeroCachosCumbuca = numeroCachosCumbuca;
	}
	public Integer getNumeroCumbucas() {
		return numeroCumbucas;
	}

	public void setNumeroCumbucas(Integer numeroCumbucas) {
		this.numeroCumbucas = numeroCumbucas;
	}
	public Double getPesoBruto() {
		return pesoBruto;
	}

	public void setPesoBruto(Double pesoBruto) {
		this.pesoBruto = pesoBruto;
	}
	public Double getPesoLiquido() {
		return pesoLiquido;
	}

	public void setPesoLiquido(Double pesoLiquido) {
		this.pesoLiquido = pesoLiquido;
	}
	public Integer getCorposEstranhos() {
		return corposEstranhos;
	}

	public void setCorposEstranhos(Integer corposEstranhos) {
		this.corposEstranhos = corposEstranhos;
	}
	public Integer getBagasAquosas() {
		return bagasAquosas;
	}

	public void setBagasAquosas(Integer bagasAquosas) {
		this.bagasAquosas = bagasAquosas;
	}
	public Integer getBagasCristalinas() {
		return bagasCristalinas;
	}

	public void setBagasCristalinas(Integer bagasCristalinas) {
		this.bagasCristalinas = bagasCristalinas;
	}
	public Integer getFirmeza() {
		return firmeza;
	}

	public void setFirmeza(Integer firmeza) {
		this.firmeza = firmeza;
	}
	public Integer getDanos() {
		return danos;
	}

	public void setDanos(Integer danos) {
		this.danos = danos;
	}
	public Integer getPragas() {
		return pragas;
	}

	public void setPragas(Integer pragas) {
		this.pragas = pragas;
	}
	public Integer getDoencas() {
		return doencas;
	}

	public void setDoencas(Integer doencas) {
		this.doencas = doencas;
	}
	public Integer getAparenciaEngaco() {
		return aparenciaEngaco;
	}

	public void setAparenciaEngaco(Integer aparenciaEngaco) {
		this.aparenciaEngaco = aparenciaEngaco;
	}
	public Double getDesgrana() {
		return desgrana;
	}

	public void setDesgrana(Double desgrana) {
		this.desgrana = desgrana;
	}
	public Double getPodridao() {
		return podridao;
	}

	public void setPodridao(Double podridao) {
		this.podridao = podridao;
	}
	public Double getCicatrizes() {
		return cicatrizes;
	}

	public void setCicatrizes(Double cicatrizes) {
		this.cicatrizes = cicatrizes;
	}
	public Double getRachaduras() {
		return rachaduras;
	}

	public void setRachaduras(Double rachaduras) {
		this.rachaduras = rachaduras;
	}
	public Double getRachadurasCampo() {
		return rachadurasCampo;
	}

	public void setRachadurasCampo(Double rachadurasCampo) {
		this.rachadurasCampo = rachadurasCampo;
	}
	public Double getAmolecimento() {
		return amolecimento;
	}

	public void setAmolecimento(Double amolecimento) {
		this.amolecimento = amolecimento;
	}
	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	public String getDataHora() {
		return dataHora;
	}

	public void setDataHora(String dataHora) {
		this.dataHora = dataHora;
	}				
	
	public ArrayList<JsonAnexo> getAnexos() {
		return anexos;
	}
	
	public void setAnexos(ArrayList<JsonAnexo> anexo) {
		this.anexos = anexo;
	}

	public JsonBolsao getBolsao() {
		return bolsao;
	}
	
	public void setBolsao(JsonBolsao bolsao) {
		this.bolsao = bolsao;
	}
	public JsonGenerador getGenerador() {
		return generador;
	}
	
	public void setGenerador(JsonGenerador generador) {
		this.generador = generador;
	}
	public JsonCor getCor() {
		return cor;
	}
	
	public void setCor(JsonCor cor) {
		this.cor = cor;
	}
	public JsonCargo getCargo() {
		return cargo;
	}
	
	public void setCargo(JsonCargo cargo) {
		this.cargo = cargo;
	}
	public JsonVariedade getVariedade() {
		return variedade;
	}
	
	public void setVariedade(JsonVariedade variedade) {
		this.variedade = variedade;
	}
	public JsonLatada getLatada() {
		return latada;
	}
	
	public void setLatada(JsonLatada latada) {
		this.latada = latada;
	}
	public JsonEmbalagem getEmbalagem() {
		return embalagem;
	}
	
	public void setEmbalagem(JsonEmbalagem embalagem) {
		this.embalagem = embalagem;
	}
	public JsonCabine getCabine() {
		return cabine;
	}
	
	public void setCabine(JsonCabine cabine) {
		this.cabine = cabine;
	}
	public JsonSacola getSacola() {
		return sacola;
	}
	
	public void setSacola(JsonSacola sacola) {
		this.sacola = sacola;
	}
	public JsonCliente getCliente() {
		return cliente;
	}
	
	public void setCliente(JsonCliente cliente) {
		this.cliente = cliente;
	}
	public JsonPacking getPacking() {
		return packing;
	}
	
	public void setPacking(JsonPacking packing) {
		this.packing = packing;
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