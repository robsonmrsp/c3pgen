/* generated: 24/09/2016 11:56:51 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var LocalStorage = require('localStorage');
	var BaseModel = require('models/BaseModel');

	// End of "Import´s definition"
	var LatadaModel = BaseModel.extend({

//	 localStorage : new LocalStorage("table_latada"),

		initialize : function() {
			BaseModel.prototype.initialize.apply(this, arguments)
			this.urlRoot = GLOBAL.getRemoteUrl() + '/rs/crud/latadas'
		},

		
		defaults : {
			id: null,
	    	nome : '',    	
			apontamentoQualidadePackings : null,
		}
	});
	return LatadaModel;
});
