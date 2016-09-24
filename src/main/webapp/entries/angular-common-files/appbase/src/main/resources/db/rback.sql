INSERT INTO rbac_item_type(id, description, name)    VALUES (1;'View em javascript acessada e encaminhada a partir do  Router';'JS-VIEW');

INSERT INTO rbac_item( id, name, description, id_type)  VALUES (1;'Pesquisa de Ator';'Pagina que apresenta a pesquisa e gride de Ator';1);
INSERT INTO rbac_item( id, name, description, id_type)  VALUES (2;'Cadastro/Edição de Ator';'Pagina que permite criar ou editar um Ator';1);

INSERT INTO rbac_operation( id, can_delete, can_edit, can_execute, can_read, can_update, name)  VALUES (1;true;true;true;true;true;'Tudo');

INSERT INTO rbac_operation( id, can_delete, can_edit, can_execute, can_read, can_update, name)  VALUES (2;false;true;true;false;false;'Edição');
INSERT INTO rbac_operation( id, can_delete, can_edit, can_execute, can_read, can_update, name)  VALUES (3;true;false;true;false;false;'Remover');
INSERT INTO rbac_operation( id, can_delete, can_edit, can_execute, can_read, can_update, name)  VALUES (4;false;false;true;true;false;'Leitura');
INSERT INTO rbac_operation( id, can_delete, can_edit, can_execute, can_read, can_update, name)  VALUES (5;false;false;true;false;true;'Atualiza');
INSERT INTO rbac_operation( id, can_delete, can_edit, can_execute, can_read, can_update, name)  VALUES (6;false;false;true;false;false;'Executar');

--
