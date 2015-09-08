package ${application.rootPackage}.model.cep;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The persistent class for the ESTADO database table.
 * 
 */
@Entity
@Table(name = "state")
public class State implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "code")
	private String code;

	@Column(name = "END_RANGE_ZIP1")
	private String faixaCep1Fim;

	@Column(name = "INI_RANGE_ZIP1")
	private String faixaCep1Ini;

	@Column(name = "END_RANGE_ZIP2")
	private String faixaCep2Fim;

	@Column(name = "INI_RANGE_ZIP2")
	private String faixaCep2Ini;

	@Column(name = "name")
	private String name;

	@OneToMany(mappedBy = "state")
	private List<City> cities;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getFaixaCep1Fim() {
		return faixaCep1Fim;
	}

	public void setFaixaCep1Fim(String faixaCep1Fim) {
		this.faixaCep1Fim = faixaCep1Fim;
	}

	public String getFaixaCep1Ini() {
		return faixaCep1Ini;
	}

	public void setFaixaCep1Ini(String faixaCep1Ini) {
		this.faixaCep1Ini = faixaCep1Ini;
	}

	public String getFaixaCep2Fim() {
		return faixaCep2Fim;
	}

	public void setFaixaCep2Fim(String faixaCep2Fim) {
		this.faixaCep2Fim = faixaCep2Fim;
	}

	public String getFaixaCep2Ini() {
		return faixaCep2Ini;
	}

	public void setFaixaCep2Ini(String faixaCep2Ini) {
		this.faixaCep2Ini = faixaCep2Ini;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<City> getCities() {
		return cities;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

}