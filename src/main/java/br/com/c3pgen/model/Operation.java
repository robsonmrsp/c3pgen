package br.com.c3pgen.model;

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


import br.com.c3pgen.serialization.CustomLocalDateSerializer;
import br.com.c3pgen.serialization.CustomLocalDateTimeSerializer;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

/**
* generated: 30/08/2015 20:23:12
Entity [name=Operation, displayName=Operação, hasOwner=false, attributes=[Attribute [name=name, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=canEdit, displayName=Pode Editar, type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=canRead, displayName=Pode Ler, type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=canUpdate, displayName=Pode atualizar, type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=canDelete, displayName=Pode Deletar, type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=canExecute, displayName=Pode executar, type=AttributeType [className=Boolean], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=permissions, model=Permission, viewAproach=com.mr.codegenerator.entities.ViewAproach@1810399e, type=OneToMany, displayName=Permissões, implementation=]]]
**/
@Entity
@Audited
@Table(name = "RBAC_OPERATION")
@SequenceGenerator(name = "OPERATION_SEQUENCE", sequenceName = "OPERATION_SEQUENCE")
public class Operation extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "OPERATION_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;  			
		
	@Column(name = "CAN_EDIT")
	private Boolean canEdit;  			
		
	@Column(name = "CAN_READ")
	private Boolean canRead;  			
		
	@Column(name = "CAN_UPDATE")
	private Boolean canUpdate;  			
		
	@Column(name = "CAN_DELETE")
	private Boolean canDelete;  			
		
	@Column(name = "CAN_EXECUTE")
	private Boolean canExecute;  			
	
	@OneToMany()
	private List<Permission> permissions;		
	
		
	public  Operation() {
		
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
	public Boolean getCanEdit() {
		return canEdit;
	}

	public void setCanEdit(Boolean canEdit) {
		this.canEdit = canEdit;
	}
	public Boolean getCanRead() {
		return canRead;
	}

	public void setCanRead(Boolean canRead) {
		this.canRead = canRead;
	}
	public Boolean getCanUpdate() {
		return canUpdate;
	}

	public void setCanUpdate(Boolean canUpdate) {
		this.canUpdate = canUpdate;
	}
	public Boolean getCanDelete() {
		return canDelete;
	}

	public void setCanDelete(Boolean canDelete) {
		this.canDelete = canDelete;
	}
	public Boolean getCanExecute() {
		return canExecute;
	}

	public void setCanExecute(Boolean canExecute) {
		this.canExecute = canExecute;
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
