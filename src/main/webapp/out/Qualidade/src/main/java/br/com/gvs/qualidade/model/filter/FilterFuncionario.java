package br.com.gvs.qualidade.model.filter;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;


import br.com.gvs.core.serialization.CustomLocalDateSerializer;
import br.com.gvs.core.serialization.CustomLocalDateDeserializer;
import br.com.gvs.core.serialization.CustomLocalDateTimeSerializer;
import br.com.gvs.core.serialization.CustomLocalDateTimeDeserializer;


/**
*  generated: 24/09/2016 12:52:14
**/
public class FilterFuncionario implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String matricula;  			
	
	private String foto;  			
	
	private String nome;  			
	
	private String telefone;  			
	
	private String telefone2;  			
	
	private String sexo;  			
	
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	@JsonDeserialize(using = CustomLocalDateDeserializer.class)		
	private LocalDate dataNascimento;  			
	
	private Double salario;  			
	
	private String escolaridade;  			
	
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	@JsonDeserialize(using = CustomLocalDateDeserializer.class)		
	private LocalDate dataAdmissao;  			
	
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	@JsonDeserialize(using = CustomLocalDateDeserializer.class)		
	private LocalDate dataDemissao;  			
	
	private Double valorHoraExtra;  			
	
	private String carteiraTrabalho;  			
	
	private String rg;  			
	
	private String rgOrgaoEmissor;  			
	
	private String nomeBanco;  			
	
	private String bancoNumeroAgencia;  			
	
	private String bancoNumeroConta;  			
	
	private String pis;  			

	private Integer cargo;		
	private Integer cbo;		
	private Integer departamento;		
	private Integer funcao;		
	
	public  FilterFuncionario() {
		
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
		
	public Integer getCargo() {
		return cargo;
	}
	
	public void setCargo(Integer cargo) {
		this.cargo = cargo;
	}
	public Integer getCbo() {
		return cbo;
	}
	
	public void setCbo(Integer cbo) {
		this.cbo = cbo;
	}
	public Integer getDepartamento() {
		return departamento;
	}
	
	public void setDepartamento(Integer departamento) {
		this.departamento = departamento;
	}
	public Integer getFuncao() {
		return funcao;
	}
	
	public void setFuncao(Integer funcao) {
		this.funcao = funcao;
	}
	
}