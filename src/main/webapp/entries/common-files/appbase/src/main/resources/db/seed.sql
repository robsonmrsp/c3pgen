 ALTER TABLE user_role ADD PRIMARY KEY (id_role, id_user);

 INSERT INTO role( id, authority, description)  VALUES (1, 'ROLE_USER', 'Usuário do sistema');
 INSERT INTO role( id, authority, description)  VALUES (2, 'ROLE_ADMIN', 'Administrador do sistema');
 
 
-- Tabela de usuários
 
 INSERT INTO app_user(  id, enable, image, name, password, username, email) VALUES (1, true, '', 'Usuário JSetup Comum', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'jsetup', 'contato@jsetup.com');
 INSERT INTO app_user(  id, enable, image, name, password, username, email) VALUES (2, true, '', 'Usuário JSetup Admin', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'jsetup2', 'contato@jsetup.com');

 --INSERT INTO role_user(role_id, user_id) values (2, 1);
 INSERT INTO user_role(id_role, id_user) values (1, 1);
 INSERT INTO user_role(id_role, id_user) values (2, 2);
