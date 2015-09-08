define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Waves = require('waves');

	var DataBaseHelper = require('utilities/DataBaseHelper');
	var PageConfigTemplate = require('text!views/config/tpl/PageConfigTemplate.html');

	var FormPessoa = Marionette.ItemView.extend({
		template : _.template(PageConfigTemplate),

		events : {
			'click #testeCon' : 'testaConexao',
			'click #sync' : 'sincroniza',
		},
		ui : {
			inputServerUsername : '#inputServerUsername',
			inputServerPassword : '#inputServerPassword',
			inputServerAddress : '#inputServerAddress',
			mensagem : '#messages',
		},
		testaConexao : function() {
			var that = this;

			console.log('Testando a sua conexão');
			that.ui.mensagem.html("<span><i class='zmdi zmdi-refresh zmdi-hc-spin'></i>Testando... </span>");
			DataBaseHelper.ping({
				username : this.ui.inputServerUsername.val(),
				password : this.ui.inputServerPassword.val(),
				url : this.ui.inputServerAddress.val(),
				// loadng
				success : function(mensagem) {
					that.ui.mensagem.text(mensagem);
				},
				error : function(erro) {

					that.ui.mensagem.text(erro);
				},
			})
		},

		sincroniza : function() {
			DataBaseHelper.sync({
				
			});
			console.log('Sincronizando os registros.');
		},

		initialize : function() {

			this.on('show', function() {
				Waves.attach('#testeCon', [ 'waves-block', 'waves-float', 'waves-button' ]);
				Waves.attach('#sync', [ 'waves-block', 'waves-float', 'waves-button' ]);
				Waves.init();
			})
		}
	});

	return FormPessoa;
});
