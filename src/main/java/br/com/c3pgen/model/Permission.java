package br.com.c3pgen.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

/**
* generated: 03/09/2015 14:51:49
Entity [name=Permission, displayName=Permissão, hasOwner=false, attributes=[Attribute [name=name, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=roles, model=Role, viewAproach=com.mr.codegenerator.entities.ViewAproach@6d78f375, type=ManyToMany, displayName=Papeis, implementation=], Relationship [name=operation, model=Operation, viewAproach=com.mr.codegenerator.entities.ViewAproach@50c87b21, type=ManyToOne, displayName=Operação, implementation=], Relationship [name=item, model=Item, viewAproach=com.mr.codegenerator.entities.ViewAproach@5f375618, type=ManyToOne, displayName=Item, implementation=]]]
**/
@Entity
@Audited
@Table(name = "RBAC_PERMISSION")
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
