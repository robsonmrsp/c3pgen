/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	var BaseCollection = require('models/BaseCollection');
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var PERMISSIONS = new Backbone.Collection();
	PERMISSIONS.url = 'rs/auth/all'
	PERMISSIONS.fetch({
		success : function() {
		},
		error : function(model, resp, xhr) {
			console.error('Erro ao checar permissoes...', model, resp, xhr);
		},
		async : false
	});

	var Model = BaseModel.extend({

		urlRoot : 'rs/auth',

		defaults : {
			id : null,
			canSee : false,
		},
		initialize : function() {

		},

		getAllPermissions : function(options) {
			this.url = this.urlRoot + '/all'
			this.fetch(options);

		},

		canSeeScreen : function(screen, options) {

			var col = PERMISSIONS.filter(function(permission) {
				var item = permission.get('item');
				return item.itemType === "SCREEN" && screen.match(new RegExp(item.identifier, 'gi'))
			})

			return (!screen || screen.length == 0) || (col.length > 0)

			// this.url = this.urlRoot + '/view'
			// var data = {
			// type : 'SCREEN',4
			// identifier : screen,
			// };
			//
			// options.data = data;
			// this.fetch(options);
		},

		canSeeComponent : function(component, options) {

			var col = PERMISSIONS.filter(function(permission) {
				var item = permission.get('item');
				// console.log('item.identifier: |' + item.identifier + '|');
				// console.log('component: |' + component + '|');

				return item.itemType === "COMPONENT" && item.identifier.toUpperCase() === component.toUpperCase()
			})

			return (col.length > 0)

			// this.url = this.urlRoot + '/view'
			// var data = {
			// type : 'COMPONENT',
			// identifier : component,
			// };
			//
			// options.data = data;
			// this.fetch(options);
		},
	});
	var handlePermissions = function() {

		var elements = $('body').find('[class*=auth]');

		// var model = new Model(); muito pesada
		// model.getAllPermissions({
		// success : function(a, b, c) {
		//
		// console.log(a, b, c);
		// },
		// error : function(a, b, c) {
		// console.log(a, b, c);
		// }
		// });

		_.each(elements, function(elem) {
			var identifier = '';
			var action = '';
			var classes = $(elem).attr('class');
			var authConfig = /auth\[(.*)\]/.exec(classes);

			if (authConfig) {
				var str = authConfig[1];
				var arrayAuthConfig = str.split(/\[|,|\]/);

				if (arrayAuthConfig[0]) {
					identifier = arrayAuthConfig[0];
				}
				if (arrayAuthConfig[1]) {
					action = arrayAuthConfig[1];
				}

				// console.log('identifier: |' + identifier + '|');
				// console.log('action: |' + action + '|');
				_checkPermition(elem, identifier, action);
				// A partir desse ponto deverá ser

				// console.log("authConfig: " + authConfig);
				// console.log("identifier: " + identifier);
				// console.log("action: " + action);
			}

		});
	};
	var _authModel = new Model();

	var _checkPermition = function(elem, identifier, action) {
		if (!_authModel.canSeeComponent(identifier)) {
			_appyRestriction(elem, action);
		}
		// _authModel.canSeeComponent(identifier, {
		// success : function(model, resp, xhr) {
		// if (!resp) {
		// _appyRestriction(elem, action);
		// }
		// },
		// error : function(model, resp, xhr) {
		//
		// }
		// });
	}

	var _appyRestriction = function(elem, action) {
		if (action === 'remove') {
			$(elem).remove();
		} else {
			$(elem).prop('disabled', true);
			$(elem).bind('click', function(evt) {
				evt.preventDefault();
				return false;
			})
		}
	}

	var PageAcessoNegado = Marionette.LayoutView.extend({
		template : '<div class="col-xs-12">                                                                      ' + //
		'	<div class="error-container">                                                                        ' + //
		'		<div class="well">                                                                               ' + //
		'			<h1 class="grey lighter smaller">                                                            ' + //
		'				<span class="blue bigger-125">                                                           ' + //
		'					<i class="ace-icon fa fa-random"></i>                                                ' + //
		'					403                                                                                  ' + //
		'				</span>                                                                                  ' + //
		'				Acesso Negado!                                                                           ' + //
		'			</h1>                                                                                        ' + //
		'			<hr>                                                                                         ' + //
		'			<div class="space"></div>                                                                    ' + //
		'			<div>                                                                                        ' + //
		'				<h4 class="lighter smaller">Você não pode acessar esse conteudo</h4>                     ' + //
		'				<ul class="list-unstyled spaced inline bigger-110 margin-15">                            ' + //
		'					<li>                                                                                 ' + //
		'						<i class="ace-icon fa fa-hand-o-right blue"></i>                                 ' + //
		'						Tente fazer login com um outro usuário.                                          ' + //
		'					</li>                                                                                ' + //
		'					<li>                                                                                 ' + //
		'						<i class="ace-icon fa fa-hand-o-right blue"></i>                                 ' + //
		'						Verifique com o administrador se você tem permissão para ver esse conteúdo.      ' + //
		'					</li>                                                                                ' + //
		'				</ul>                                                                                    ' + //
		'			</div>                                                                                       ' + //
		'			<hr>                                                                                         ' + //
		'			<div class="space"></div>                                                                    ' + //
		'			<div class="center">                                                                         ' + //
		'				<a href="javascript:history.back()" class="btn btn-grey">                                ' + //
		'					<i class="ace-icon fa fa-arrow-left"></i>                                            ' + //
		'					Go Back                                                                              ' + //
		'				</a>                                                                                     ' + //
		'			</div>                                                                                       ' + //
		'		</div>                                                                                           ' + //
		'	</div>                                                                                               ' + //
		'</div>',
	});

	var AuthHandlerUtil = {
		Model : Model,
		PageAcessoNegado : PageAcessoNegado,
		handlePermissions : handlePermissions
	}

	return AuthHandlerUtil;
});
