/* generated: 24/09/2016 11:56:35 */
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

	var FuncionarioModel = BaseModel.extend({

		urlRoot : 'rs/crud/funcionarios',

		defaults : {
			id: null,
	    	matricula : '',    	
	    	foto : '',    	
	    	nome : '',    	
	    	telefone : '',    	
	    	telefone2 : '',    	
	    	sexo : '',    	
	    	dataNascimento : '',    	
	    	salario : '',    	
	    	escolaridade : '',    	
	    	dataAdmissao : '',    	
	    	dataDemissao : '',    	
	    	valorHoraExtra : '',    	
	    	carteiraTrabalho : '',    	
	    	rg : '',    	
	    	rgOrgaoEmissor : '',    	
	    	nomeBanco : '',    	
	    	bancoNumeroAgencia : '',    	
	    	bancoNumeroConta : '',    	
	    	pis : '',    	
			endereco : null,
			cargo : null,
			cbo : null,
			departamento : null,
			funcao : null,
		
		}
	});
	return FuncionarioModel;
});
