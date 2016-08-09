package ${application.corePackage}.model;

import java.io.Serializable;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import ${application.rootPackage}.model.User;

@Entity
@Audited
@Table(name = "clients")
@SequenceGenerator(name = "CLIENT_SEQUENCY", sequenceName = "CLIENT_SEQUENCY")
public class Client implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLIENT_SEQUENCY")
	private Integer id;

	@Column(name = "cpf", length = 14)
	private String cpf;

	@Column(name = "cnpj", length = 14)
	private String cnpj;

	@Column(name = "fone_number", length = 17)
	private String foneNumber;

	@Column(name = "corporate_name", length = 256)
	private String corporateName;

	@Column(name = "name", length = 256)
	private String name;

	@OneToMany(mappedBy = "owner")
	private Set<User> users;

	@Column(name = "logo")
	private String logo;

	public Client() {
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getFoneNumber() {
		return foneNumber;
	}

	public void setFoneNumber(String foneNumber) {
		this.foneNumber = foneNumber;
	}

	public String getCorporateName() {
		return corporateName;
	}

	public void setCorporateName(String corporateName) {
		this.corporateName = corporateName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

}