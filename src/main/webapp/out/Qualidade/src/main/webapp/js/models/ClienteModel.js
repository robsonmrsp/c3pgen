/* generated: 24/09/2016 11:56:33 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY  ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var ClienteModel = BaseModel.extend({

		urlRoot : 'rs/crud/clientes',

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
