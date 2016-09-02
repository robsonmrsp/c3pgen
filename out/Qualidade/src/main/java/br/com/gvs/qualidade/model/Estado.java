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
import javax.persistence.UniqueConstraint;		

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
* generated: 02/09/2016 16:23:48
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
