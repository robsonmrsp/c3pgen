package br.com.c3pgen.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * generated: 05/08/2016 15:23:43
 **/
@Entity
//@Audited
@Table(name = "ITEM_MODULO")
@SequenceGenerator(name = "ITEMMODULO_SEQUENCE", sequenceName = "ITEMMODULO_SEQUENCE")
public class ItemModulo extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ITEMMODULO_SEQUENCE")
	private Integer id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "YAML_CONTENT", columnDefinition = ColumnDefinitions.BIG_TEXT)
	private String yamlContent;

	@ManyToOne
	@JoinColumn(name = "ID_MODULO")
	private Modulo modulo;
	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public ItemModulo() {

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

	public String getYamlContent() {
		return yamlContent;
	}

	public void setYamlContent(String yamlContent) {
		this.yamlContent = yamlContent;
	}

	public Modulo getModulo() {
		return modulo;
	}

	public void setModulo(Modulo modulo) {
		this.modulo = modulo;
	}

}
