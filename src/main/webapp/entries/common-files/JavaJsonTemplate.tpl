package ${package}.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import java.time.LocalDate;
import java.time.LocalDateTime;

<#-- import com.fasterxml.jackson.annotation.JsonIgnoreProperties; -->     
<#-- import com.fasterxml.jackson.databind.annotation.JsonDeserialize; -->

<#-- import ${corepackage}.json.SyncOperation; -->
<#-- import ${corepackage}.serialization.CustomSyncObjectIdDeserializer; -->
<#-- import ${corepackage}.serialization.CustomDoubleDeserializer; -->

/* generated by JSetup ${JSetupVersion} :  at ${.now} */
<#-- @JsonIgnoreProperties(ignoreUnknown = true) -->
public class Json${entity.name} implements Serializable {
	private static final long serialVersionUID = 1L;
<#--	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class) -->
	private Integer id;
<#--		private SyncOperation syncOperation; -->
	<#if entity.attributes??>		
	<#list entity.attributes as att>
		<#if att.name != 'id'>		
		<#if dataType(att.type.className) ==  "LocalDateTime" >
	private LocalDateTime ${att.name};
		<#elseif  dataType(att.type.className) ==  "LocalDate" >
	private LocalDate ${att.name};  			
		<#elseif dataType(att.type.className)!=''>
			<#if dataType(att.type.className) == 'Double'>
<#--	@JsonDeserialize(using = CustomDoubleDeserializer.class) -->
			</#if>  
	private ${dataType(att.type.className)} ${att.name};
		<#else>  			
	private Json${att.type.className} ${att.name};
		</#if>  
		</#if>
	</#list>
	</#if>
<#-- -->
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
	private ArrayList<Json${firstUpper(rel.model)}> ${firstLower(rel.name)} = new ArrayList<Json${firstUpper(rel.model)}>();		
		<#elseif rel.type == 'ManyToOne'>
	private Json${firstUpper(rel.model)} ${firstLower(rel.name)};		
		<#elseif rel.type == 'ManyToMany'>
	private ArrayList<Json${firstUpper(rel.model)}> ${firstLower(rel.name)} = new ArrayList<Json${firstUpper(rel.model)}>();	
		<#elseif rel.type == 'OneToOne'>
	private Json${firstUpper(rel.model)} ${firstLower(rel.name)};	
		</#if>
	</#list>
	</#if>
	
	public  Json${firstUpper(entity.name)}() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
				<#if dataType(att.type.className) ==  "LocalDateTime" >
	public LocalDateTime get${firstUpper(att.name)}() {
		return ${att.name};
	}

	public void set${firstUpper(att.name)}(LocalDateTime ${att.name}) {
		this.${att.name} = ${att.name};
	}				
				<#elseif  dataType(att.type.className) ==  "LocalDate" >
	public LocalDate get${firstUpper(att.name)}() {
		return ${att.name};
	}

	public void set${firstUpper(att.name)}(LocalDate ${att.name}) {
		this.${att.name} = ${att.name};
	}				
								
				<#elseif dataType(att.type.className)!=''>
	public ${dataType(att.type.className)} get${firstUpper(att.name)}() {
		return ${att.name};
	}

	public void set${firstUpper(att.name)}(${dataType(att.type.className)} ${att.name}) {
		this.${att.name} = ${att.name};
	}
				<#else>
	public Json${att.type.className} get${firstUpper(att.name)}() {
		return ${att.name};
	}

	public void set${firstUpper(att.name)}(Json${att.type.className} ${att.name}) {
		this.${att.name} = ${att.name};
	}				
				</#if>  
		</#if>
	</#list>
	</#if>
	
	<#if entity.relationships??>		
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
	public ArrayList<Json${firstUpper(rel.model)}> get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)};
	}
	
	public void set${firstUpper(rel.name)}(ArrayList<Json${firstUpper(rel.model)}> ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}

		<#elseif rel.type == 'ManyToOne'>
	public Json${firstUpper(rel.model)} get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)};
	}
	
	public void set${firstUpper(rel.name)}(Json${firstUpper(rel.model)} ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}
		<#elseif rel.type == 'ManyToMany'>
	public ArrayList<Json${firstUpper(rel.model)}> get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)};
	}
	
	public void set${firstUpper(rel.name)}(ArrayList<Json${firstUpper(rel.model)}> ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}

		<#elseif rel.type == 'OneToOne'>
	public Json${firstUpper(rel.model)} get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)};
	}
	
	public void set${firstUpper(rel.name)}(Json${firstUpper(rel.model)} ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}
		</#if>
	</#list>
	</#if>
<#--		public SyncOperation getSyncOperation (){                           -->
<#--			if(syncOperation == null){                                      -->
<#--				this.syncOperation = SyncOperation.NONE;                    -->
<#--			}                                                               -->
<#--			return syncOperation;                                           -->
<#--		}                                                                   -->
<#--		                                                                    -->
<#--		public void setSyncOperation (SyncOperation  syncOperation){        -->
<#--			this.syncOperation = syncOperation;                             -->
<#--		}                                                                   -->
<#--		                                                                    -->

}
//generated by JSetup ${JSetupVersion} :  at ${.now}