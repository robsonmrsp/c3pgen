
	
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
						Seed permissions
	############################################################################
<#list entities as entity>
-- registros de autorização para ${firstUpper(entity.displayName)}	
	-- campos de tela
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Item de menu principal para tela de pesquisa de ${firstUpper(entity.displayName)}', 			'item-list-${firstUpper(entity.name)}',	'COMPONENT', 'Menu ${firstUpper(entity.displayName)}s'					);
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao menu de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar o item de menu de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , item Menu ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	
	
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Botôes de salvar e salvar e continuar no formulario de ${firstUpper(entity.displayName)}', 	'save-${firstUpper(entity.name)}', 		'COMPONENT', 'Botão Salva ${firstUpper(entity.displayName)}'			);
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao botão de salvar e salvar e continuar no formulario de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar o botão de de salvar e salvar e continuar no formulario de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , botão salvar ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Botão de novo na listagem de ${firstUpper(entity.displayName)}', 								'new-${firstUpper(entity.name)}', 		'COMPONENT', 'Botão Novo ${firstUpper(entity.displayName)}'				);
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao botão de novo no formulario de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar ao botão de novo no formulario de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , botão novo ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Botão de Edição de ${firstUpper(entity.displayName)} no grid de ${firstUpper(entity.displayName)} na Listagem', 			'edit-${firstUpper(entity.name)}', 		'COMPONENT', 'Botão Editar ${firstUpper(entity.displayName)} no Grid de ${firstUpper(entity.displayName)}');
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao botão de edição no grid de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar ao botão de edicao no grid de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , botão edicao ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Botão de deletar ${firstUpper(entity.displayName)} no grid de ${firstUpper(entity.displayName)} na Listagem', 			'remove-${firstUpper(entity.name)}', 	'COMPONENT', 'Botão deletar ${firstUpper(entity.displayName)} no Grid de ${firstUpper(entity.displayName)}');
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao botão de delete no grid de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar ao botão de delete no grid de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , botão delete ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

    --telas
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Tela de listagem de ${firstUpper(entity.displayName)}', 										'app/${firstLower(entity.name)}s', 		'SCREEN', 'Pesquisa de  ${firstUpper(entity.displayName)}s');
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso a tela de listagem de  ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar a tela de listagem de  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , tela listagem  ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Tela de Cadastro de ${firstUpper(entity.displayName)}', 										'app/new${firstUpper(entity.name)}', 	'SCREEN', 'Cadastro  de ${firstUpper(entity.displayName)}s');
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso a tela de cadastro de  ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar a tela de cadastro de  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , tela de cadastro  ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Tela de edição de ${firstUpper(entity.displayName)}', 										'app/edit${firstUpper(entity.name)}', 	'SCREEN', 'Edição de  ${firstUpper(entity.displayName)}s');
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso a tela de edição de  ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar a tela de edição de  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , tela de edicao ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	
	
	-- servicos
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Url de acesso aos ${firstUpper(entity.displayName)}s', 										'crud/${firstLower(entity.name)}s', 		'SERVICE', 			'Servico de ${firstUpper(entity.displayName)}s');  -- ler e escrever
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço de listagem de  ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço de listagem de  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar varios ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para salvar um novo ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para salvar um novo ${firstUpper(entity.displayName)} ', 'ESCRITA', 'CRUD ${firstUpper(entity.displayName)} , servico salvar ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Url de acesso TODOS os ${firstUpper(entity.displayName)}s', 									'crud/${firstLower(entity.name)}s/all', 		'SERVICE', 			'Servico de TODOS os ${firstUpper(entity.displayName)}s');
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para listar todos  os ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para salvar um novo ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar todos ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Url de acesso aos ${firstUpper(entity.displayName)}s por filtro', 							'crud/${firstLower(entity.name)}s/filter', 		'SERVICE', 			'Servico de ${firstUpper(entity.displayName)}s sob filtro');
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para listagem por filtro de ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para listagem por filtro de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar por filtro ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select max(id) + 1 from item), 'Url de acesso a um ${firstUpper(entity.displayName)} específico', 							'crud/${firstLower(entity.name)}s/[0-9]', 		'SERVICE', 			'Servico para acesso a ${firstUpper(entity.displayName)} especifico'); --GET, PUT e DELETE 
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para listagem de um unico ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para listagem de um unico ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar um unico ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para atualizacao de um unico ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para atualizacao de um unico ${firstUpper(entity.displayName)} ', 'ATUALIZACAO', 'CRUD ${firstUpper(entity.displayName)} , servico atualização ');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	
	INSERT INTO persmission((select max(id) + 1 from persmission),  name, description,  operation, tags) VALUES ('Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para deleção/remoção de um unico ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para deleção/remoção de um unico ${firstUpper(entity.displayName)} ', 'DELECAO', 'CRUD ${firstUpper(entity.displayName)} , servico remoção deleção');
	INSERT INTO permission_item(permission_id, item_id)VALUES ((select max(id)  from persmission), (select max(id) from item));	

</#list>			
	
<#list entities as entity>
import ${entity.name}Controller from './presentation/http/controllers/${entity.name}Controller';
</#list>			
<#list entities as entity>
appExpress.use('/${firstLower(entity.name)}s', ${entity.name}Controller);
</#list>			
