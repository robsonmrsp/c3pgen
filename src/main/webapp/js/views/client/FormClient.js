/* generated: 30/08/2015 20:23:12 */
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

	var TemplateFormClients = require('text!views/client/tpl/FormClientTemplate.html');
	var ClientModel = require('models/ClientModel');
	var ClientCollection = require('collections/ClientCollection');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormClients = Marionette.LayoutView.extend({
		template : _.template(TemplateFormClients),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputLogo : '#inputLogo',
			inputName : '#inputName',
			inputCnpj : '#inputCnpj',
			inputPhoneNumber : '#inputPhoneNumber',
			inputCorporateName : '#inputCorporateName',
		
			form : '#formClient',
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
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
			var client = that._getModel();

			if (this._isValid()) {
				client.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Client salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/clients');
						}
					},

					error : function(_model, _resp, _options) {
						util.showMessage('error', 'Problema ao salvar registro: ' + util.getJson(_resp.responseText).legalMessage || '');
						console.error(_resp.responseText || (_resp.getResponseHeader && _resp.getResponseHeader('exception')));
					}
				});
			} else {
				util.showMessage('error', 'Verifique campos em destaque!');
			}
		},

		
		clearForm : function() {
			util.clear('inputId');
			util.clear('inputLogo'); 
			util.clear('inputName'); 
			util.clear('inputCnpj'); 
			util.clear('inputPhoneNumber'); 
			util.clear('inputCorporateName'); 
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
			var client = that.model; 
			client.set({
				id: util.escapeById('inputId') || null,
		    	logo : util.escapeById('inputLogo'), 
				
		    	name : util.escapeById('inputName'), 
				
		    	cnpj : util.escapeById('inputCnpj'), 
				
		    	phoneNumber : util.escapeById('inputPhoneNumber'), 
				
		    	corporateName : util.escapeById('inputCorporateName'), 
				
			});
			return client;
		},
		 
		
				
		
	});

	return FormClients;
});