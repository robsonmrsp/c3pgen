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

	var TemplateFormLatadas = require('text!views/latada/tpl/FormLatadaTemplate.html');
	var LatadaModel = require('models/LatadaModel');
	var LatadaCollection = require('collections/LatadaCollection');
	var SearchClientModal = require('views/modalComponents/ClientModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormLatadas = Marionette.LayoutView.extend({
		template : _.template(TemplateFormLatadas),

		regions : {
			searchClientModalRegion : '#clientModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchClientModal' : '_showSearchClientModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
		
			inputClientId : '#inputClientId',
			inputClientNome : '#inputClientNome',
			form : '#formLatada',
		},

		initialize : function() {
			var that = this;
			this.searchClientModal = new SearchClientModal({
				onSelectModel : function(model) {
					that._selectClient(model);
				},
			});
			this.on('show', function() {
				this.searchClientModalRegion.show(this.searchClientModal);		
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
			var latada = that._getModel();

			if (this._isValid()) {
				latada.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Latada salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/latadas');
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
			util.clear('inputNome'); 
			util.clear('inputClientId');
			util.clear('inputClientNome');
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
			var latada = that.model; 
			latada.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
					client : that._getClient(),
			});
			return latada;
		},
		 
		_getClient : function() {			
			var id = util.escapeById('inputClientId');
			var nome = util.escapeById('inputClientNome');
			var client = null;
			
			if (id && nome) {
				client = {
					id : id,
					nome : nome,
				}
			}
			return client;
		},	
		
		_showSearchClientModal : function() {
			this.searchClientModal.showPage();
		},
			
		_selectClient : function(client) {
			this.searchClientModal.hidePage();	
			this.ui.inputClientId.val(client.get('id'));
			this.ui.inputClientNome.val(client.get('nome'));		
		},
				
		
	});

	return FormLatadas;
});