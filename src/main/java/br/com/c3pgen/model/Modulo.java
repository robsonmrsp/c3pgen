package br.com.c3pgen.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

/**
 * generated: 05/08/2016 15:23:44
 **/
@Entity
//@Audited
@Table(name = "MODULO")
@SequenceGenerator(name = "MODULO_SEQUENCE", sequenceName = "MODULO_SEQUENCE")
public class Modulo extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MODULO_SEQUENCE")
	private Integer id;

	@Column(name = "NOME")
	private String nome;

	@Column(name = "PACKAGE_NAME")
	private String packageName;

	@OneToMany(mappedBy = "modulo")
	@Cascade(CascadeType.ALL)
	private List<ItemModulo> items;
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	@ManyToOne
	@JoinColumn(name = "ID_APPLICATION")
	private Application application;

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public Modulo() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setItems(List<ItemModulo> items) {
		this.items = items;
	}

	public List<ItemModulo> getItems() {
		if (this.items == null) {
			setItems(new ArrayList<ItemModulo>());
		}
		return this.items;
	}

	public boolean addItems(ItemModulo itemModulo) {
		itemModulo.setModulo(this);
		return getItems().add(itemModulo);
	}

	public boolean removeItems(ItemModulo itemModulo) {
		itemModulo.setModulo(null);
		return getItems().remove(itemModulo);
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

}
