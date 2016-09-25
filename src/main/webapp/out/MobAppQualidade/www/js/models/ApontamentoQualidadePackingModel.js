/* generated: 24/09/2016 12:52:33 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var LocalStorage = require('localStorage');
	var BaseModel = require('models/BaseModel');

	// End of "Import´s definition"
	var ApontamentoQualidadePackingModel = BaseModel.extend({

//	 localStorage : new LocalStorage("table_apontamentoQualidadePacking"),

		initialize : function() {
			BaseModel.prototype.initialize.apply(this, arguments)
			this.urlRoot = GLOBAL.getRemoteUrl() + '/rs/crud/apontamentoQualidadePackings'
		},

		
		defaults : {
			id: null,
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
			cor : null,
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
