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

	var TemplateFormClientes = require('text!views/cliente/tpl/FormClienteTemplate.html');
	var ClienteModel = require('models/ClienteModel');
	var ClienteCollection = require('collections/ClienteCollection');
	
	// End of "Import´s" definition

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨MAIN BODY¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var FormClientes = Marionette.LayoutView.extend({
		template : _.template(TemplateFormClientes),

		regions : {
		},

		events : {
			'click 	.save' : 'save',
			'click 	.saveAndContinue' : 'saveAndContinue',
			'change  #inputCpf' : 'changeCpf',	
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputEmail : '#inputEmail',
			inputCpf : '#inputCpf',
			inputTelefone : '#inputTelefone',
			inputOutroTelefone : '#inputOutroTelefone',
		
			form : '#formCliente',
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
				this.ui.inputCpf.mask('999.999.999-99');
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
			var cliente = that._getModel();

			if (this._isValid()) {
				cliente.save({}, {
					success : function(_model, _resp, _options) {
						util.showMessage('success', 'Cliente salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/clientes');
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
			util.clear('inputNome'); 
			util.clear('inputEmail'); 
			util.clear('inputCpf'); 
			util.clear('inputTelefone'); 
			util.clear('inputOutroTelefone'); 
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
			var cliente = that.model; 
			cliente.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
		    	email : util.escapeById('inputEmail'), 
				
		    	cpf : util.escapeById('inputCpf'), 
				
		    	telefone : util.escapeById('inputTelefone'), 
				
		    	outroTelefone : util.escapeById('inputOutroTelefone'), 
				
			});
			return cliente;
		},
		 
		
				
		changeCpf : function() {
			var that = this;
			util.validateUnique({
				element : that.ui.inputCpf,
				fieldName : 'cpf',
				fieldDisplayName : 'cpf',
				//onlyNumber : true,     //caso queira que as mascaras sejam removidas e somente NUMEROS sejam enviados na consulta.
				view : that,
				collection : ClienteCollection,
			})
		},				
		
	});

	return FormClientes;
});