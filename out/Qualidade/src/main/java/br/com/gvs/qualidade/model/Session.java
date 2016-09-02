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
@Table(name = "SESSION")
@SequenceGenerator(name = "SESSION_SEQUENCE", sequenceName = "SESSION_SEQUENCE")
public class Session extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SESSION_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;		
		
	@Column(name = "CREATION_DATE")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDateTime")
	@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	private LocalDateTime creationDate;
	
    @ManyToMany
    @Cascade(value = CascadeType.ALL)
    @JoinTable(name="SESSION_ROLE", joinColumns = @JoinColumn(name = "SESSION_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID") )
    private List<Role> roles;
	
	@ManyToOne
	@JoinColumn(name = "ID_USER")
	private User user;		
		
	public  Session() {
		
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
	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
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
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	
}
