package br.com.c3pgen.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
* generated: 03/09/2015 14:51:48
Entity [name=Item, displayName=Item, hasOwner=false, attributes=[Attribute [name=name, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=description, displayName=Descrição, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=type, model=ItemType, viewApproach=com.mr.codegenerator.entities.ViewApproach@5ae9a829, type=ManyToOne, displayName=Tipo, implementation=], Relationship [name=permissions, model=Permission, viewApproach=com.mr.codegenerator.entities.ViewApproach@6d8a00e3, type=OneToMany, displayName=Permissões, implementation=]]]
**/
@Entity
//@Audited
@Table(name = "RBAC_ITEM")
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
