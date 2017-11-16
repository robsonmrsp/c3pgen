package ${package}.model.filter;

import java.io.Serializable;

<#--import com.fasterxml.jackson.databind.annotation.JsonDeserialize;  -->
<#--import com.fasterxml.jackson.databind.annotation.JsonSerialize; -->
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
<#-- import ${corepackage}.serialization.CustomLocalDateSerializer;               -->
<#-- import ${corepackage}.serialization.CustomLocalDateDeserializer;             -->
<#-- import ${corepackage}.serialization.CustomLocalDateTimeSerializer;           -->
<#-- import ${corepackage}.serialization.CustomLocalDateTimeDeserializer;         -->
/* generated: ${.now} */
public class Filter${entity.name} implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
		<#if dataType(att.type.className) ==  "LocalDateTime" >
	<#--  @JsonSerialize(using = CustomLocalDateTimeSerializer.class) -->
	<#--  @JsonDeserialize(using = CustomLocalDateTimeDeserializer.class) -->
	private ${dataType(att.type.className)} ${att.name};
		<#elseif  dataType(att.type.className) ==  "LocalDate" >
	<#--  @JsonSerialize(using = CustomLocalDateSerializer.class) -->
	<#--  @JsonDeserialize(using = CustomLocalDateDeserializer.class)-->		
	private ${dataType(att.type.className)} ${att.name};  			
		<#else>
	private ${dataType(att.type.className)} ${att.name};  			
		</#if>  
		</#if>
	</#list>
	</#if>

	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
		<#elseif rel.type == 'ManyToOne'>
	private Integer ${firstLower(rel.name)!firstLower(rel.model)};		
		<#elseif rel.type == 'ManyToMany'>
		<#elseif rel.type == 'OneToOne'>
		</#if>
	</#list>
	</#if>
	
	public  Filter${entity.name}() {
		
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
		<#elseif rel.type == 'ManyToOne'>
	public Integer get${firstUpper(rel.name)!firstLower(rel.model)}() {
		return ${firstLower(rel.name)!firstLower(rel.model)};
	}
	
	public void set${firstUpper(rel.name)!firstLower(rel.model)}(Integer ${firstLower(rel.name)!firstLower(rel.model)}) {
		this.${firstLower(rel.name)!firstLower(rel.model)} = ${firstLower(rel.name)!firstLower(rel.model)};
	}
		<#elseif rel.type == 'ManyToMany'>
		<#elseif rel.type == 'OneToOne'>
		</#if>
	</#list>
	</#if>
}
