package ${application.rootPackage}.model.cep;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The persistent class for the CIDADE database table.
 * 
 */
@Entity
@Table(name = "city")
public class City implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column
	private Integer id;

	@Column(name = "ZIP_CODE")
	private String zipCode;

	@Column(name = "name")
	private String name;

	@OneToMany(mappedBy = "city")
	private List<District> districts;

	@ManyToOne
	@JoinColumn(name = "ID_STATE")
	private State state;

	public City() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<District> getDistricts() {
		return districts;
	}

	public void setDistricts(List<District> districts) {
		this.districts = districts;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}
}