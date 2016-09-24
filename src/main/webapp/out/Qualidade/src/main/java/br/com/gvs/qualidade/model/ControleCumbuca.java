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
* generated: 24/09/2016 11:56:33
**/
@Entity
@Audited
@Table(name = "CONTROLE_CUMBUCA")
@SequenceGenerator(name = "CONTROLECUMBUCA_SEQUENCE", sequenceName = "CONTROLECUMBUCA_SEQUENCE")
public class ControleCumbuca extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CONTROLECUMBUCA_SEQUENCE")	
	private Integer id;
		
	@Column(name = "DT_REGISTRO")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	private LocalDate dataRegistro;  			
		
	@Column(name = "PESO")
	private Double peso;  			
		
	@Column(name = "TIPO")
	private Integer tipo;  			
		
	@Column(name = "QUANTIDADE_CACHOS")
	private Integer quantidadeCachos;  			
	
	@ManyToOne
	@JoinColumn(name = "ID_CABINE")
	private Cabine cabine;		
		
	public  ControleCumbuca() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public LocalDate getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(LocalDate dataRegistro) {
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
	public Cabine getCabine() {
		return cabine;
	}
	
	public void setCabine(Cabine cabine) {
		this.cabine = cabine;
	}
	
	
}
