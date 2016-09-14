/* generated: 05/08/2016 15:59:17 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Combobox = require('views/components/Combobox');
	var FrameItemModulo = require('views/itemModulo/FrameItemModulo');
	var ItemModuloCollection = require('collections/ItemModuloCollection');
	var PageHelpGenerateYaml = require('views/helpGenerateYaml/PageHelpGenerateYaml');

	var TemplateFormModulos = require('text!views/modulo/tpl/FormModuloTemplate.html');
	var ModuloModel = require('models/ModuloModel');

	var download = require('download');

	var ModuloCollection = require('collections/ModuloCollection');

	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN
	// BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormModulos = Marionette.LayoutView.extend({
		template : _.template(TemplateFormModulos),

		regions : {
			itemsRegion : '.items-container',
			pageHelpGenerateYamlRegion : '.page-help-generate-yaml',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.generateModule' : 'generateModulo',
			'click 	.open-page-help' : 'openPageHelpGenerateYaml',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},

		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputPackageName : '#inputPackageName',

			form : '#formModulo',
		},

		initialize : function() {
			var that = this;
			this.itemCollection = new ItemModuloCollection(this.model && this.model.get('items'));

			this.itemsView = new FrameItemModulo({
				collection : this.itemCollection,
			});

			this.pageHelpGenerateYaml = new PageHelpGenerateYaml({
				context : that,
				onExtract : that.loadResultTables,
			});

			this.on('show', function() {
				this.itemsRegion.show(this.itemsView);
				this.pageHelpGenerateYamlRegion.show(this.pageHelpGenerateYaml);
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},

		generateModulo : function() {
			var that = this;
			var oldUrl = this.model.url;
			this.model.url = 'rs/crud/applications/moduleGenerator/' + this.ui.inputId.val();
			this.model.fetch({
				success : function(_model, _resp, _options) {
					that.model.url = oldUrl;
					util.showMessage('info', _resp.resp);
					console.log(download);
					download(_resp.resp);
				},
				error : function(_model, _resp, _options) {
					util.showMessage('error', util.getJson(_resp.responseText).legalMessage || '');
					that.model.url = oldUrl;
				}
			});
		},

		loadResultTables : function(models) {

			this.itemCollection.reset(models);
		},

		openPageHelpGenerateYaml : function() {
			this.pageHelpGenerateYaml.showPage();
		},
		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var modulo = that._getModel();

			if (this._isValid()) {
				modulo.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Modulo salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/modulos');
						}
					},

					error : function(_model, _resp, _options) {
						util.showErrorMessage('Problema ao salvar registro', _resp);
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		clearForm : function() {
			util.clear('inputId');
			util.clear('inputNome');
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		_isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		_getModel : function() {
			var that = this;
			var modulo = that.model;
			modulo.set({
				id : util.escapeById('inputId') || null,
				nome : util.escapeById('inputNome'),
				packageName : util.escapeById('inputPackageName'),
				items : that.itemCollection.toJSON(),

			});
			return modulo;
		},

	});

	return FormModulos;
});