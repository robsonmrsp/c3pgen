/* generated: 24/09/2016 11:56:51 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var LocalStorage = require('localStorage');
	var BaseModel = require('models/BaseModel');

	// End of "Import´s definition"
	var ClienteModel = BaseModel.extend({

//	 localStorage : new LocalStorage("table_cliente"),

		initialize : function() {
			BaseModel.prototype.initialize.apply(this, arguments)
			this.urlRoot = GLOBAL.getRemoteUrl() + '/rs/crud/clientes'
		},

		
		defaults : {
			id: null,
	    	nome : '',    	
	    	nomeFantasia : '',    	
	    	nomeContato : '',    	
	    	telefoneContato : '',    	
	    	razaoSocial : '',    	
	    	observacao : '',    	
	    	cpf : '',    	
	    	cnpj : '',    	
	    	email : '',    	
	    	email2 : '',    	
	    	pessoaFisica : '',    	
	    	dataNascimento : '',    	
		}
	});
	return ClienteModel;
});