package br.com.c3pgen.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

/**
* generated: 03/09/2015 14:51:49
Entity [name=Role, displayName=Papel, hasOwner=false, attributes=[Attribute [name=authority, displayName=Autoridade, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=description, displayName=Descrição, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[Relationship [name=sessions, model=Session, viewApproach=com.mr.codegenerator.entities.ViewApproach@1810399e, type=ManyToMany, displayName=Sessões, implementation=], Relationship [name=users, model=User, viewApproach=com.mr.codegenerator.entities.ViewApproach@32d992b2, type=ManyToMany, displayName=Usuários, implementation=], Relationship [name=permissions, model=Permission, viewApproach=com.mr.codegenerator.entities.ViewApproach@215be6bb, type=ManyToMany, displayName=Permissões, implementation=]]]
**/
@Entity
//@Audited
@Table(name = "RBAC_ROLE")
@SequenceGenerator(name = "ROLE_SEQUENCE", sequenceName = "ROLE_SEQUENCE")
public class Role extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ROLE_SEQUENCE")	
	private Integer id;
		
	@Column(name = "AUTHORITY")
	private String authority;  			
		
	@Column(name = "DESCRIPTION")
	private String description;  			
	
    @ManyToMany(mappedBy="roles")
    private List<Session> sessions;
	
    @ManyToMany(mappedBy="roles")
    private List<User> users;
	
    @ManyToMany
    @Cascade(value = CascadeType.ALL)
    @JoinTable(name="ROLE_PERMISSION", joinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "PERMISSION_ID", referencedColumnName = "ID") )
    private List<Permission> permissions;
	
		
	public  Role() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	public void setSessions(List<Session> sessions){
		this.sessions = sessions;
	}
	
	public List<Session>  getSessions() {
		if(this.sessions == null){
			setSessions(new ArrayList<Session>());
		}
		return this.sessions; 
	}
		
	public boolean addSessions(Session session){	
		return getSessions().add(session);
	}
	
	public boolean removeSessions(Session session){	
		return getSessions().remove(session);
	}
	public void setUsers(List<User> users){
		this.users = users;
	}
	
	public List<User>  getUsers() {
		if(this.users == null){
			setUsers(new ArrayList<User>());
		}
		return this.users; 
	}
		
	public boolean addUsers(User user){	
		return getUsers().add(user);
	}
	
	public boolean removeUsers(User user){	
		return getUsers().remove(user);
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
