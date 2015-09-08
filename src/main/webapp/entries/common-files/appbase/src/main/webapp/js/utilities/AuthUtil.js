define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');

	return {
		accessDenied : function() {
			var _location = location.href.replace();
			if (location.hash) {
				_location = location.href.replace(location.hash, '403.html');
				window.location.href = _location;
			} else if (this._endsWith(location.href, '#')) {
				_location = location.href.replace('/#', '/403.html');
				window.location.href = _location;
			} else if (this._endsWith(location.href, '/')) {
				_location = location.href + '403.html';
				window.location.href = _location;
			} else {
				_location = location.href + '/403.html';
				window.location.href = _location;
			}
		},

		userCanRead : function(route) {
			console.log(route);
			return false;
		},

		userCanNotRead : function(route) {
			console.log(route);
			return false;
		},

		load : function(calback) {
			calback();
		},

		_endsWith : function(str, suffix) {
			return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}
	}
})

// var user = {
// "id":2,
// "name":"mr2",
// "username":"mr2",
// "password":"123",
// "enable":true,
// "image":"",
// "roles":[
// {
// "id":2,
// "authority":"ROLE_ADMIN",
// "description":"Administrador do sistema",
// "sessions":[
//
// ],
// "users":[
// {
// "id":2,
// "name":"mr2",
// "username":"mr2",
// "password":"123",
// "enable":true,
// "image":"",
// "roles":[
//
// ]
// }
// ],
// "permissions":[
//
// ]
// },
// {
// "id":50,
// "authority":"ROLE_VISUALIZACAO_CADASTROS",
// "description":"Com Esse Papel, é possivel visualizar as telas de cadastro e
// listagem(grid) de Ator",
// "sessions":[
//
// ],
// "users":[
// {
// "id":2,
// "name":"mr2",
// "username":"mr2",
// "password":"123",
// "enable":true,
// "image":"",
// "roles":[
//
// ]
// }
// ],
// "permissions":[
// {
// "id":50,
// "name":"Pode Visualizar a tela Cadastro de Atores",
// "roles":[
// {
// "id":50,
// "authority":"ROLE_VISUALIZACAO_CADASTROS",
// "description":"Com Esse Papel, é possivel visualizar as telas de cadastro e
// listagem(grid) de Ator",
// "sessions":[
//
// ],
// "users":[
//
// ],
// "permissions":[
//
// ]
// }
// ],
// "operation":{
// "id":50,
// "name":"Leitura",
// "canEdit":false,
// "canRead":true,
// "canUpdate":false,
// "canDelete":false,
// "canExecute":true,
// "permissions":[
//
// ]
// },
// "item":{
// "id":51,
// "name":"Formulario de atores",
// "description":"Formulario de atores",
// "type":{
// "id":50,
// "name":"JS-VIEW",
// "description":"Viem em javascript acessada e encaminhada no Router"
// },
// "permissions":[
//
// ]
// }
// },
// {
// "id":51,
// "name":"Pode visualizar o Grid de Atores",
// "roles":[
// {
// "id":50,
// "authority":"ROLE_VISUALIZACAO_CADASTROS",
// "description":"Com Esse Papel, é possivel visualizar as telas de cadastro e
// listagem(grid) de Ator",
// "sessions":[
//
// ],
// "users":[
//
// ],
// "permissions":[
//
// ]
// }
// ],
// "operation":{
// "id":50,
// "name":"Leitura",
// "canEdit":false,
// "canRead":true,
// "canUpdate":false,
// "canDelete":false,
// "canExecute":true,
// "permissions":[
//
// ]
// },
// "item":{
// "id":50,
// "name":"Grid de Atores",
// "description":"Grid de atores",
// "type":{
// "id":50,
// "name":"JS-VIEW",
// "description":"Viem em javascript acessada e encaminhada no Router"
// },
// "permissions":[
//
// ]
// }
// }
// ]
// }
// ]
// }
