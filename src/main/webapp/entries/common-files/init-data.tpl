 ALTER SEQUENCE hibernate_sequence RESTART WITH 10001;

 TRUNCATE TABLE owner CASCADE;
 TRUNCATE TABLE app_user CASCADE;
 TRUNCATE TABLE role CASCADE;
 TRUNCATE TABLE user_role CASCADE;

 INSERT INTO owner (id, cnpj, corporate_name,  phone_number, logo, name) values (101,'','JSetup Developer', '997608620','','JSetup Developer');

 INSERT INTO role( id, id_owner, authority, description)  VALUES (101, 101, 'ROLE_USER', 'Usuário do sistema');
 INSERT INTO app_user( id, id_owner, enable, image, name, password, username, email) VALUES (101, 101, true, '', 'Usuário JSetup Comum', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'jsetup', 'contato@jsetup.com');
 INSERT INTO user_role(id_role, id_user) values (101, 101);

TRUNCATE TABLE ${uppercase(entity.tableName!entity.name)} CASCADE;
<#list 1..5 as ind>
INSERT INTO ${uppercase(entity.tableName!entity.name)} 	( id, id_owner
				<#if entity.attributes??>	
				<#list entity.attributes as att>
					<#if att.name != 'id'>
						<#if dataType(att.type.className) ==  "String" >
			,${uppercase(att.tableFieldName!att.name)}
						</#if>
					</#if>
				</#list>
				</#if>
			)values(${ind}, 101
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
