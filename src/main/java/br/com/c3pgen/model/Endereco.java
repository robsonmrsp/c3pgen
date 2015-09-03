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
* generated: 03/09/2015 14:51:48
Entity [name=Endereco, displayName=Endereco, hasOwner=false, attributes=[Attribute [name=complemento, displayName=Complemento, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=numero, displayName=Número, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=cep, model=Cep, viewAproach=com.mr.codegenerator.entities.ViewAproach@48eff760, type=ManyToOne, displayName=Cep, implementation=]]]
**/
@Entity
@Audited
@Table(name = "ENDERECO")
@SequenceGenerator(name = "ENDERECO_SEQUENCE", sequenceName = "ENDERECO_SEQUENCE")
public class Endereco extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ENDERECO_SEQUENCE")	
	private Integer id;
		
	@Column(name = "COMPLEMENTO")
	private String complemento;  			
		
	@Column(name = "NUMERO")
	private String numero;  			
	
	@ManyToOne
	@JoinColumn(name = "ID_CEP")
	private Cep cep;		
	
		
	public  Endereco() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}
	public Cep getCep() {
		return cep;
	}
	
	public void setCep(Cep cep) {
		this.cep = cep;
	}
	
	
}
