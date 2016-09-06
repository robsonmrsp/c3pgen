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
* generated: 03/09/2016 22:18:32
**/
@Entity
@Audited
@Table(name = "PACKING")
@SequenceGenerator(name = "PACKING_SEQUENCE", sequenceName = "PACKING_SEQUENCE")
public class Packing extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PACKING_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;		
	
	@OneToMany(mappedBy="packing")
	private List<ApontamentoQualidadePacking> apontamentoQualidadePackings;		
	
	@OneToMany(mappedBy="packing")
	private List<Cabine> cabines;		
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;
	
	public  Client getOwner() {
		return owner;
	}
	
	public void setOwner(Client owner) {
		this.owner = owner;
	}
		
	public  Packing() {
		
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
	public void setApontamentoQualidadePackings(List<ApontamentoQualidadePacking> apontamentoQualidadePackings){
		this.apontamentoQualidadePackings = apontamentoQualidadePackings;
	}
	
	public List<ApontamentoQualidadePacking>  getApontamentoQualidadePackings() {
		if(this.apontamentoQualidadePackings == null){
			setApontamentoQualidadePackings(new ArrayList<ApontamentoQualidadePacking>());
		}
		return this.apontamentoQualidadePackings;
	}
		
	public boolean addApontamentoQualidadePackings(ApontamentoQualidadePacking apontamentoQualidadePacking){
		return getApontamentoQualidadePackings().add(apontamentoQualidadePacking);
	}
	
	public boolean removeApontamentoQualidadePackings(ApontamentoQualidadePacking apontamentoQualidadePacking){
		return getApontamentoQualidadePackings().remove(apontamentoQualidadePacking);
	}
	
	public void setCabines(List<Cabine> cabines){
		this.cabines = cabines;
	}
	
	public List<Cabine>  getCabines() {
		if(this.cabines == null){
			setCabines(new ArrayList<Cabine>());
		}
		return this.cabines;
	}
		
	public boolean addCabines(Cabine cabine){
		return getCabines().add(cabine);
	}
	
	public boolean removeCabines(Cabine cabine){
		return getCabines().remove(cabine);
	}
	
	
}
