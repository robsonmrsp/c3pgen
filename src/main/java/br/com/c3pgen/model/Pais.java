package br.com.c3pgen.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
* generated: 03/09/2015 14:51:48
Entity [name=Pais, displayName=Pais, hasOwner=false, attributes=[Attribute [name=codigo, displayName=Código, type=AttributeType [className=Integer], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=nome, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[]]
**/
@Entity
//@Audited
@Table(name = "PAIS")
@SequenceGenerator(name = "PAIS_SEQUENCE", sequenceName = "PAIS_SEQUENCE")
public class Pais extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PAIS_SEQUENCE")	
	private Integer id;
		
	@Column(name = "CODIGO")
	private Integer codigo;  			
		
	@Column(name = "NOME")
	private String nome;  			
	
		
	public  Pais() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
