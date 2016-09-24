package br.com.c3pgen.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

/**
* generated: 03/09/2015 14:51:48
Entity [name=Client, displayName=Cliente, hasOwner=false, attributes=[Attribute [name=logo, displayName=Logotipo, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=name, displayName=Nome, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=cnpj, displayName=CNPJ, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=phoneNumber, displayName=Telefone, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null], Attribute [name=corporateName, displayName=Razão Social, type=AttributeType [className=String], mask=, dateFormat=dd/MM/yyyy, placeholder=null, validationRules=null]], relationships=[]]
**/
@Entity
@Audited
@Table(name = "CLIENT")
@SequenceGenerator(name = "CLIENT_SEQUENCE", sequenceName = "CLIENT_SEQUENCE")
public class Client extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLIENT_SEQUENCE")	
	private Integer id;
		
	@Column(name = "LOGO")
	private String logo;  			
		
	@Column(name = "NAME")
	private String name;  			
		
	@Column(name = "CNPJ")
	private String cnpj;  			
		
	@Column(name = "PHONE_NUMBER")
	private String phoneNumber;  			
		
	@Column(name = "CORPORATE_NAME")
	private String corporateName;  			
	
		
	public  Client() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getCorporateName() {
		return corporateName;
	}

	public void setCorporateName(String corporateName) {
		this.corporateName = corporateName;
	}
	
}
