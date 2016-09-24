package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:49
**/
public class FilterUser implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private String username;  			
	
	private String password;  			
	
	private Boolean enable;  			
	
	private String image;  			

	private Integer owner;		
	
	public  FilterUser() {
		
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
		
	public Integer getOwner() {
		return owner;
	}
	
	public void setOwner(Integer owner) {
		this.owner = owner;
	}
	
}