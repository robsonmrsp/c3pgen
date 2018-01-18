
	


############################################################################
						Menu de cadastros
############################################################################
<#list entities as entity>
			<li id="${firstLower(entity.name)}s" class="">
				<a href="#app/${firstLower(entity.name)}s">
					<i class="menu-icon fa fa-caret-right"></i>
					${entity.displayName}
				</a>
				<b class="arrow"></b>
			</li>
</#list>
		
	############################################################################
						Parser json-> objeto objeto -> json
	############################################################################
<#list entities as entity>		
	//converte de entidade para json
	public static Json${entity.name} toJson(${entity.name} ${firstLower(entity.name)}) {
		Json${entity.name} json${entity.name} = new Json${entity.name}();
		
		json${entity.name}.setId(${firstLower(entity.name)}.getId());
	<#list entity.attributes as att>
		<#if dataType(att.type.className) ==  "LocalDateTime" >
	    json${entity.name}.set${firstUpper(att.name)}(DateUtil.localDateTimeAsString(${firstLower(entity.name)}.get${firstUpper(att.name)}()));
		<#elseif  dataType(att.type.className) ==  "LocalDate" >
		json${entity.name}.set${firstUpper(att.name)}(DateUtil.localDateAsString(${firstLower(entity.name)}.get${firstUpper(att.name)}()));
		<#else>
	    json${entity.name}.set${firstUpper(att.name)}(${firstLower(entity.name)}.get${firstUpper(att.name)}());
		</#if>  
	</#list>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
		<#elseif rel.type == 'ManyToOne'>
		json${entity.name}.set${firstUpper(rel.name)}(toJson(${firstLower(entity.name)}.get${firstUpper(rel.name)}()));		
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
	<#list entity.attributes as att>
	    	<#if dataType(att.type.className) ==  "LocalDateTime" >
	    ${firstLower(entity.name)}.set${firstUpper(att.name)}(DateUtil.stringAsLocalDateTime(json${entity.name}.get${firstUpper(att.name)}()));
			<#elseif  dataType(att.type.className) ==  "LocalDate" >
	    ${firstLower(entity.name)}.set${firstUpper(att.name)}(DateUtil.stringAsLocalDate(json${entity.name}.get${firstUpper(att.name)}()));
			<#else>
		${firstLower(entity.name)}.set${firstUpper(att.name)}(json${entity.name}.get${firstUpper(att.name)}());
			</#if>  
	</#list>
	<#if entity.relationships??>	
		<#list entity.relationships as rel>
			<#if rel.type == 'OneToMany'>
			<#elseif rel.type == 'ManyToOne'>
		${firstLower(entity.name)}.set${firstUpper(rel.name)}(toEntity(json${entity.name}.get${firstUpper(rel.name)}()));					
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
	############################################################################
						Rotas e Pagina 
	############################################################################
//paginas
<#list entities as entity>
	${upperSnakeCase(entity.displayName)}("Cadastro de ${entity.displayName}", //
	
			Rota.CRUD_${upperSnakeCase(entity.name)}_LISTA, //
			Rota.CRUD_${upperSnakeCase(entity.name)}_NOVO, //
			Rota.CRUD_${upperSnakeCase(entity.name)}_EDITA, //
			Rota.SERVICOS_REST_${upperSnakeCase(entity.name)}, //
			Rota.SPA, //
	);
	
</#list>

//rotas
<#list entities as entity>

	CRUD_${upperSnakeCase(entity.name)}_LISTA("app/${firstLower(entity.name)}s"), //
	CRUD_${upperSnakeCase(entity.name)}_NOVO("app/new${firstUpper(entity.name)}"), //
	CRUD_${upperSnakeCase(entity.name)}_EDITA("app/edit${firstUpper(entity.name)}/" + PaginaRegex.NUMEROS), //
	SERVICOS_REST_${upperSnakeCase(entity.name)}("/rs/crud/${firstLower(entity.name)}s" + PaginaRegex.QUALQUER_CARACTER),
</#list>

	
<#list entities as entity>
    <typeAlias alias="${entity.name}" type="${package}.model.${entity.name}" />
</#list>
                    