define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var GeneralActionsCell = require('views/components/GeneralActionsCell');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var BaseCollection = require('collections/BaseCollection');
	var CodeMirror = require('codemirror');

	var ApplicationModel = require('models/ApplicationModel');

	var PageHelpGenerateYamlTemplate = require('text!views/helpGenerateYaml/tpl/PageHelpGenerateYamlTemplate.html');

	var PageHelpGenerateYaml = Marionette.LayoutView.extend({
		template : _.template(PageHelpGenerateYamlTemplate),

		events : {
			'click #btnImportApplication' : 'importApplication',
			'click #btnConnectionTest' : 'connectionTest',

		},

		regions : {
		// gridRegion : '#grid',

		},

		ui : {
			inputDatabaseType : '#inputDatabaseType',
			inputDatabaseUrl : '#inputDatabaseUrl',
			inputDatabaseUsername : '#inputDatabaseUsername',
			inputDatabasePassword : '#inputDatabasePassword',
			inputDatabaseTableNameExceptions : '#inputDatabaseTableNameExceptions',
			inputDatabaseColumnNameExceptions : '#inputDatabaseColumnNameExceptions',
			inputSupressPrefix : '#inputSupressPrefix',
			yamlName : '.yaml-name',

			modalScreen : '.modal',

			form : '.formConfig',
		},

		initialize : function(opt) {
			var that = this;
			this.onExtract = opt.onExtract;
			this.context = opt.context;

			this.on('show', function() {
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},
		_getColumns : function() {
			var that = this;
			var columns = [ {
				name : "name",
				editable : true,
				sortable : true,
				label : "Nome",
				cell : "string",
			}, {
				name : "situacao",
				label : "Editar",
				sortable : false,
				cell : GeneralActionsCell.extend({
					buttons : that.getCellButtons(),
					context : that,
				})
			} ];
			return columns;
		},

		getCellButtons : function() {
			var that = this;
			var buttons = [];
			buttons.push({
				id : 'edit_button',
				type : 'primary',
				icon : 'fa-pencil',
				hint : 'Editar YAML',
				onClick : that.showYaml,

			});

			return buttons;
		},

		showYaml : function(model) {
			this.ui.yamlName.text(model.get('name'));
			this.editor.setValue(model.get('yamlContent'));
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
							util.showMessage('info', 'Sucesso na conexão!', 'messages_modal_div');
							if (_.isFunction(callSuccess)) {
								callSuccess.call(that, _model);
							}
						}
					},
					error : function(_model, _resp) {
						util.showMessage('error', "Não foi possivel conectar a base de dados", 'messages_modal_div');
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
				util.showMessage('error', 'Verifique campos em destaque!', 'messages_modal_div');
			}
		},

		_import : function() {
			var that = this;
			var applicationModel = new ApplicationModel();
			applicationModel.url = 'rs/crud/applications/extraction/extractyaml';
			applicationModel.fetch({
				success : function(_model, _resp) {
					util.showMessage('info', 'Sucesso ao extrair [ ' + _resp.length + ' ] tabelas', 'messages_modal_div');
					that.onExtract.call(that.context, _resp.result);
				},
				error : function(_model, _resp) {
					util.showMessage('error', "Não foi possivel extrair a base de dados");
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

	return PageHelpGenerateYaml;
});
