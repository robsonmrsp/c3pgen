/* generated: 02/09/2016 16:23:48 */
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

	var TemplateFormPaiss = require('text!views/pais/tpl/FormPaisTemplate.html');
	var PaisModel = require('models/PaisModel');
	var PaisCollection = require('collections/PaisCollection');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormPaiss = Marionette.LayoutView.extend({
		template : _.template(TemplateFormPaiss),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputCodigo : '#inputCodigo',
			inputNome : '#inputNome',
		
			form : '#formPais',
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
				this.ui.inputCodigo.formatNumber(2);
				this.ui.form.validationEngine('attach', {
					promptPosition : "topLeft",
					isOverflown : false,
					validationEventTrigger : "change"
				});
			});
		},

		saveAndContinue : function() {
			this.save(true)
		},

		save : function(continua) {
			var that = this;
			var pais = that._getModel();

			if (this._isValid()) {
				pais.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Pais salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/paiss');
						}
					},

					error : function(_model, _resp, _options) {
						util.showErrorMessage('Problema ao salvar registro',_resp);
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		
		clearForm : function() {
			util.clear('inputId');
			util.clear('inputCodigo'); 
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
			var pais = that.model; 
			pais.set({
				id: util.escapeById('inputId') || null,
		    	codigo : util.escapeById('inputCodigo', true), 
				
		    	nome : util.escapeById('inputNome'), 
				
			});
			return pais;
		},
		 
		
				
		
	});

	return FormPaiss;
});