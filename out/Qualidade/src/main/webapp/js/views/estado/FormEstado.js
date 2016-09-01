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

	var TemplateFormEstados = require('text!views/estado/tpl/FormEstadoTemplate.html');
	var EstadoModel = require('models/EstadoModel');
	var EstadoCollection = require('collections/EstadoCollection');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormEstados = Marionette.LayoutView.extend({
		template : _.template(TemplateFormEstados),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'change  #inputNome' : 'changeNome',	
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputFaixaCep1Ini : '#inputFaixaCep1Ini',
			inputFaixaCep1Fim : '#inputFaixaCep1Fim',
			inputFaixaCep2Ini : '#inputFaixaCep2Ini',
			inputFaixaCep2Fim : '#inputFaixaCep2Fim',
		
			form : '#formEstado',
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
			var estado = that._getModel();

			if (this._isValid()) {
				estado.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Estado salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/estados');
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
			util.clear('inputFaixaCep1Ini'); 
			util.clear('inputFaixaCep1Fim'); 
			util.clear('inputFaixaCep2Ini'); 
			util.clear('inputFaixaCep2Fim'); 
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
			var estado = that.model; 
			estado.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
		    	faixaCep1Ini : util.escapeById('inputFaixaCep1Ini'), 
				
		    	faixaCep1Fim : util.escapeById('inputFaixaCep1Fim'), 
				
		    	faixaCep2Ini : util.escapeById('inputFaixaCep2Ini'), 
				
		    	faixaCep2Fim : util.escapeById('inputFaixaCep2Fim'), 
				
			});
			return estado;
		},
		 
		
				
		changeNome : function() {
			var that = this;
			util.validateUnique({
				element : that.ui.inputNome,
				fieldName : 'nome',
				fieldDisplayName : 'Nome',
				//onlyNumber : true,     //caso queira que as mascaras sejam removidas e somente NUMEROS sejam enviados na consulta.
				view : that,
				collection : EstadoCollection,
			})
		},				
		
	});

	return FormEstados;
});