		<#list application.entities as entity>
ALTER SEQUENCE hibernate_sequence RESTART WITH ${entity?counter}001;
TRUNCATE TABLE ${entity.tableName} CASCADE;
<#list 1..5 as ind>
INSERT INTO ${entity.tableName} 	( id
				<#if entity.attributes??>	
				<#list entity.attributes as att>
					<#if att.name != 'id'>
						<#if dataType(att.type.className) ==  "String" >
			,${uppercase(att.tableFieldName!att.name)}
						</#if>
					</#if>
				</#list>
				</#if>
			)values(${ind}
				<#if entity.attributes??>	
				<#list entity.attributes as att>
					<#if att.name != 'id'>
						<#if dataType(att.type.className) ==  "String" >
			, '${att.name} ${firstLower(entity.name)}${ind}'
						</#if>
					</#if>
				</#list>
				</#if>			
			);
			
		</#list>
</#list>


--Somente para a autenticação dos testes
 INSERT INTO role( id, authority, description)  VALUES (101, 'ROLE_USER', 'Usuário do sistema');
 INSERT INTO owner (id, cnpj, corporate_name,  phone_number, logo, name) values (101,'','JSetup Developer', '997608620','','JSetup Developer');
-- Tabela de usuários
 INSERT INTO app_user(  id, enable, image, name, password, username, email, id_owner) VALUES (101, true, '', 'Usuário JSetup Comum', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'jsetup', 'contato@jsetup.com', 101);

 --INSERT INTO role_user(role_id, user_id) values (2, 1);
 INSERT INTO user_role(id_role, id_user) values (101, 101);
