 ALTER TABLE user_role ADD PRIMARY KEY (id_role, id_user);

 INSERT INTO role( id, authority, description)  VALUES (1, 'ROLE_USER', 'Usuário do sistema');
 INSERT INTO role( id, authority, description)  VALUES (2, 'ROLE_ADMIN', 'Administrador do sistema');
 
 INSERT INTO tenant (id, cnpj, corporate_name,  phone_number, logo, name) values (1,'','JSetup Developer', '997608620','','JSetup Developer');
 INSERT INTO tenant (id, cnpj, corporate_name,  phone_number, logo, name) values (2,'','JSetup Tech', '997608620','','JSetup Tech');
-- Tabela de usuários
 INSERT INTO app_user(  id, enable, image, name, password, username, email, id_tenant) VALUES (1, true, '', 'Usuário JSetup Comum', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'jsetup', 'contato@jsetup.com', 1);
 INSERT INTO app_user(  id, enable, image, name, password, username, email, id_tenant) VALUES (2, true, '', 'Usuário JSetup Admin', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'jsetup2', 'contato@jsetup.com', 2);

 --INSERT INTO role_user(role_id, user_id) values (2, 1);
 INSERT INTO user_role(id_role, id_user) values (1, 1);
 INSERT INTO user_role(id_role, id_user) values (2, 2);
