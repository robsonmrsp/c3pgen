/* generated: 24/09/2016 12:52:13 */
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

	var ControleCumbucaModel = BaseModel.extend({

		urlRoot : 'rs/crud/controleCumbucas',

		defaults : {
			id: null,
	    	dataRegistro : '',    	
	    	peso : '',    	
	    	tipo : '',    	
	    	quantidadeCachos : '',    	
			cabine : null,
		
		}
	});
	return ControleCumbucaModel;
});
