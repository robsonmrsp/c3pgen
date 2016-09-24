package br.com.c3pgen.model.filter;

import java.io.Serializable;


/**
*  generated: 03/09/2015 14:51:49
**/
public class FilterOperation implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;  			
	
	private Boolean canEdit;  			
	
	private Boolean canRead;  			
	
	private Boolean canUpdate;  			
	
	private Boolean canDelete;  			
	
	private Boolean canExecute;  			

	
	public  FilterOperation() {
		
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public Boolean getCanEdit() {
		return canEdit;
	}

	public void setCanEdit(Boolean canEdit) {
		this.canEdit = canEdit;
	}
	public Boolean getCanRead() {
		return canRead;
	}

	public void setCanRead(Boolean canRead) {
		this.canRead = canRead;
	}
	public Boolean getCanUpdate() {
		return canUpdate;
	}

	public void setCanUpdate(Boolean canUpdate) {
		this.canUpdate = canUpdate;
	}
	public Boolean getCanDelete() {
		return canDelete;
	}

	public void setCanDelete(Boolean canDelete) {
		this.canDelete = canDelete;
	}
	public Boolean getCanExecute() {
		return canExecute;
	}

	public void setCanExecute(Boolean canExecute) {
		this.canExecute = canExecute;
	}
		
	
}