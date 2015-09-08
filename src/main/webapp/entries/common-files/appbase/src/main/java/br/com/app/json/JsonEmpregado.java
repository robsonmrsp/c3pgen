package ${application.rootPackage}.json;

import java.io.Serializable;


/**
*  generated: 22/09/2014 09:20:35
**/
public class JsonEmpregado implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
		
	private String matricula;
	private String nome;
	
	private String dataNascimento;  			
	private JsonDepartamento departamento;		
	
	public  JsonEmpregado() {
		
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
								
	
	public JsonDepartamento getDepartamento() {
		return departamento;
	}
	
	public void setDepartamento(JsonDepartamento departamento) {
		this.departamento = departamento;
	}
	
}