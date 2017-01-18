/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var Model = BaseModel.extend({

		urlRoot : 'rs/auth',

		defaults : {
			id : null,
			canSee : false,
		},

		getAllPermissions : function(options) {
			this.url = this.urlRoot + '/all'
			this.fetch(options);

		},

		canSeeScreen : function(screen, options) {
			this.url = this.urlRoot + '/view'
			var data = {
				type : 'screen',
				identifier : screen,
			};

			options.data = data;
			this.fetch(options);
		},

		canSeeComponent : function(component, options) {
			this.url = this.urlRoot + '/view'
			var data = {
				type : 'component',
				identifier : component,
			};

			options.data = data;
			this.fetch(options);
		},
	});
	var handlePermissions = function(view) {

		var elements = view.$.find('[class*=auth]');
		_.each(elements, function(elem) {
			var identifier = '';
			var action = '';
			var classes = $(elem).attr('class');
			var authConfig = /auth\[(.*)\]/.exec(classes);

			if (authConfig[1]) {
				identifier = authConfig[1];
			}
			if (authConfig[2]) {
				action = authConfig[2];
			}

			console.log("authConfig: " + authConfig);
			console.log("identifier: " + identifier);
			console.log("action: " + action);

		});

	};
	var PageAcessoNegado = Marionette.LayoutView.extend({
		template : '<div class="col-xs-12">                                                                                 ' + //
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
