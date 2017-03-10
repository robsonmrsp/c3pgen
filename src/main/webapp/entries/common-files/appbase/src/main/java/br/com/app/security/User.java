package ${application.rootPackage}.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.envers.Audited;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import ${application.corePackage}.model.AbstractTimestampEntity;
import ${application.corePackage}.security.UserAuthorityUtils;

/**
*  generated: ${.now}
**/
@Entity
@Audited
@Table(name = "APP_USER", uniqueConstraints = { @UniqueConstraint(name = "APP_USER_NAME", columnNames = { "NAME" }), @UniqueConstraint(name = "APP_USER_USERNAME", columnNames = { "USERNAME" }), })
public class User extends AbstractTimestampEntity implements UserDetails {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "NAME", columnDefinition = "varchar")
	private String name;

	@Column(name = "USERNAME", columnDefinition = "varchar")
	private String username;

	@Column(name = "PASSWORD", columnDefinition = "varchar")
	private String password;

	@Column(name = "ENABLE")
	private Boolean enable;

	@Column(name = "IMAGE", columnDefinition = "varchar")
	private String image;

	@ManyToMany
	@Cascade(value = CascadeType.SAVE_UPDATE)
	@JoinTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "ID_USER", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "ID_ROLE", referencedColumnName = "ID"))
	private List<Role> roles;

	public User() {

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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getEnable() {
		return enable;
	}

	public void setEnable(Boolean enable) {
		this.enable = enable;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public List<Role> getRoles() {

		return this.roles;
	}

	public boolean addRoles(Role role) {
		if (this.roles == null) {
			setRoles(new ArrayList<Role>());
		}
		return getRoles().add(role);
	}

	public boolean removeRoles(Role role) {
		if (this.roles == null) {
			setRoles(new ArrayList<Role>());
		}
		return getRoles().remove(role);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<? extends GrantedAuthority> createAuthorities = UserAuthorityUtils.createAuthorities(this);
		return createAuthorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		return enable;
	}
}
