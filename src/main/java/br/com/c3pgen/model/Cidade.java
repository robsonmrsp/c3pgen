package br.com.c3pgen.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

/**
* generated: 03/09/2015 14:51:48
Entity [name=Cidade, displayName=Cidade, hasOwner=false, attributes=[Attribute [name=nome, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=cep, displayName=Cep, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=estado, model=Estado, viewAproach=com.mr.codegenerator.entities.ViewAproach@7c0e2abd, type=ManyToOne, displayName=Cidade, implementation=]]]
**/
@Entity
@Audited
@Table(name = "CIDADE")
@SequenceGenerator(name = "CIDADE_SEQUENCE", sequenceName = "CIDADE_SEQUENCE")
public class Cidade extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CIDADE_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;  			
		
	@Column(name = "CEP")
	private String cep;  			
	
	@ManyToOne
	@JoinColumn(name = "ID_ESTADO")
	private Estado estado;		
	
		
	public  Cidade() {
		
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
	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}
	public Estado getEstado() {
		return estado;
	}
	
	public void setEstado(Estado estado) {
		this.estado = estado;
	}
	
	
}
