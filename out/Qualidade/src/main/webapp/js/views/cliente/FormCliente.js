/* generated: 03/09/2016 22:18:31 */
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
		},
		
		ui : {
			inputId : '#inputId',
			inputNome : '#inputNome',
			inputNomeFantasia : '#inputNomeFantasia',
			inputNomeContato : '#inputNomeContato',
			inputTelefoneContato : '#inputTelefoneContato',
			inputRazaoSocial : '#inputRazaoSocial',
			inputObservacao : '#inputObservacao',
			inputCpf : '#inputCpf',
			inputCnpj : '#inputCnpj',
			inputEmail : '#inputEmail',
			inputEmail2 : '#inputEmail2',
			inputPessoaFisica : '#inputPessoaFisica',
			inputDataNascimento : '#inputDataNascimento',
			groupInputDataNascimento : '#groupInputDataNascimento',
		
			form : '#formCliente',
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
				this.ui.inputCpf.mask('999.999.999-99');
				this.ui.inputCnpj.mask('99.999.999/9999-99');
				this.ui.groupInputDataNascimento.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataNascimento.datetimepicker({
					pickTime : false,
					language : 'pt_BR',
				});
				this.ui.inputDataNascimento.mask('99/99/9999');
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
			var cliente = that.getModel();

			if (this.isValid()) {
				cliente.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Cliente salvo com sucesso!');
						that.clearForm();

						if (continua != true) {
							util.goPage('app/clientes');
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
			util.clear('inputNomeFantasia'); 
			util.clear('inputNomeContato'); 
			util.clear('inputTelefoneContato'); 
			util.clear('inputRazaoSocial'); 
			util.clear('inputObservacao'); 
			util.clear('inputCpf'); 
			util.clear('inputCnpj'); 
			util.clear('inputEmail'); 
			util.clear('inputEmail2'); 
			util.clear('inputPessoaFisica'); 
			util.clear('inputDataNascimento'); 
		},

		possuiCamposInvalidos : function() {
			return util.hasInvalidFields(this.validateFields);
		},

		isValid : function() {
			return this.ui.form.validationEngine('validate', {
				promptPosition : "topLeft",
				isOverflown : false,
				validationEventTrigger : "change"
			});
		},

		getModel : function() {
			var that = this;
			var cliente = that.model; 
			cliente.set({
				id: util.escapeById('inputId') || null,
		    	nome : util.escapeById('inputNome'), 
				
		    	nomeFantasia : util.escapeById('inputNomeFantasia'), 
				
		    	nomeContato : util.escapeById('inputNomeContato'), 
				
		    	telefoneContato : util.escapeById('inputTelefoneContato'), 
				
		    	razaoSocial : util.escapeById('inputRazaoSocial'), 
				
		    	observacao : util.escapeById('inputObservacao'), 
				
		    	cpf : util.escapeById('inputCpf'), 
				
		    	cnpj : util.escapeById('inputCnpj'), 
				
		    	email : util.escapeById('inputEmail'), 
				
		    	email2 : util.escapeById('inputEmail2'), 
				
		    	pessoaFisica : util.escapeById('inputPessoaFisica'), 
				
		    	dataNascimento : util.escapeById('inputDataNascimento'), 
				
			});
			return cliente;
		},
		 
		
				
		
	});

	return FormClientes;
});