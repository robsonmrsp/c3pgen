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

	var AuthHandlerUtil = BaseModel.extend({

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
			var data = [];
			data.push({
				type : 'screen',
				screen : screen
			});
			options.data = data;
			this.fetch(options);
		},

		canSeeComponent : function(component, options) {
			this.url = this.urlRoot + '/view'
			var data = [];
			data.push({
				type : 'component',
				component : component
			});
			options.data = data;
			this.fetch(options);
		},
	});

	var PageAcessoNegado = Marionette.LayoutView.extend({
		template : '<h1>Acesso Negado</h1>                                                                                                                                         ' + //
		'<div class="row-fluid">                                                                                                                                                   ' + //
		'	<div class="alert alert-error">                                                                                                                                        ' + //
		'		<i class="icon-warning-sign"></i>                                                                                                                                  ' + //
		'		A página solicitada não foi encontrada ou você năo possui permissão de acesso. Utilize o botão voltar abaixo ou o menu ao lado para continuidade no sistema.       ' + //
		'	</div>                                                                                                                                                                 ' + //
		'	<a href="javascript: history.go(-1)" class="btn btn-inverse btn-large">                                                                                                ' + //
		'		<span class="icon-chevron-left icon-white"></span>                                                                                                                 ' + //
		'		Voltar                                                                                                                                                             ' + //
		'	</a>                                                                                                                                                                   ' + //
		'</div>  ',
	});

	AuthHandlerUtil.PageAcessoNegado = PageAcessoNegado;

	return AuthHandlerUtil;
});
