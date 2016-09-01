package br.com.gvs.qualidade.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.gvs.core.json.SyncOperation;
import br.com.gvs.core.serialization.CustomSyncObjectIdDeserializer;
import br.com.gvs.core.serialization.CustomDoubleDeserializer;

/**
*  generated: 01/09/2016 17:25:05
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonFuncionario implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String matricula;
	private String foto;
	private String nome;
	private String telefone;
	private String telefone2;
	private String sexo;
	private String dataNascimento;  			
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double salario;
	private String escolaridade;
	private String dataAdmissao;  			
	private String dataDemissao;  			
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double valorHoraExtra;
	private String carteiraTrabalho;
	private String rg;
	private String rgOrgaoEmissor;
	private String nomeBanco;
	private String bancoNumeroAgencia;
	private String bancoNumeroConta;
	private String pis;
	private JsonEndereco endereco;	
	private JsonCargo cargo;		
	private JsonCbo cbo;		
	private JsonDepartamento departamento;		
	private JsonFuncao funcao;		
	
	public  JsonFuncionario() {
		
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
	public String getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(String dataNascimento) {
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
	public String getDataAdmissao() {
		return dataAdmissao;
	}

	public void setDataAdmissao(String dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}				
								
	public String getDataDemissao() {
		return dataDemissao;
	}

	public void setDataDemissao(String dataDemissao) {
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
	
	public JsonEndereco getEndereco() {
		return endereco;
	}
	
	public void setEndereco(JsonEndereco endereco) {
		this.endereco = endereco;
	}

	public JsonCargo getCargo() {
		return cargo;
	}
	
	public void setCargo(JsonCargo cargo) {
		this.cargo = cargo;
	}
	public JsonCbo getCbo() {
		return cbo;
	}
	
	public void setCbo(JsonCbo cbo) {
		this.cbo = cbo;
	}
	public JsonDepartamento getDepartamento() {
		return departamento;
	}
	
	public void setDepartamento(JsonDepartamento departamento) {
		this.departamento = departamento;
	}
	public JsonFuncao getFuncao() {
		return funcao;
	}
	
	public void setFuncao(JsonFuncao funcao) {
		this.funcao = funcao;
	}
	public SyncOperation getSyncOperation (){
		if(syncOperation == null){
			this.syncOperation = SyncOperation.NONE;
		}
		return syncOperation;
	}
	
	public void setSyncOperation (SyncOperation  syncOperation){
		this.syncOperation = syncOperation;
	}
	
}