package ${application.corePackage}.json;

import java.io.Serializable;


/**
*  generated: 19/02/2014 19:14:30
**/
public class JsonUser implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
		
	private String fullName;  			
	private String login;  			
	private String email;  			
	private String password;  			
	private Boolean enable;  			
	
	public  JsonUser() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
				
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
				
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}
				
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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
	
}