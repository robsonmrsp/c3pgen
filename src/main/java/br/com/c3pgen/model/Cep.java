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
Entity [name=Cep, displayName=Cep, hasOwner=false, attributes=[Attribute [name=logradouro, displayName=Logadouro, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=numero, displayName=Numero, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=bairro, model=Bairro, viewAproach=com.mr.codegenerator.entities.ViewAproach@6a2bcfcb, type=ManyToOne, displayName=Bairro, implementation=], Relationship [name=cidade, model=Cidade, viewAproach=com.mr.codegenerator.entities.ViewAproach@4de8b406, type=ManyToOne, displayName=Cidade, implementation=], Relationship [name=estado, model=Estado, viewAproach=com.mr.codegenerator.entities.ViewAproach@3c756e4d, type=ManyToOne, displayName=Estado, implementation=]]]
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
