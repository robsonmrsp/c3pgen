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
* generated: 01/09/2016 17:25:05
**/
@Entity
@Audited
@Table(name = "CARGO")
@SequenceGenerator(name = "CARGO_SEQUENCE", sequenceName = "CARGO_SEQUENCE")
public class Cargo extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CARGO_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;		
	
	@OneToMany(mappedBy="cargo")
	private List<Funcionario> funcionarios;		
	
	@OneToMany(mappedBy="cargo")
	private List<ApontamentoQualidadePacking> apontamentoQualidadePackings;		
		
	public  Cargo() {
		
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
	public void setFuncionarios(List<Funcionario> funcionarios){
		this.funcionarios = funcionarios;
	}
	
	public List<Funcionario>  getFuncionarios() {
		if(this.funcionarios == null){
			setFuncionarios(new ArrayList<Funcionario>());
		}
		return this.funcionarios;
	}
		
	public boolean addFuncionarios(Funcionario funcionario){
		return getFuncionarios().add(funcionario);
	}
	
	public boolean removeFuncionarios(Funcionario funcionario){
		return getFuncionarios().remove(funcionario);
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
	
	
}
