package ${package}.model;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import ${corepackage}.serialization.CustomLocalDateSerializer;
import ${corepackage}.serialization.CustomLocalDateDeserializer;
import ${corepackage}.serialization.CustomLocalDateTimeSerializer;
import ${corepackage}.serialization.CustomLocalDateTimeDeserializer;


/**
* generated: ${.now}
**/
public class ${entity.name} {
	
	private Integer id;
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
		
			<#if dataType(att.type.className) ==  "LocalDateTime" >
	@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	@JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
	private ${dataType(att.type.className)} ${att.name};
			<#elseif  dataType(att.type.className) ==  "LocalDate" >
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	@JsonDeserialize(using = CustomLocalDateDeserializer.class)
	private ${dataType(att.type.className)} ${att.name};  			
			<#elseif  dataType(att.type.className) ==  "String" >
				<#if att.maxLen?? >
				<#else>
				</#if>
	private String ${att.name};		
			<#elseif dataType(att.type.className)!=''>
				<#if dataType(att.type.className) == 'Double'>
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
				</#if>  
	private ${dataType(att.type.className)} ${att.name};
			</#if>  
		</#if>
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
	private List<${firstUpper(rel.model)}> ${(rel.name)};		
		<#elseif rel.type == 'ManyToOne'>
	private ${firstUpper(rel.model)} ${firstLower(rel.name)};		
		<#elseif rel.type == 'ManyToMany'>
			<#if rel.ownerName??> 
    private List<${firstUpper(rel.model)}> ${(rel.name)!firstLower(rel.model)};
			<#else>
        	<#if rel.viewApproach?? >
			</#if>
				<#if dataBasePrefix??>
    private List<${firstUpper(rel.model)}> ${(rel.name)};
    			<#else>
    private List<${firstUpper(rel.model)}> ${(rel.name)};
				</#if>		
			</#if>		
		<#elseif rel.type == 'OneToOne'>
			<#if rel.ownerName??>
	private ${firstUpper(rel.model)} ${firstLower(rel.name)!firstLower(rel.model)};
			<#else>
	private ${firstUpper(rel.model)} ${firstLower(rel.name)!firstLower(rel.model)};
			</#if>
		</#if>
	</#list>
	</#if>
		
	public  ${entity.name}() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
	public ${dataType(att.type.className)} get${firstUpper(att.name)}() {
		return ${att.name};
	}

	public void set${firstUpper(att.name)}(${dataType(att.type.className)} ${att.name}) {
		this.${att.name} = ${att.name};
	}
		</#if>
	</#list>
	<#if entity.relationships??>		
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
	public void set${firstUpper(rel.name)}(List<${firstUpper(rel.model)}> ${rel.name}){
		this.${rel.name} = ${rel.name};
	}
	
	public List<${firstUpper(rel.model)}>  get${firstUpper(rel.name)}() {
		if(this.${firstLower(rel.name)} == null){
			set${firstUpper(rel.name)}(new ArrayList<${firstUpper(rel.model)}>());
		}
		return this.${(rel.name)};
	}
		
	public boolean add${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}){
		<#if rel.uniDirecional == false>
		<#if rel.ownerName??>
		${firstLower(rel.model)}.set${firstUpper(rel.ownerName)}(this);
		</#if>
		</#if>
		return get${firstUpper(rel.name)}().add(${firstLower(rel.model)});
	}
	
	public boolean remove${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}){
		<#if rel.uniDirecional == false >
		<#if rel.ownerName??>
		${firstLower(rel.model)}.set${firstUpper(rel.ownerName)}(null);
		</#if>
		</#if>
		return get${firstUpper(rel.name)}().remove(${firstLower(rel.model)});
	}
	
		<#elseif rel.type == 'ManyToOne'>
	public ${firstUpper(rel.model)} get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)};
	}
	
	public void set${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}
	
		<#elseif rel.type == 'ManyToMany'>
	public void set${firstUpper(rel.name)}(List<${firstUpper(rel.model)}> ${rel.name}){
		this.${(rel.name)} = ${rel.name};
	}
	
	public List<${firstUpper(rel.model)}>  get${firstUpper(rel.name)}() {
		if(this.${firstLower(rel.name)} == null){
			set${firstUpper(rel.name)}(new ArrayList<${firstUpper(rel.model)}>());
		}
		return this.${(rel.name)}; 
	}
		
	public boolean add${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}){	
		return get${firstUpper(rel.name)}().add(${firstLower(rel.model)});
	}
	
	public boolean remove${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}){	
		return get${firstUpper(rel.name)}().remove(${firstLower(rel.model)});
	}
		<#elseif rel.type == 'ManyToOne'>
	public  ${firstUpper(rel.name)} get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)}
	}
	
	public void set${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}
		<#elseif rel.type == 'OneToOne'>
	public ${firstUpper(rel.model)} get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)};
	}
	
	public void set${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}
		</#if>
	</#list>
	</#if>
	
}
