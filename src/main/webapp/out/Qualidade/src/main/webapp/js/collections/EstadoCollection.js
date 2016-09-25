/* generated: 24/09/2016 12:52:16 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseCollection = require('collections/BaseCollection');
	var EstadoModel = require('models/EstadoModel');
	var BaseCollection = require('collections/BaseCollection');	
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY  ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var EstadoCollection = BaseCollection.extend({
		model : EstadoModel,
		
		url : 'rs/crud/estados/all',
		
	});
	return EstadoCollection;
});