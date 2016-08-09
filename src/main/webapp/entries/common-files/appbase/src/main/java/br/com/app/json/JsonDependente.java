package ${application.corePackage}.json;

import java.io.Serializable;


/**
*  generated: 22/09/2014 09:20:35
**/
public class JsonDependente implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
		
	private String nome;
	
	private String dataNascimento;  			
	private JsonEmpregado empregado;		
	
	public  JsonDependente() {
		
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
	public String getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
	}				
								
	
	public JsonEmpregado getEmpregado() {
		return empregado;
	}
	
	public void setEmpregado(JsonEmpregado empregado) {
		this.empregado = empregado;
	}
	
}