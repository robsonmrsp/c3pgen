package br.com.gvs.qualidade.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Type;
import org.hibernate.envers.Audited;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;


import br.com.gvs.core.serialization.CustomLocalDateTimeSerializer;
import br.com.gvs.core.serialization.CustomLocalDateSerializer;
import br.com.gvs.core.model.AbstractTimestampEntity;
/**
* generated: 24/09/2016 12:52:11
**/
@Entity
@Audited
@Table(name = "APONTAMENTO_QUALIDADE_PACKING")
@SequenceGenerator(name = "APONTAMENTOQUALIDADEPACKING_SEQUENCE", sequenceName = "APONTAMENTOQUALIDADEPACKING_SEQUENCE")
public class ApontamentoQualidadePacking extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "APONTAMENTOQUALIDADEPACKING_SEQUENCE")	
	private Integer id;
		
	@Column(name = "APARENCIA")
	private Integer aparencia;  			
		
	@Column(name = "DIAMETRO_MINIMO")
	private Double diametroMinimo;  			
		
	@Column(name = "DIAMETRO_MAXIMO")
	private Double diametroMaximo;  			
		
	@Column(name = "DIAMETRO_MEDIO")
	private Double diametroMedio;  			
		
	@Column(name = "BRIX_MINIMO")
	private Double brixMinimo;  			
		
	@Column(name = "BRIX_MAXIMO")
	private Double brixMaximo;  			
		
	@Column(name = "BRIX_MEDIO")
	private Double brixMedio;  			
		
	@Column(name = "PESO_CACHO_MINIMO")
	private Double pesoCachoMinimo;  			
		
	@Column(name = "PESO_CACHO_MAXIMO")
	private Double pesoCachoMaximo;  			
		
	@Column(name = "PESO_SACOLA_MINIMO")
	private Double pesoSacolaMinimo;  			
		
	@Column(name = "PESO_SACOLA_MAXIMO")
	private Double pesoSacolaMaximo;  			
		
	@Column(name = "NUMERO_CACHO_SACOLA")
	private Integer numeroCachoSacola;  			
		
	@Column(name = "NUMERO_SACOLA")
	private Integer numeroSacola;  			
		
	@Column(name = "PESO_CUMBUCA_MINIMO")
	private Double pesoCumbucaMinimo;  			
		
	@Column(name = "PESO_CUMBUCA_MAXIMO")
	private Double pesoCumbucaMaximo;  			
		
	@Column(name = "NUMERO_CACHOS_CUMBUCA")
	private Integer numeroCachosCumbuca;  			
		
	@Column(name = "NUMERO_CUMBUCAS")
	private Integer numeroCumbucas;  			
		
	@Column(name = "PESO_BRUTO")
	private Double pesoBruto;  			
		
	@Column(name = "PESO_LIQUIDO")
	private Double pesoLiquido;  			
		
	@Column(name = "CORPOS_ESTRANHOS")
	private Integer corposEstranhos;  			
		
	@Column(name = "BAGAS_AQUOSAS")
	private Integer bagasAquosas;  			
		
	@Column(name = "BAGAS_CRISTALINAS")
	private Integer bagasCristalinas;  			
		
	@Column(name = "FIRMEZA")
	private Integer firmeza;  			
		
	@Column(name = "DANOS")
	private Integer danos;  			
		
	@Column(name = "PRAGAS")
	private Integer pragas;  			
		
	@Column(name = "DOENCAS")
	private Integer doencas;  			
		
	@Column(name = "APARENCIA_ENGACO")
	private Integer aparenciaEngaco;  			
		
	@Column(name = "DESGRANA")
	private Double desgrana;  			
		
	@Column(name = "PODRIDAO")
	private Double podridao;  			
		
	@Column(name = "CICATRIZES")
	private Double cicatrizes;  			
		
	@Column(name = "RACHADURAS")
	private Double rachaduras;  			
		
	@Column(name = "RACHADURAS_CAMPO")
	private Double rachadurasCampo;  			
		
	@Column(name = "AMOLECIMENTO")
	private Double amolecimento;  			
		
	@Column(name = "OBSERVACAO")
	private String observacao;		
		
	@Column(name = "DATA_HORA")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDateTime")
	@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	private LocalDateTime dataHora;
	
	@OneToMany(mappedBy="apontamentoQualidadePacking")
	private List<Anexo> anexos;		
	
	@ManyToOne
	@JoinColumn(name = "ID_BOLSAO")
	private Bolsao bolsao;		
	
	@ManyToOne
	@JoinColumn(name = "ID_GENERADOR")
	private Generador generador;		
	
	@ManyToOne
	@JoinColumn(name = "ID_COR")
	private Cor cor;		
	
	@ManyToOne
	@JoinColumn(name = "ID_CARGO")
	private Cargo cargo;		
	
	@ManyToOne
	@JoinColumn(name = "ID_VARIEDADE")
	private Variedade variedade;		
	
	@ManyToOne
	@JoinColumn(name = "ID_LATADA")
	private Latada latada;		
	
	@ManyToOne
	@JoinColumn(name = "ID_EMBALAGEM")
	private Embalagem embalagem;		
	
	@ManyToOne
	@JoinColumn(name = "ID_CABINE")
	private Cabine cabine;		
	
	@ManyToOne
	@JoinColumn(name = "ID_SACOLA")
	private Sacola sacola;		
	
	@ManyToOne
	@JoinColumn(name = "ID_CLIENTE")
	private Cliente cliente;		
	
	@ManyToOne
	@JoinColumn(name = "ID_PACKING")
	private Packing packing;		
		
	public  ApontamentoQualidadePacking() {
		
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
	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
	}
	public void setAnexos(List<Anexo> anexos){
		this.anexos = anexos;
	}
	
	public List<Anexo>  getAnexos() {
		if(this.anexos == null){
			setAnexos(new ArrayList<Anexo>());
		}
		return this.anexos;
	}
		
	public boolean addAnexos(Anexo anexo){
		return getAnexos().add(anexo);
	}
	
	public boolean removeAnexos(Anexo anexo){
		return getAnexos().remove(anexo);
	}
	
	public Bolsao getBolsao() {
		return bolsao;
	}
	
	public void setBolsao(Bolsao bolsao) {
		this.bolsao = bolsao;
	}
	
	public Generador getGenerador() {
		return generador;
	}
	
	public void setGenerador(Generador generador) {
		this.generador = generador;
	}
	
	public Cor getCor() {
		return cor;
	}
	
	public void setCor(Cor cor) {
		this.cor = cor;
	}
	
	public Cargo getCargo() {
		return cargo;
	}
	
	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}
	
	public Variedade getVariedade() {
		return variedade;
	}
	
	public void setVariedade(Variedade variedade) {
		this.variedade = variedade;
	}
	
	public Latada getLatada() {
		return latada;
	}
	
	public void setLatada(Latada latada) {
		this.latada = latada;
	}
	
	public Embalagem getEmbalagem() {
		return embalagem;
	}
	
	public void setEmbalagem(Embalagem embalagem) {
		this.embalagem = embalagem;
	}
	
	public Cabine getCabine() {
		return cabine;
	}
	
	public void setCabine(Cabine cabine) {
		this.cabine = cabine;
	}
	
	public Sacola getSacola() {
		return sacola;
	}
	
	public void setSacola(Sacola sacola) {
		this.sacola = sacola;
	}
	
	public Cliente getCliente() {
		return cliente;
	}
	
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	public Packing getPacking() {
		return packing;
	}
	
	public void setPacking(Packing packing) {
		this.packing = packing;
	}
	
	
}
