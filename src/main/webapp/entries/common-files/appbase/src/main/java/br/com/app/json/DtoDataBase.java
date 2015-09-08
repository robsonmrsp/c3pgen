package ${application.rootPackage}.json;

import java.util.ArrayList;
import java.util.List;


public class DtoDataBase {

	private String clienteId;

	<#list application.entities as entity>
	<#if entity.hasMobile == true>
	private List<Json${entity.name}> ${firstLower(entity.name)}s  = new ArrayList<Json${entity.name}>();
	private List<Conflict<Json${entity.name}>> ${firstLower(entity.name)}sConflict = new ArrayList<Conflict<Json${entity.name}>>();
	</#if>
	</#list>


	public String getClienteId() {
		return clienteId;
	}
	
	public void setClienteId(String clienteId) {
		this.clienteId = clienteId;
	}
	<#list application.entities as entity>
	<#if entity.hasMobile == true>

	public List<Json${entity.name}> get${entity.name}s() {
		return ${firstLower(entity.name)}s;
	}

	public void set${entity.name}s(List<Json${entity.name}> ${firstLower(entity.name)}s) {
		this.${firstLower(entity.name)}s = ${firstLower(entity.name)}s;
	}
	
	public List<Conflict<Json${entity.name}>> get${entity.name}sConflict() {
		return ${firstLower(entity.name)}sConflict;
	}
	
	public void set${entity.name}sConflict(List<Conflict<Json${entity.name}>> ${firstLower(entity.name)}sConflict) {
		this.${firstLower(entity.name)}sConflict = ${firstLower(entity.name)}sConflict;
	}
	public void addConflict(Json${entity.name} changedByMe, Json${entity.name} changedByOther) {
		Conflict<Json${entity.name}> e = new Conflict<Json${entity.name}>(changedByMe, changedByOther);
		get${entity.name}sConflict().add(e);
	}
	</#if>
	</#list>

}
