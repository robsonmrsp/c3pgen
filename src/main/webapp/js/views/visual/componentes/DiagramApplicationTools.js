define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');

	var ApplicationModel = require('models/ApplicationModel');

	var DiagramApplicationToolsTemplate = require('text!views/visual/componentes/tpl/DiagramApplicationToolsTemplate.html');

	var DiagramApplicationTools = Marionette.LayoutView.extend({
		template : _.template(DiagramApplicationToolsTemplate),

		events : {
			'click #btnImportApplication' : 'importApplication',
			'click #btnConnectionTest' : 'connectionTest',

		},

		regions : {

		},

		ui : {
			inputDatabaseType : '#inputDatabaseType',
			inputDatabaseUrl : '#inputDatabaseUrl',
			inputDatabaseUsername : '#inputDatabaseUsername',
			inputDatabasePassword : '#inputDatabasePassword',
			inputDatabaseTableNameExceptions : '#inputDatabaseTableNameExceptions',
			inputDatabaseColumnNameExceptions : '#inputDatabaseColumnNameExceptions',
			inputSupressPrefix : '#inputSupressPrefix',
			modalScreen : '.modal',
			form : '.formConfig',
		},

		initialize : function(opt) {
			var that = this;
			this.onExtract = opt.onExtract;
			this.on('show', function() {
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		connectionTest : function(callSuccess) {
			var that = this;
			if (this._isValid()) {
				var applicationModel = new ApplicationModel();
				applicationModel.url = 'rs/crud/applications/extraction/ping';
				applicationModel.fetch({
					success : function(_model, pingOk) {
						if (pingOk) {
							util.showMessage('info', 'Sucesso na conexão!');
							if (_.isFunction(callSuccess)) {
								callSuccess.call(that, _model);
							}
						}
					},
					error : function(_model, _resp) {
						util.showMessage('error', "Não foi possivel conectar a base de dados");
						console.log('não pingou', _resp.responseJSON.errorMessage);
					},
					data : {
						databaseType : that.ui.inputDatabaseType.val(),
						url : that.ui.inputDatabaseUrl.val(),
						username : that.ui.inputDatabaseUsername.val(),
						password : that.ui.inputDatabasePassword.val(),
						tableRegex : that.ui.inputDatabaseTableNameExceptions.val(),
						columnRegex : that.ui.inputDatabaseColumnNameExceptions.val(),
						supressPrefix : that.ui.inputSupressPrefix.val(),
					}
				});
			} else {
				console.log('Verifique campos em destaque!');
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		_import : function() {
			var that = this;
			var applicationModel = new ApplicationModel();
			applicationModel.url = 'rs/crud/applications/extraction/extract';
			applicationModel.fetch({
				success : function(_model, _resp) {
					that.onExtract(_model);
				},
				error : function(_model, _resp) {
					util.showMessage('error', "Não foi possivel extrair a base de dados");
					console.log('não extraiu', _resp.responseJSON.errorMessage);
				},
				data : {
					databaseType : that.ui.inputDatabaseType.val(),
					url : that.ui.inputDatabaseUrl.val(),
					username : that.ui.inputDatabaseUsername.val(),
					password : that.ui.inputDatabasePassword.val(),
					tableRegex : that.ui.inputDatabaseTableNameExceptions.val(),
					columnRegex : that.ui.inputDatabaseColumnNameExceptions.val(),
					supressPrefix : that.ui.inputSupressPrefix.val(),
				}
			})
		},
		importApplication : function() {
			this.connectionTest(this._import);
		},

		hidePage : function() {
			this.ui.modalScreen.modal('hide');
		},

		showPage : function() {
			this.clearModal();

			this.ui.modalScreen.modal({
				backdrop : 'static'
			})

		},

		clearModal : function() {

		},
	});

	return DiagramApplicationTools;
});
