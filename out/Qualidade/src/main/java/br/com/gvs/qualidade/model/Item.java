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
* generated: 03/09/2016 22:18:33
**/
@Entity
@Audited
@Table(name = "ITEM")
@SequenceGenerator(name = "ITEM_SEQUENCE", sequenceName = "ITEM_SEQUENCE")
public class Item extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ITEM_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;		
		
	@Column(name = "DESCRIPTION")
	private String description;		
	
	@ManyToOne
	@JoinColumn(name = "ID_TYPE")
	private ItemType type;		
	
	@OneToMany()
	private List<Permission> permissions;		
		
	public  Item() {
		
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
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	public ItemType getType() {
		return type;
	}
	
	public void setType(ItemType itemType) {
		this.type = itemType;
	}
	
	public void setPermissions(List<Permission> permissions){
		this.permissions = permissions;
	}
	
	public List<Permission>  getPermissions() {
		if(this.permissions == null){
			setPermissions(new ArrayList<Permission>());
		}
		return this.permissions;
	}
		
	public boolean addPermissions(Permission permission){
		return getPermissions().add(permission);
	}
	
	public boolean removePermissions(Permission permission){
		return getPermissions().remove(permission);
	}
	
	
}
