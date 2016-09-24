/* generated: 24/09/2016 11:56:51 */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Util = require('utilities/Utils');
	var Waves = require('waves');

	var FloatButtonSave = require('views/components/FloatButtonSave');
	var Combobox = require('views/components/Combobox');

	var TemplateFormClientes = require('text!views/cliente/tpl/FormClienteTemplate.html');
	var ClienteModel = require('models/ClienteModel');
	var ClienteCollection = require('collections/ClienteCollection');

	
	// End of "Import´s" definition
	var FormClientes = Marionette.LayoutView.extend({
		template : _.template(TemplateFormClientes),

		regions : {
			floatButtonSaveRegion : '#floatButtonSave',
		},

		events : {
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

		},

		initialize : function() {
			var that = this;

			this.floatButtonSave = new FloatButtonSave({});
			
			this.floatButtonSave.setOnClickSave(function() {
				var cliente = that._getModel();
				cliente.save();
				console.info('cliente  Salvo com sucesso');
				Util.goPage('app/clientes', true);
			});
			
			this.floatButtonSave.setOnClickCancel(function() {
				Util.goPage('app/cliente', true);
			});
			
			this.on('show', function() {
				this.floatButtonSaveRegion.show(this.floatButtonSave);
				
				
				
			})
		},
		

		saveAndContinue : function() {
			this.save(true)
		},

		clearForm : function() {
			Util.clear('inputId');
			Util.clear('inputNome'); 
			Util.clear('inputNomeFantasia'); 
			Util.clear('inputNomeContato'); 
			Util.clear('inputTelefoneContato'); 
			Util.clear('inputRazaoSocial'); 
			Util.clear('inputObservacao'); 
			Util.clear('inputCpf'); 
			Util.clear('inputCnpj'); 
			Util.clear('inputEmail'); 
			Util.clear('inputEmail2'); 
			Util.clear('inputPessoaFisica'); 
			Util.clear('inputDataNascimento'); 
		},
		
		_getModel : function() {
			var that = this;
			var cliente = that.model; 
			cliente.set({
				id: Util.escapeById('inputId') || null,
		    	nome : Util.escapeById('inputNome'), 
		    	nomeFantasia : Util.escapeById('inputNomeFantasia'), 
		    	nomeContato : Util.escapeById('inputNomeContato'), 
		    	telefoneContato : Util.escapeById('inputTelefoneContato'), 
		    	razaoSocial : Util.escapeById('inputRazaoSocial'), 
		    	observacao : Util.escapeById('inputObservacao'), 
		    	cpf : Util.escapeById('inputCpf'), 
		    	cnpj : Util.escapeById('inputCnpj'), 
		    	email : Util.escapeById('inputEmail'), 
		    	email2 : Util.escapeById('inputEmail2'), 
		    	pessoaFisica : Util.escapeById('inputPessoaFisica'), 
		    	dataNascimento : Util.escapeById('inputDataNascimento'), 

			});
			return cliente;
		},
	});

	return FormClientes;
});