/* generated: 02/09/2016 16:23:48 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var CabineModel = require('models/CabineModel');
	// End of "Import´s definition"
	
	var CabinesCollection = Backbone.PageableCollection.extend({

		model : CabineModel,

		
		url : 'rs/crud/cabines',

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

	return CabinesCollection;
});