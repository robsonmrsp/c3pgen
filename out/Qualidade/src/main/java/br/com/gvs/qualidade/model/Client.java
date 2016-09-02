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
@Table(name = "CLIENT")
@SequenceGenerator(name = "CLIENT_SEQUENCE", sequenceName = "CLIENT_SEQUENCE")
public class Client extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLIENT_SEQUENCE")	
	private Integer id;
	
	@OneToMany()
	private List<Packing> packings;		
	
	@OneToMany()
	private List<Latada> latadas;		
	
	@OneToMany()
	private List<Funcionario> funcionarios;		
		
	public  Client() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public void setPackings(List<Packing> packings){
		this.packings = packings;
	}
	
	public List<Packing>  getPackings() {
		if(this.packings == null){
			setPackings(new ArrayList<Packing>());
		}
		return this.packings;
	}
		
	public boolean addPackings(Packing packing){
		return getPackings().add(packing);
	}
	
	public boolean removePackings(Packing packing){
		return getPackings().remove(packing);
	}
	
	public void setLatadas(List<Latada> latadas){
		this.latadas = latadas;
	}
	
	public List<Latada>  getLatadas() {
		if(this.latadas == null){
			setLatadas(new ArrayList<Latada>());
		}
		return this.latadas;
	}
		
	public boolean addLatadas(Latada latada){
		return getLatadas().add(latada);
	}
	
	public boolean removeLatadas(Latada latada){
		return getLatadas().remove(latada);
	}
	
	public void setFuncionarios(List<Funcionario> funcionarios){
		this.funcionarios = funcionarios;
	}
	
	public List<Funcionario>  getFuncionarios() {
		if(this.funcionarios == null){
			setFuncionarios(new ArrayList<Funcionario>());
		}
		return this.funcionarios;
	}
		
	public boolean addFuncionarios(Funcionario funcionario){
		return getFuncionarios().add(funcionario);
	}
	
	public boolean removeFuncionarios(Funcionario funcionario){
		return getFuncionarios().remove(funcionario);
	}
	
	
}
