/* generated: 01/09/2016 17:25:05 */
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

	var TemplateFormFuncaos = require('text!views/funcao/tpl/FormFuncaoTemplate.html');
	var FuncaoModel = require('models/FuncaoModel');
	var FuncaoCollection = require('collections/FuncaoCollection');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormFuncaos = Marionette.LayoutView.extend({
		template : _.template(TemplateFormFuncaos),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputDescricao : '#inputDescricao',
		
			form : '#formFuncao',
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
			var funcao = that._getModel();

			if (this._isValid()) {
				funcao.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Funcao salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/funcaos');
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
			util.clear('inputDescricao'); 
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
			var funcao = that.model; 
			funcao.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
		    	descricao : util.escapeById('inputDescricao'), 
				
			});
			return funcao;
		},
		 
		
				
		
	});

	return FormFuncaos;
});