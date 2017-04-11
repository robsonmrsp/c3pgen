	
	############################################################################
				Configuração do beans.xml referente aos novos serviços.
	############################################################################
	<jaxrs:server id="services" address="/">
		<jaxrs:serviceBeans>
		<#list entities as entity>
		<bean class="${package}.rs.${entity.name}Resources" />
		</#list>
		</jaxrs:serviceBeans>
		<jaxrs:providers>
			<bean class="org.codehaus.jackson.jaxrs.JacksonJsonProvider" />
		</jaxrs:providers>
	</jaxrs:server>
	
	
	############################################################################
						Router para as entidades criadas
	############################################################################

		<#list entities as entity>
		var Page${entity.name} = require('views/${firstLower(entity.name)}/Page${entity.name}');
		var Form${entity.name} = require('views/${firstLower(entity.name)}/Form${entity.name}');
		var ${entity.name}Model = require('models/${entity.name}Model');
		</#list>	
	
		<#list entities as entity>
			// hashs de ${entity.name}
			'app/${firstLower(entity.name)}s' : '${firstLower(entity.name)}s',
			'app/new${entity.name}' : 'new${entity.name}',
			'app/edit${entity.name}/:id' : 'edit${entity.name}',
		</#list>
			
		<#list entities as entity>
			//configuração das rotas de ${entity.name}
			appRouter.on('route:${firstLower(entity.name)}s', function() {
				util.markActiveItem('${firstLower(entity.name)}s');
				appRouter.page${entity.name} = new Page${entity.name}();
				App.mainRegion.show(appRouter.page${entity.name});
				util.breadcrumb({
					iconClass : 'fa-desktop',
					itemLabel : '${entity.name}',
					itemSubFolderName : 'Grid',
					url : 'app/${firstLower(entity.name)}s'
				});
			});
	
			appRouter.on('route:new${entity.name}', function() {
				util.markActiveItem('${firstLower(entity.name)}s');
				var form${entity.name} = new Form${entity.name}({
					model : new ${entity.name}Model(),
				});
				App.mainRegion.show(form${entity.name});
				util.breadcrumb({
					iconClass : 'fa-desktop',
					itemLabel : '${entity.name}',
					itemSubFolderName : 'Formulário de cadastro',
					url : 'app/${firstLower(entity.name)}s'
				});
			});
			
			appRouter.on('route:edit${entity.name}', function(id${entity.name}) {
				util.markActiveItem('${firstLower(entity.name)}s');
				var form${entity.name} = null;
				if (appRouter.page${entity.name}) {
					form${entity.name} = new Form${entity.name}({
						model : appRouter.page${entity.name}.${firstLower(entity.name)}s.get(id${entity.name}),
					});
					App.mainRegion.show(form${entity.name});
				} else {
					var model = new ${entity.name}Model({
						id : id${entity.name},
					})
					model.fetch({
						success : function(model) {
							form${entity.name} = new Form${entity.name}({
								model : model,
							});
							App.mainRegion.show(form${entity.name});
						},
						error : function(x, y, z) {
							console.error(x, y, z);
						}
					})
					util.breadcrumb({
						iconClass : 'fa-calendar',
						itemLabel : '${entity.name}os',
						itemSubFolderName : 'Formulário de atualização',
						url : 'app/${firstLower(entity.name)}s'
					});
				}
			});
		</#list>
			

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
	${upperSnakeCase(entity.name)}("Cadastro de ${entity.displayName}", //
			Rota.CRUD_${upperSnakeCase(entity.name)}_LISTA, //
			Rota.CRUD_${upperSnakeCase(entity.name)}_NOVO, //
			Rota.CRUD_${upperSnakeCase(entity.name)}_EDITA, //
			Rota.SERVICOS_REST_${upperSnakeCase(entity.name)}, //
			Rota.SPA //
	),
	
</#list>
//rotas
<#list entities as entity>
	CRUD_${upperSnakeCase(entity.name)}_LISTA("app/${firstLower(entity.name)}s"), //
	CRUD_${upperSnakeCase(entity.name)}_NOVO("app/new${firstUpper(entity.name)}"), //
	CRUD_${upperSnakeCase(entity.name)}_EDITA("app/edit${firstUpper(entity.name)}/" + PaginaRegex.NUMEROS), //
	SERVICOS_REST_${upperSnakeCase(entity.name)}("/rs/crud/${firstLower(entity.name)}s" + PaginaRegex.QUALQUER_CARACTER),
	
</#list>
	
	
	