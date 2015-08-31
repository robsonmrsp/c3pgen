package br.com.c3pgen.model;

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


import br.com.c3pgen.serialization.CustomLocalDateSerializer;
import br.com.c3pgen.serialization.CustomLocalDateTimeSerializer;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

/**
* generated: 30/08/2015 20:23:12
Entity [name=Cep, displayName=Cep, hasOwner=false, attributes=[Attribute [name=logradouro, displayName=Logadouro, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=numero, displayName=Numero, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=bairro, model=Bairro, viewAproach=com.mr.codegenerator.entities.ViewAproach@48eff760, type=ManyToOne, displayName=Bairro, implementation=], Relationship [name=cidade, model=Cidade, viewAproach=com.mr.codegenerator.entities.ViewAproach@402f32ff, type=ManyToOne, displayName=Cidade, implementation=], Relationship [name=estado, model=Estado, viewAproach=com.mr.codegenerator.entities.ViewAproach@573f2bb1, type=ManyToOne, displayName=Estado, implementation=]]]
**/
@Entity
@Audited
@Table(name = "CEP")
@SequenceGenerator(name = "CEP_SEQUENCE", sequenceName = "CEP_SEQUENCE")
public class Cep extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CEP_SEQUENCE")	
	private Integer id;
		
	@Column(name = "LOGRADOURO")
	private String logradouro;  			
		
	@Column(name = "NUMERO")
	private String numero;  			
	
	@ManyToOne
	@JoinColumn(name = "ID_BAIRRO")
	private Bairro bairro;		
	
	@ManyToOne
	@JoinColumn(name = "ID_CIDADE")
	private Cidade cidade;		
	
	@ManyToOne
	@JoinColumn(name = "ID_ESTADO")
	private Estado estado;		
	
		
	public  Cep() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}
	public Bairro getBairro() {
		return bairro;
	}
	
	public void setBairro(Bairro bairro) {
		this.bairro = bairro;
	}
	
	public Cidade getCidade() {
		return cidade;
	}
	
	public void setCidade(Cidade cidade) {
		this.cidade = cidade;
	}
	
	public Estado getEstado() {
		return estado;
	}
	
	public void setEstado(Estado estado) {
		this.estado = estado;
	}
	
	
}
