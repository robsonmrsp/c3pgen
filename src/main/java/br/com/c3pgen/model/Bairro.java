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

/**
* generated: 03/09/2015 14:51:48
Entity [name=Bairro, displayName=Bairro, hasOwner=false, attributes=[Attribute [name=nome, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=cidade, model=Cidade, viewApproach=com.mr.codegenerator.entities.ViewApproach@66d2e7d9, type=ManyToOne, displayName=Cidade, implementation=], Relationship [name=estado, model=Estado, viewApproach=com.mr.codegenerator.entities.ViewApproach@1efbd816, type=ManyToOne, displayName=Estado, implementation=]]]
**/
@Entity
//@Audited
@Table(name = "BAIRRO")
@SequenceGenerator(name = "BAIRRO_SEQUENCE", sequenceName = "BAIRRO_SEQUENCE")
public class Bairro extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BAIRRO_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;  			
	
	@ManyToOne
	@JoinColumn(name = "ID_CIDADE")
	private Cidade cidade;		
	
	@ManyToOne
	@JoinColumn(name = "ID_ESTADO")
	private Estado estado;		
	
		
	public  Bairro() {
		
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
