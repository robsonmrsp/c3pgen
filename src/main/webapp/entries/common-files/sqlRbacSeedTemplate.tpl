--
ALTER TABLE group_permission 	ADD PRIMARY KEY (id_group, id_permission);
ALTER TABLE role_group 			ADD PRIMARY KEY (id_role, id_group);

<#list entities as entity>
 	
-- registros de autorização para ${firstUpper(entity.displayName)}	
	-- campos de tela
	INSERT INTO access_group(id, name, description) VALUES ((select  coalesce(MAX(id), 0)  + 1 from access_group), 'Cadastro e Manutenção de  ${firstUpper(entity.displayName)}','Agrupamento de Permissões para TODAS os acessos necessários para Criar e dar Manutenção em registros de ${firstUpper(entity.displayName)}');
	INSERT INTO role_group(id_role, id_group) VALUES (1, (select  coalesce(MAX(id), 0)  from access_group));	
	INSERT INTO role_group(id_role, id_group) VALUES (2, (select  coalesce(MAX(id), 0)  from access_group));
		
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Item de menu principal para tela de pesquisa de ${firstUpper(entity.displayName)}', 			'menu-list-${firstLower(entity.name)}',	'COMPONENT', 'Menu ${firstUpper(entity.displayName)}s'					);
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao menu de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar o item de menu de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , item Menu ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
	
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Botôes de salvar e salvar e continuar no formulario de ${firstUpper(entity.displayName)}', 	'save-${firstLower(entity.name)}', 		'COMPONENT', 'Botão Salva ${firstUpper(entity.displayName)}'			);
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao botão de salvar e salvar e continuar no formulario de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar o botão de de salvar e salvar e continuar no formulario de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , botão salvar ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Botão de novo na listagem de ${firstUpper(entity.displayName)}', 								'new-${firstLower(entity.name)}', 		'COMPONENT', 'Botão Novo ${firstUpper(entity.displayName)}'				);
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao botão de novo no formulario de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar ao botão de novo no formulario de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , botão novo ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Botão de Edição de ${firstUpper(entity.displayName)} no grid de ${firstUpper(entity.displayName)} na Listagem', 			'edit-${firstLower(entity.name)}', 		'COMPONENT', 'Botão Editar ${firstUpper(entity.displayName)} no Grid de ${firstUpper(entity.displayName)}');
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao botão de edição no grid de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar ao botão de edicao no grid de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , botão edicao ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Botão de deletar ${firstUpper(entity.displayName)} no grid de ${firstUpper(entity.displayName)} na Listagem', 			'remove-${firstLower(entity.name)}', 	'COMPONENT', 'Botão deletar ${firstUpper(entity.displayName)} no Grid de ${firstUpper(entity.displayName)}');
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao botão de delete no grid de ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar ao botão de delete no grid de ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , botão delete ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));

    --telas
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Tela de listagem de ${firstUpper(entity.displayName)}', 										'app/${firstLower(entity.name)}s', 		'SCREEN', 'Pesquisa de  ${firstUpper(entity.displayName)}s');
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso a tela de listagem de  ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar a tela de listagem de  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , tela listagem  ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));

	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Tela de Cadastro de ${firstUpper(entity.displayName)}', 										'app/new${firstUpper(entity.name)}', 	'SCREEN', 'Cadastro  de ${firstUpper(entity.displayName)}s');
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso a tela de cadastro de  ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar a tela de cadastro de  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , tela de cadastro  ');	
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Tela de edição de ${firstUpper(entity.displayName)}', 										'app/edit${firstUpper(entity.name)}/[0-9]{1,}', 	'SCREEN', 'Edição de  ${firstUpper(entity.displayName)}s');
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso a tela de edição de  ${firstUpper(entity.displayName)}', 'Usuário Poderá ver e acessar a tela de edição de  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , tela de edicao ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
	-- servicos
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Url de acesso aos ${firstUpper(entity.displayName)}s', 										'crud/${firstLower(entity.name)}s', 		'SERVICE', 			'Servico de ${firstUpper(entity.displayName)}s');  -- ler e escrever
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço de listagem de  ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço de listagem de  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar varios ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para salvar um novo ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para salvar um novo ${firstUpper(entity.displayName)} ', 'ESCRITA', 'CRUD ${firstUpper(entity.displayName)} , servico salvar ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Url de acesso TODOS os ${firstUpper(entity.displayName)}s', 									'crud/${firstLower(entity.name)}s/all', 		'SERVICE', 			'Servico de TODOS os ${firstUpper(entity.displayName)}s');
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para listar todos  os ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para salvar um novo ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar todos ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Url de acesso aos ${firstUpper(entity.displayName)}s por filtro de igualdade', 							'crud/${firstLower(entity.name)}s/filterEqual', 		'SERVICE', 			'Servico de ${firstUpper(entity.displayName)}s sob filtro de igualdade');
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para listagem por filtro de igualdade em  ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para listagem por filtro de igualdade ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar por filtro de igualdade');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));


	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Url de acesso aos ${firstUpper(entity.displayName)}s por filtro de semehança', 							'crud/${firstLower(entity.name)}s/filterAlike', 		'SERVICE', 			'Servico de ${firstUpper(entity.displayName)}s sob filtro de semelhança');
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para listagem por filtro de semelhanca em  ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para listagem por filtro semelhança em  ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar por filtro semelhanca');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));


	INSERT INTO item(id,     description, identifier, type, name) VALUES	((select  coalesce(MAX(id), 0)  + 1 from item), 'Url de acesso a um ${firstUpper(entity.displayName)} específico', 							'crud/${firstLower(entity.name)}s/[0-9]{1,}', 		'SERVICE', 			'Servico para acesso a ${firstUpper(entity.displayName)} especifico'); --GET, PUT e DELETE 
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para listagem de um unico ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para listagem de um unico ${firstUpper(entity.displayName)} ', 'LEITURA', 'CRUD ${firstUpper(entity.displayName)} , servico listar um unico ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para atualizacao de um unico ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para atualizacao de um unico ${firstUpper(entity.displayName)} ', 'ATUALIZACAO', 'CRUD ${firstUpper(entity.displayName)} , servico atualização ');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
	INSERT INTO permission(id , id_item,  name, description,  operation, tag_reminder) VALUES ((select  coalesce(MAX(id), 0)  + 1  from permission), (select  coalesce(MAX(id), 0)  from item),  'Cadastro de ${firstUpper(entity.displayName)}. Permissão de acesso ao serviço para deleção/remoção de um unico ${firstUpper(entity.displayName)}', 'Usuário Poderá acessar ao serviço para deleção/remoção de um unico ${firstUpper(entity.displayName)} ', 'DELECAO', 'CRUD ${firstUpper(entity.displayName)} , servico remoção deleção');
	INSERT INTO group_permission(id_group, id_permission)VALUES ((select  coalesce(MAX(id), 0) from access_group), (select  coalesce(MAX(id), 0)   from permission));
	
</#list>			
	