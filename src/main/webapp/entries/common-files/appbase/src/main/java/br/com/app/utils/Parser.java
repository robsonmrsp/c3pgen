package ${application.corePackage}.utils;

import java.util.ArrayList;


import java.util.List;

import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

<#list application.entities as entity>		
import ${application.rootPackage}.json.Json${firstUpper(entity.name)};
import ${application.rootPackage}.model.${firstUpper(entity.name)};
</#list>
import ${application.corePackage}.model.User;
import ${application.corePackage}.json.JsonUser;

public class Parser {

	private static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");
	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy");
	private static final DateTimeFormatter HOUR_FORMAT = DateTimeFormat.forPattern("HH:mm");

	public static String getHourAsString(LocalDateTime date) {
		String format = "";
		try {
			format = HOUR_FORMAT.print(date);
		} catch (Exception e) {
			format = "00:00";
		}
		return format;
	}

	public static String getDateTimeAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_TIME_FORMAT.print(date);
		} catch (Exception e) {
			format = DATE_TIME_FORMAT.print(new DateTime());
		}
		return format;
	}

	public static String getDateAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_FORMAT.print(date);
		} catch (Exception e) {
			format = DATE_FORMAT.print(new DateTime());
		}
		return format;
	}

	//
	private static DateTime getHour(String date) {
		if (!date.isEmpty()) {
			try {
				return HOUR_FORMAT.parseDateTime(date);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static LocalDateTime getDate(String date) {
		if (!date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static LocalDateTime getDateTime(String date) {
		if (!date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_TIME_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	<#list application.entities as entity>		
	//converte de entidade para json
	
	
	
	public static Json${entity.name} toJson(${entity.name} ${firstLower(entity.name)}) {
		Json${entity.name} json${entity.name} = new Json${entity.name}();
		
		json${entity.name}.setId(${firstLower(entity.name)}.getId());
	<#if entity.attributes ??>		
	<#list entity.attributes as att>
		<#if dataType(att.type.className) ==  "LocalDateTime" >
	    json${entity.name}.set${firstUpper(att.name)}(DateUtil.localDateTimeAsString(${firstLower(entity.name)}.get${firstUpper(att.name)}()));
		<#elseif  dataType(att.type.className) ==  "LocalDate" >
		json${entity.name}.set${firstUpper(att.name)}(DateUtil.localDateAsString(${firstLower(entity.name)}.get${firstUpper(att.name)}()));
		<#else>
	    json${entity.name}.set${firstUpper(att.name)}(${firstLower(entity.name)}.get${firstUpper(att.name)}());
		</#if>  
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
		<#elseif rel.type == 'ManyToOne'>
		${firstUpper(rel.model)} ${firstLower(rel.name)!firstLower(rel.model)} = ${firstLower(entity.name)}.get${firstUpper(rel.name)!firstLower(rel.model)}();
		if (${firstLower(rel.name)!firstLower(rel.model)} != null) {
			json${firstUpper(entity.name)}.set${firstUpper(rel.name)!firstLower(rel.model)}(toJson(${firstLower(rel.name)!firstLower(rel.model)}));
		}
		<#elseif rel.type == 'ManyToMany'>
		<#elseif rel.type == 'OneToOne'>
		</#if>
	</#list>
	</#if>
		return json${entity.name};
	}

	public static ${entity.name} toEntity(Json${entity.name} json${entity.name}) {
		${entity.name} ${firstLower(entity.name)} = new ${entity.name}();
		
		${firstLower(entity.name)}.setId(json${entity.name}.getId());
	<#if entity.attributes ??>				
	<#list entity.attributes as att>
	    	<#if dataType(att.type.className) ==  "LocalDateTime" >
	    ${firstLower(entity.name)}.set${firstUpper(att.name)}(DateUtil.stringAsLocalDateTime(json${entity.name}.get${firstUpper(att.name)}()));
			<#elseif  dataType(att.type.className) ==  "LocalDate" >
	    ${firstLower(entity.name)}.set${firstUpper(att.name)}(DateUtil.stringAsLocalDate(json${entity.name}.get${firstUpper(att.name)}()));
			<#else>
		${firstLower(entity.name)}.set${firstUpper(att.name)}(json${entity.name}.get${firstUpper(att.name)}());
			</#if>  
	</#list>
	</#if>
	<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
		Json${firstUpper(rel.model)} ${firstLower(rel.name)!firstLower(rel.model)} = json${firstUpper(entity.name)}.get${firstUpper(rel.name)!firstLower(rel.model)}();
		if (${firstLower(rel.name)!firstLower(rel.model)} != null) {
			${firstLower(entity.name)}.set${firstUpper(rel.name)!firstLower(rel.model)}(toEntity(${firstLower(rel.name)!firstLower(rel.model)}));
		}	
			<#elseif rel.type == 'ManyToMany'>
			<#elseif rel.type == 'OneToOne'>
			</#if>
		</#list>
	</#if>
		return ${firstLower(entity.name)};
	}		
	
	public static List<Json${entity.name}> toListJson${entity.name}s(List<${entity.name}> all) {
		List<Json${entity.name}> json${entity.name}s = new ArrayList<Json${entity.name}>();
		for (${entity.name} ${firstLower(entity.name)} : all) {
			json${entity.name}s.add(toJson(${firstLower(entity.name)}));
		}
		return json${entity.name}s;
	}
</#list>


	public static List<JsonUser> toListJsonUsers(List<User> all) {
		return null;
	}

	public static User toEntity(JsonUser jsonUser) {

		return null;
	}

	public static Object toJson(User user) {

		return null;
	}
}
