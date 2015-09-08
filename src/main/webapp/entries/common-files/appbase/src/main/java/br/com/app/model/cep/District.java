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
 * The persistent class for the BAIRRO database table.
 * 
 */
@Entity
@Table(name = "district")
public class District implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column
	private Integer id;

	@Column(name = "NOME")
	private String name;

	@ManyToOne
	@JoinColumn(name = "ID_CITY")
	private City city;

	@ManyToOne
	@JoinColumn(name = "ID_STATE")
	private State state;

	@OneToMany(mappedBy = "district")
	private List<Zip> zips;

	public District() {
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

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public List<Zip> getZips() {
		return zips;
	}

	public void setZips(List<Zip> zips) {
		this.zips = zips;
	}

}