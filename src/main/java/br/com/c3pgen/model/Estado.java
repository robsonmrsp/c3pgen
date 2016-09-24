package br.com.c3pgen.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.envers.Audited;

/**
* generated: 03/09/2015 14:51:48
Entity [name=Estado, displayName=Estado, hasOwner=false, attributes=[Attribute [name=nome, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=faixaCep1Ini, displayName=faixa_cep1_ini, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=faixaCep1Fim, displayName=faixa_cep1_fim, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=faixaCep2Ini, displayName=faixa_cep2_ini, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=faixaCep2Fim, displayName=faixa_cep2_fim, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[]]
**/
@Entity
@Audited

@Table(name = "ESTADO", uniqueConstraints = {
		@UniqueConstraint(name = "ESTADO_NOME", columnNames = { "NOME" }), 
})
@SequenceGenerator(name = "ESTADO_SEQUENCE", sequenceName = "ESTADO_SEQUENCE")
public class Estado extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ESTADO_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;  			
		
	@Column(name = "FAIXA_CEP1_INI")
	private String faixaCep1Ini;  			
		
	@Column(name = "FAIXA_CEP1_FIM")
	private String faixaCep1Fim;  			
		
	@Column(name = "FAIXA_CEP2_INI")
	private String faixaCep2Ini;  			
		
	@Column(name = "FAIXA_CEP2_FIM")
	private String faixaCep2Fim;  			
	
		
	public  Estado() {
		
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
	public String getFaixaCep1Ini() {
		return faixaCep1Ini;
	}

	public void setFaixaCep1Ini(String faixaCep1Ini) {
		this.faixaCep1Ini = faixaCep1Ini;
	}
	public String getFaixaCep1Fim() {
		return faixaCep1Fim;
	}

	public void setFaixaCep1Fim(String faixaCep1Fim) {
		this.faixaCep1Fim = faixaCep1Fim;
	}
	public String getFaixaCep2Ini() {
		return faixaCep2Ini;
	}

	public void setFaixaCep2Ini(String faixaCep2Ini) {
		this.faixaCep2Ini = faixaCep2Ini;
	}
	public String getFaixaCep2Fim() {
		return faixaCep2Fim;
	}

	public void setFaixaCep2Fim(String faixaCep2Fim) {
		this.faixaCep2Fim = faixaCep2Fim;
	}
	
}
