/* generated: 24/09/2016 11:56:37 */
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

	var ItemModel = BaseModel.extend({

		urlRoot : 'rs/crud/items',

		defaults : {
			id: null,
	    	name : '',    	
	    	description : '',    	
			type : null,
			permissions : null,
		
		}
	});
	return ItemModel;
});
