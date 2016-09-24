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
* generated: 24/09/2016 11:56:38
**/
@Entity
@Audited
@Table(name = "PERMISSION")
@SequenceGenerator(name = "PERMISSION_SEQUENCE", sequenceName = "PERMISSION_SEQUENCE")
public class Permission extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PERMISSION_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;		
	
    @ManyToMany(mappedBy="permissions")
    private List<Role> roles;
	
	@ManyToOne
	@JoinColumn(name = "ID_OPERATION")
	private Operation operation;		
	
	@ManyToOne
	@JoinColumn(name = "ID_ITEM")
	private Item item;		
		
	public  Permission() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public void setRoles(List<Role> roles){
		this.roles = roles;
	}
	
	public List<Role>  getRoles() {
		if(this.roles == null){
			setRoles(new ArrayList<Role>());
		}
		return this.roles; 
	}
		
	public boolean addRoles(Role role){	
		return getRoles().add(role);
	}
	
	public boolean removeRoles(Role role){	
		return getRoles().remove(role);
	}
	public Operation getOperation() {
		return operation;
	}
	
	public void setOperation(Operation operation) {
		this.operation = operation;
	}
	
	public Item getItem() {
		return item;
	}
	
	public void setItem(Item item) {
		this.item = item;
	}
	
	
}
