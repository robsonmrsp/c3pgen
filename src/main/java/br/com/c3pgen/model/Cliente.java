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
import javax.persistence.UniqueConstraint;		

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
Entity [name=Cliente, displayName=Cliente, hasOwner=false, attributes=[Attribute [name=nome, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=email, displayName=Email, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=cpf, displayName=cpf, type=AttributeType [className=String], mask=999.999.999-99, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=telefone, displayName=Outro Telefone, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=outroTelefone, displayName=Outro Telefone, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=endereco, model=Endereco, viewAproach=com.mr.codegenerator.entities.ViewAproach@573f2bb1, type=OneToOne, displayName=Endereco, implementation=]]]
**/
@Entity
@Audited

@Table(name = "CLIENTE", uniqueConstraints = {
		@UniqueConstraint(name = "CLIENTE_CPF", columnNames = { "CPF" }), 
})
@SequenceGenerator(name = "CLIENTE_SEQUENCE", sequenceName = "CLIENTE_SEQUENCE")
public class Cliente extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLIENTE_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;  			
		
	@Column(name = "EMAIL")
	private String email;  			
		
	@Column(name = "CPF")
	private String cpf;  			
		
	@Column(name = "TELEFONE_COMERCIAL")
	private String telefone;  			
		
	@Column(name = "OUTRO_TELEFONE")
	private String outroTelefone;  			
	
	@OneToOne
	@JoinColumn(name = "ID_ENDERECO")
	private Endereco endereco;
	
		
	public  Cliente() {
		
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
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getOutroTelefone() {
		return outroTelefone;
	}

	public void setOutroTelefone(String outroTelefone) {
		this.outroTelefone = outroTelefone;
	}
	public Endereco getEndereco() {
		return endereco;
	}
	
	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
	
}
