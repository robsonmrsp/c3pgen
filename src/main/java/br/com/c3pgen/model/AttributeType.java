package br.com.c3pgen.model;

import java.util.HashMap;
import java.util.Map;

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
 * generated: 03/09/2015 14:51:48 
 **/
@Entity
//@Audited
@Table(name = "ATTRIBUTE_TYPE")
@SequenceGenerator(name = "ATTRIBUTETYPE_SEQUENCE", sequenceName = "ATTRIBUTETYPE_SEQUENCE")
public class AttributeType extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ATTRIBUTETYPE_SEQUENCE")
	private Integer id;

	@Column(name = "CLASSNAME")
	private String className;

	@Column(name = "FORMAT")
	private String format;

	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	static Map<String, AttributeType> map = new HashMap<String, AttributeType>();
	public static final AttributeType STRING = new AttributeType("String");
	public static final AttributeType INTEGER = new AttributeType("Integer");
	public static final AttributeType DOUBLE = new AttributeType("Double");
	public static final AttributeType DATE = new AttributeType("Date");
	public static final AttributeType DATETIME = new AttributeType("DateTime");
	public static final AttributeType TIMESTAMP = new AttributeType("DateTime");
	public static final AttributeType BOOLEAN = new AttributeType("Boolean");
	static {
		map.put("String", STRING);
		map.put("string", STRING);
		map.put("Integer", INTEGER);
		map.put("integer", INTEGER);
		map.put("Double", DOUBLE);
		map.put("double", DOUBLE);
		map.put("Date", DATE);
		map.put("date", DATE);
		map.put("DateTime", DATETIME);
		map.put("dateTime", DATETIME);
		map.put("Datetime", DATETIME);
		map.put("datetime", DATETIME);
		map.put("timestamp", DATETIME);
		map.put("Boolean", BOOLEAN);
		map.put("boolean", BOOLEAN);

	}

	public AttributeType() {

	}

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public AttributeType(String className) {
		this.className = className;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public static AttributeType byName(String name) {
		return map.get(name);
	}

	public Boolean hasNumeric() {
		if (getClassName().equalsIgnoreCase("integer") || getClassName().equalsIgnoreCase("double") || getClassName().equalsIgnoreCase("float")) {
			return Boolean.TRUE;
		}
		return Boolean.FALSE;
	}

}
