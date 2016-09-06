/* generated: 03/09/2016 22:18:31 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BolsaoModel = require('models/BolsaoModel');
	// End of "Import´s definition"
	
	var BolsaosCollection = Backbone.PageableCollection.extend({

		model : BolsaoModel,

		
		url : 'rs/crud/bolsaos',

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

	return BolsaosCollection;
});