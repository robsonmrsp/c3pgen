/* generated: 24/09/2016 12:52:17 */
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

	var OperationModel = BaseModel.extend({

		urlRoot : 'rs/crud/operations',

		defaults : {
			id: null,
	    	name : '',    	
	    	canEdit : '',    	
	    	canRead : '',    	
	    	canUpdate : '',    	
	    	canDelete : '',    	
	    	canExecute : '',    	
			permissions : null,
		
		}
	});
	return OperationModel;
});
