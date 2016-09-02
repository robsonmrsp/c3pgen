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
* generated: 02/09/2016 16:23:49
**/
@Entity
@Audited
@Table(name = "ROLE")
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
