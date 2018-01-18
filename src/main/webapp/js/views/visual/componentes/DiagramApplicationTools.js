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
			'click #btnImportFlatFile' : 'importFlatFile',

			'click #btnImportApplication' : 'importApplication',
			'click #btnConnectionTest' : 'connectionTest',
			'change #inputUploadXml' : 'uploadXml',
			'change #inputDatabaseType' : 'changeDatabaseType',
		},

		regions : {

		},

		changeDatabaseType : function() {
			if (this.ui.inputDatabaseType.val() === 'FIREBIRD' || this.ui.inputDatabaseType.val() === 'ORACLE') {
				this.ui.exceptionsContainer.hide();

				if (this.ui.inputDatabaseType.val() === 'FIREBIRD') {
					this.ui.inputDatabaseUrl.val('jdbc:firebirdsql:localhost/3050:C:/Users/robson/Desktop/importacaoCnes/CNES.GDB');
					this.ui.inputDatabaseUsername.val('sysdba');
					this.ui.inputDatabasePassword.val('masterkey');
				} else {
					this.ui.inputDatabaseUrl.val('jdbc:oracle:thin:@192.168.0.47:1521:db12c');
					this.ui.inputDatabaseUsername.val('gsh_desenv_new');
					this.ui.inputDatabasePassword.val('hs2017');
				}
				this.ui.tableNamesContainer.show();
			} else {

				this.ui.exceptionsContainer.show();
				this.ui.tableNamesContainer.hide();
			}
		},

		ui : {
			tableNamesContainer : '.table-names',
			exceptionsContainer : '.exceptions',
			inputDatabaseType : '#inputDatabaseType',
			inputDatabaseUrl : '#inputDatabaseUrl',
			inputDatabaseUsername : '#inputDatabaseUsername',
			inputDatabasePassword : '#inputDatabasePassword',
			inputDatabaseTableNameExceptions : '#inputDatabaseTableNameExceptions',
			inputDatabaseColumnNameExceptions : '#inputDatabaseColumnNameExceptions',
			inputSupressPrefix : '#inputSupressPrefix',
			modalScreen : '.modal',
			inputUploadXml : '#inputUploadXml',
			inputDatabaseTableNames : '#inputDatabaseTableNames',
			form : '.formConfig',
		},

		initialize : function(opt) {
			var that = this;
			this.context = opt.context;

			this.onExtract = opt.onExtract;
			this.on('show', function() {
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});

				$('.showhide').click(function(event) {
					event.preventDefault();
					var hpanel = $(this).closest('div.hpanel');
					var icon = $(this).find('i:first');
					var body = hpanel.find('div.panel-body');
					var footer = hpanel.find('div.panel-footer');
					body.slideToggle(100);
					footer.slideToggle(50);

					// Toggle icon from up to down
					icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
					hpanel.toggleClass('').toggleClass('panel-collapse');
					setTimeout(function() {
						hpanel.resize();
						hpanel.find('[id^=map-]').resize();
					}, 50);
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

		uploadXml : function() {
			var that = this;
			$('.form-upload-xml').ajaxSubmit({
				success : function(_model, _resp) {
					that.onExtract.call(that.context, new ApplicationModel(_model));
				},
				error : function(_model, _resp) {
					util.showMessage('error', "Não foi possivel extrair a base de dados");
					console.log('não extraiu', _resp.responseJSON.errorMessage);
				},
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
						justThisTables : that.ui.inputDatabaseTableNames.val(),
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
					that.onExtract.call(that.context, _model);
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
					justThisTables : that.ui.inputDatabaseTableNames.val(),
					supressPrefix : that.ui.inputSupressPrefix.val(),
				}
			})
		},

		importFlatFile : function() {
			var that = this;
			var applicationModel = new ApplicationModel();
			applicationModel.url = 'rs/crud/applications/extraction/flatFile';
			applicationModel.fetch({
				success : function(_model, _resp) {
					that.onExtract.call(that.context, _model);
				},
				error : function(_model, _resp) {
					util.showMessage('error', "Não foi possivel extrair a base de dados");
					console.log('não extraiu', _resp.responseJSON.errorMessage);
				},
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