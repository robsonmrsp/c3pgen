/* generated: 24/09/2016 11:56:32 */
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

	var ApontamentoQualidadePackingModel = BaseModel.extend({

		urlRoot : 'rs/crud/apontamentoQualidadePackings',

		defaults : {
			id: null,
	    	tipoControle : '',    	
	    	cor : '',    	
	    	classificacao : '',    	
	    	qualidade : '',    	
	    	condicao : '',    	
	    	pallet : '',    	
	    	dataAnalise : '',    	
	    	dataColheita : '',    	
	    	aparencia : '',    	
	    	diametroMinimo : '',    	
	    	diametroMaximo : '',    	
	    	diametroMedio : '',    	
	    	brixMinimo : '',    	
	    	brixMaximo : '',    	
	    	brixMedio : '',    	
	    	pesoCachoMinimo : '',    	
	    	pesoCachoMaximo : '',    	
	    	pesoSacolaMinimo : '',    	
	    	pesoSacolaMaximo : '',    	
	    	numeroCachoSacola : '',    	
	    	numeroSacola : '',    	
	    	pesoCumbucaMinimo : '',    	
	    	pesoCumbucaMaximo : '',    	
	    	numeroCachosCumbuca : '',    	
	    	numeroCumbucas : '',    	
	    	pesoBruto : '',    	
	    	pesoLiquido : '',    	
	    	corposEstranhos : '',    	
	    	bagasAquosas : '',    	
	    	bagasCristalinas : '',    	
	    	firmeza : '',    	
	    	danos : '',    	
	    	pragas : '',    	
	    	doencas : '',    	
	    	aparenciaEngaco : '',    	
	    	desgrana : '',    	
	    	podridao : '',    	
	    	cicatrizes : '',    	
	    	rachaduras : '',    	
	    	rachadurasCampo : '',    	
	    	amolecimento : '',    	
	    	observacao : '',    	
	    	dataHora : '',    	
			anexos : null,
			bolsao : null,
			generador : null,
			cargo : null,
			variedade : null,
			latada : null,
			embalagem : null,
			cabine : null,
			sacola : null,
			cliente : null,
			packing : null,
		
		}
	});
	return ApontamentoQualidadePackingModel;
});