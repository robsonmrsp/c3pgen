package br.com.gvs.qualidade.model.filter;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;


import br.com.gvs.core.serialization.CustomLocalDateSerializer;
import br.com.gvs.core.serialization.CustomLocalDateDeserializer;
import br.com.gvs.core.serialization.CustomLocalDateTimeSerializer;
import br.com.gvs.core.serialization.CustomLocalDateTimeDeserializer;


/**
*  generated: 03/09/2016 22:18:30
**/
public class FilterApontamentoQualidadePacking implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer aparencia;  			
	
	private Double diametroMinimo;  			
	
	private Double diametroMaximo;  			
	
	private Double diametroMedio;  			
	
	private Double brixMinimo;  			
	
	private Double brixMaximo;  			
	
	private Double brixMedio;  			
	
	private Double pesoCachoMinimo;  			
	
	private Double pesoCachoMaximo;  			
	
	private Double pesoSacolaMinimo;  			
	
	private Double pesoSacolaMaximo;  			
	
	private Integer numeroCachoSacola;  			
	
	private Integer numeroSacola;  			
	
	private Double pesoCumbucaMinimo;  			
	
	private Double pesoCumbucaMaximo;  			
	
	private Integer numeroCachosCumbuca;  			
	
	private Integer numeroCumbucas;  			
	
	private Double pesoBruto;  			
	
	private Double pesoLiquido;  			
	
	private Integer corposEstranhos;  			
	
	private Integer bagasAquosas;  			
	
	private Integer bagasCristalinas;  			
	
	private Integer firmeza;  			
	
	private Integer danos;  			
	
	private Integer pragas;  			
	
	private Integer doencas;  			
	
	private Integer aparenciaEngaco;  			
	
	private Double desgrana;  			
	
	private Double podridao;  			
	
	private Double cicatrizes;  			
	
	private Double rachaduras;  			
	
	private Double rachadurasCampo;  			
	
	private Double amolecimento;  			
	
	private String observacao;  			
	
	@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	@JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
	private LocalDateTime dataHora;

	private Integer bolsao;		
	private Integer generador;		
	private Integer cor;		
	private Integer cargo;		
	private Integer variedade;		
	private Integer latada;		
	private Integer embalagem;		
	private Integer cabine;		
	private Integer sacola;		
	private Integer cliente;		
	private Integer packing;		
	
	public  FilterApontamentoQualidadePacking() {
		
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
	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
	}
		
	public Integer getBolsao() {
		return bolsao;
	}
	
	public void setBolsao(Integer bolsao) {
		this.bolsao = bolsao;
	}
	public Integer getGenerador() {
		return generador;
	}
	
	public void setGenerador(Integer generador) {
		this.generador = generador;
	}
	public Integer getCor() {
		return cor;
	}
	
	public void setCor(Integer cor) {
		this.cor = cor;
	}
	public Integer getCargo() {
		return cargo;
	}
	
	public void setCargo(Integer cargo) {
		this.cargo = cargo;
	}
	public Integer getVariedade() {
		return variedade;
	}
	
	public void setVariedade(Integer variedade) {
		this.variedade = variedade;
	}
	public Integer getLatada() {
		return latada;
	}
	
	public void setLatada(Integer latada) {
		this.latada = latada;
	}
	public Integer getEmbalagem() {
		return embalagem;
	}
	
	public void setEmbalagem(Integer embalagem) {
		this.embalagem = embalagem;
	}
	public Integer getCabine() {
		return cabine;
	}
	
	public void setCabine(Integer cabine) {
		this.cabine = cabine;
	}
	public Integer getSacola() {
		return sacola;
	}
	
	public void setSacola(Integer sacola) {
		this.sacola = sacola;
	}
	public Integer getCliente() {
		return cliente;
	}
	
	public void setCliente(Integer cliente) {
		this.cliente = cliente;
	}
	public Integer getPacking() {
		return packing;
	}
	
	public void setPacking(Integer packing) {
		this.packing = packing;
	}
	
}