package ${application.rootPackage}.model.cep;

import java.io.Serializable;

import javax.persistence.*;

/**
 * The persistent class for the ENDERECO database table.
 * 
 */
@Entity
@Table(name = "zip")
public class Zip implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column
	private Integer id;

	@Column(name = "zip_code")
	private String zipCode;

	/* Rua, Av, Alameda, etc */
	@Column(name = "address_line")
	private String addressLine;

	@ManyToOne
	@JoinColumn(name = "ID_DISTRICT")
	private District district;

	@ManyToOne
	@JoinColumn(name = "ID_CITY")
	private City city;

	@ManyToOne
	@JoinColumn(name = "ID_STATE")
	private State state;

	public Zip() {
	}

	public Zip(Integer id) {
		this.id = id;
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

	public String getAddressLine() {
		return addressLine;
	}

	public void setAddressLine(String addressLine) {
		this.addressLine = addressLine;
	}

	public District getDistrict() {
		return district;
	}

	public void setDistrict(District district) {
		this.district = district;
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
}