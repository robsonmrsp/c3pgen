/* generated: ${.now} */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var ${entity.name}Model = require('models/${entity.name}Model');
	// End of "Import´s definition"
	
	var ${entity.name}sCollection = Backbone.PageableCollection.extend({

		model : ${entity.name}Model,

		
		<#if application.persistenceFramework == 'hibernate'>	
		url : 'rs/crud/${firstLower(entity.name)}s',
		<#else>
		url : '../rs/crud/${firstLower(entity.name)}s',
		</#if>

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

	return ${entity.name}sCollection;
});