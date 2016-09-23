 ALTER TABLE user_role ADD PRIMARY KEY (role_id, user_id);

 INSERT INTO role( id, authority, description)  VALUES (1, 'ROLE_USER', 'Usuário do sistema');
 INSERT INTO role( id, authority, description)  VALUES (2, 'ROLE_ADMIN', 'Administrador do sistema');
 
 
-- Tabela de usuários
 
 INSERT INTO app_user(  id, enable, image, name, password, username) VALUES (1, true, '', 'mr', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'mr');
 INSERT INTO app_user(  id, enable, image, name, password, username) VALUES (2, true, '', 'mr2', '$2a$10$teJrCEnsxNT49ZpXU7n22O27aCGbVYYe/RG6/XxdWPJbOLZubLIi2', 'mr2');

 --INSERT INTO role_user(role_id, user_id) values (2, 1);
 INSERT INTO user_role(role_id, user_id) values (1, 1);
 INSERT INTO user_role(role_id, user_id) values (2, 2);
