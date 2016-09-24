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
*  generated: 24/09/2016 11:56:33
**/
public class FilterControleCumbuca implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	@JsonDeserialize(using = CustomLocalDateDeserializer.class)		
	private LocalDate dataRegistro;  			
	
	private Double peso;  			
	
	private Integer tipo;  			
	
	private Integer quantidadeCachos;  			

	private Integer cabine;		
	
	public  FilterControleCumbuca() {
		
	}
	

	public LocalDate getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(LocalDate dataRegistro) {
		this.dataRegistro = dataRegistro;
	}
	public Double getPeso() {
		return peso;
	}

	public void setPeso(Double peso) {
		this.peso = peso;
	}
	public Integer getTipo() {
		return tipo;
	}

	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}
	public Integer getQuantidadeCachos() {
		return quantidadeCachos;
	}

	public void setQuantidadeCachos(Integer quantidadeCachos) {
		this.quantidadeCachos = quantidadeCachos;
	}
		
	public Integer getCabine() {
		return cabine;
	}
	
	public void setCabine(Integer cabine) {
		this.cabine = cabine;
	}
	
}