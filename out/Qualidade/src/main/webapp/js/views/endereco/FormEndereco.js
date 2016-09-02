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

	var TemplateFormEnderecos = require('text!views/endereco/tpl/FormEnderecoTemplate.html');
	var EnderecoModel = require('models/EnderecoModel');
	var EnderecoCollection = require('collections/EnderecoCollection');
	var SearchCepModal = require('views/modalComponents/CepModal');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormEnderecos = Marionette.LayoutView.extend({
		template : _.template(TemplateFormEnderecos),

		regions : {
			searchCepModalRegion : '#cepModal',
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'click #searchCepModal' : '_showSearchCepModal',
		},
		
		ui : {
			inputId : '#inputId',
			inputComplemento : '#inputComplemento',
			inputNumero : '#inputNumero',
		
			inputCepId : '#inputCepId',
			inputCepCep : '#inputCepCep',
			form : '#formEndereco',
		},

		initialize : function() {
			var that = this;
			this.searchCepModal = new SearchCepModal({
				onSelectModel : function(model) {
					that._selectCep(model);
				},
			});
			this.on('show', function() {
				this.searchCepModalRegion.show(this.searchCepModal);		
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
			var endereco = that._getModel();

			if (this._isValid()) {
				endereco.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Endereco salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/enderecos');
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
			util.clear('inputComplemento'); 
			util.clear('inputNumero'); 
			util.clear('inputCepId');
			util.clear('inputCepCep');
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
			var endereco = that.model; 
			endereco.set({
				id: util.escapeById('inputId') || null,
		    	complemento : util.escapeById('inputComplemento'), 
				
		    	numero : util.escapeById('inputNumero'), 
				
					cep : that._getCep(),
			});
			return endereco;
		},
		 
		_getCep : function() {			
			var id = util.escapeById('inputCepId');
			var cep = util.escapeById('inputCepCep');
			var cep = null;
			
			if (id && cep) {
				cep = {
					id : id,
					cep : cep,
				}
			}
			return cep;
		},	
		
		_showSearchCepModal : function() {
			this.searchCepModal.showPage();
		},
			
		_selectCep : function(cep) {
			this.searchCepModal.hidePage();	
			this.ui.inputCepId.val(cep.get('id'));
			this.ui.inputCepCep.val(cep.get('cep'));		
		},
				
		
	});

	return FormEnderecos;
});