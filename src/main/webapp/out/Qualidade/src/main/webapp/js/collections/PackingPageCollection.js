/* generated: 24/09/2016 12:52:15 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var PackingModel = require('models/PackingModel');
	// End of "Import´s definition"
	
	var PackingsCollection = Backbone.PageableCollection.extend({

		model : PackingModel,

		
		url : 'rs/crud/packings',

		mode : 'server',
		state : {
			firstPage : 1,
			lastPage : null,
			currentPage : 1,
			pageSize :10,
			totalPages : null,
			totalRecords : null,
			sortKey : null,
			order : -1
		},

		queryParams : {
			totalPages : null,
			pageSize : "pageSize",
			totalRecords : null,
			sortKey : "orderBy",
			order : "direction",
			directions : {
				"-1" : "asc",
				"1" : "desc"
			}
		},
	});

	return PackingsCollection;
});