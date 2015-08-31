/* generated: 30/08/2015 14:17:03 */
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

	var EntityModel = BaseModel.extend({

		urlRoot : 'rs/crud/entitys',

		defaults : {
			id: null,
	    	name : '',    	
	    	displayName : '',    	
	    	tableName : '',    	
	    	hasOwner : '',    	
	    	hasMobile : '',    	
			application : null,
			attributes : null,
			relationships : null,
		
		}
	});
	return EntityModel;
});
