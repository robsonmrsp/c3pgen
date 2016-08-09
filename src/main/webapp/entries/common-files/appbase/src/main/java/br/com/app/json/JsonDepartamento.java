package ${application.corePackage}.json;

import java.io.Serializable;


/**
*  generated: 22/09/2014 09:20:34
**/
public class JsonDepartamento implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
		
	private String descricao;
	
	public  JsonDepartamento() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	
}