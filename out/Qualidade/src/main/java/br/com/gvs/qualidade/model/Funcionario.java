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
* generated: 02/09/2016 16:23:48
**/
@Entity
@Audited
@Table(name = "FUNCIONARIO")
@SequenceGenerator(name = "FUNCIONARIO_SEQUENCE", sequenceName = "FUNCIONARIO_SEQUENCE")
public class Funcionario extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FUNCIONARIO_SEQUENCE")	
	private Integer id;
		
	@Column(name = "MATRICULA")
	private String matricula;		
		
	@Column(name = "FOTO")
	private String foto;		
		
	@Column(name = "NOME")
	private String nome;		
		
	@Column(name = "TELEFONE")
	private String telefone;		
		
	@Column(name = "TELEFONE_2")
	private String telefone2;		
		
	@Column(name = "SEXO")
	private String sexo;		
		
	@Column(name = "DT_NASCIMENTO")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	private LocalDate dataNascimento;  			
		
	@Column(name = "SALARIO")
	private Double salario;  			
		
	@Column(name = "ESCOLARIDADE")
	private String escolaridade;		
		
	@Column(name = "DATA_ADMISSAO")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	private LocalDate dataAdmissao;  			
		
	@Column(name = "DATA_DEMISSAO")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	private LocalDate dataDemissao;  			
		
	@Column(name = "VALOR_HORA_EXTRA")
	private Double valorHoraExtra;  			
		
	@Column(name = "CARTEIRA_TRABALHO")
	private String carteiraTrabalho;		
		
	@Column(name = "RG")
	private String rg;		
		
	@Column(name = "RG_ORGAO_EMISSOR")
	private String rgOrgaoEmissor;		
		
	@Column(name = "NOME_BANCO")
	private String nomeBanco;		
		
	@Column(name = "BANCO_NUMERO_AGENCIA")
	private String bancoNumeroAgencia;		
		
	@Column(name = "BANCO_NUMERO_CONTA")
	private String bancoNumeroConta;		
		
	@Column(name = "PIS")
	private String pis;		
	
	@OneToOne
	@JoinColumn(name = "ID_ENDERECO")
	private Endereco endereco;
	
	@ManyToOne
	@JoinColumn(name = "ID_CARGO")
	private Cargo cargo;		
	
	@ManyToOne
	@JoinColumn(name = "ID_CBO")
	private Cbo cbo;		
	
	@ManyToOne
	@JoinColumn(name = "ID_DEPARTAMENTO")
	private Departamento departamento;		
	
	@ManyToOne
	@JoinColumn(name = "ID_FUNCAO")
	private Funcao funcao;		
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;
	
	public  Client getOwner() {
		return owner;
	}
	
	public void setOwner(Client owner) {
		this.owner = owner;
	}
		
	public  Funcionario() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getTelefone2() {
		return telefone2;
	}

	public void setTelefone2(String telefone2) {
		this.telefone2 = telefone2;
	}
	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	public Double getSalario() {
		return salario;
	}

	public void setSalario(Double salario) {
		this.salario = salario;
	}
	public String getEscolaridade() {
		return escolaridade;
	}

	public void setEscolaridade(String escolaridade) {
		this.escolaridade = escolaridade;
	}
	public LocalDate getDataAdmissao() {
		return dataAdmissao;
	}

	public void setDataAdmissao(LocalDate dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}
	public LocalDate getDataDemissao() {
		return dataDemissao;
	}

	public void setDataDemissao(LocalDate dataDemissao) {
		this.dataDemissao = dataDemissao;
	}
	public Double getValorHoraExtra() {
		return valorHoraExtra;
	}

	public void setValorHoraExtra(Double valorHoraExtra) {
		this.valorHoraExtra = valorHoraExtra;
	}
	public String getCarteiraTrabalho() {
		return carteiraTrabalho;
	}

	public void setCarteiraTrabalho(String carteiraTrabalho) {
		this.carteiraTrabalho = carteiraTrabalho;
	}
	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}
	public String getRgOrgaoEmissor() {
		return rgOrgaoEmissor;
	}

	public void setRgOrgaoEmissor(String rgOrgaoEmissor) {
		this.rgOrgaoEmissor = rgOrgaoEmissor;
	}
	public String getNomeBanco() {
		return nomeBanco;
	}

	public void setNomeBanco(String nomeBanco) {
		this.nomeBanco = nomeBanco;
	}
	public String getBancoNumeroAgencia() {
		return bancoNumeroAgencia;
	}

	public void setBancoNumeroAgencia(String bancoNumeroAgencia) {
		this.bancoNumeroAgencia = bancoNumeroAgencia;
	}
	public String getBancoNumeroConta() {
		return bancoNumeroConta;
	}

	public void setBancoNumeroConta(String bancoNumeroConta) {
		this.bancoNumeroConta = bancoNumeroConta;
	}
	public String getPis() {
		return pis;
	}

	public void setPis(String pis) {
		this.pis = pis;
	}
	public Endereco getEndereco() {
		return endereco;
	}
	
	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
	public Cargo getCargo() {
		return cargo;
	}
	
	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}
	
	public Cbo getCbo() {
		return cbo;
	}
	
	public void setCbo(Cbo cbo) {
		this.cbo = cbo;
	}
	
	public Departamento getDepartamento() {
		return departamento;
	}
	
	public void setDepartamento(Departamento departamento) {
		this.departamento = departamento;
	}
	
	public Funcao getFuncao() {
		return funcao;
	}
	
	public void setFuncao(Funcao funcao) {
		this.funcao = funcao;
	}
	
	
}
