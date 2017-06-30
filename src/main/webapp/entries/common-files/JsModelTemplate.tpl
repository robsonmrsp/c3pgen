/* generated: ${.now} */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var JSetup = require('views/components/JSetup');	

	var ${entity.name}Model = JSetup.BaseModel.extend({

		<#if application.persistenceFramework == 'hibernate'>	
		urlRoot : 'rs/crud/${firstLower(entity.name)}s',
		<#else>
		urlRoot : '../rs/crud/${firstLower(entity.name)}s',
		</#if>

		defaults : {
			id: null,
		<#list entity.attributes as att>
	    	${firstLower(att.name)} : '',    	
		</#list>
		<#if entity.relationships??>	
		<#list entity.relationships as rel >
			${firstLower(rel.name)} : null,
		</#list>
		</#if>
		
		}
	});
	
	var ${entity.name}Collection = JSetup.BaseCollection.extend({
		model : ${entity.name}Model,
		
		<#if application.persistenceFramework == 'hibernate'>	
		url : 'rs/crud/${firstLower(entity.name)}s/all',
		<#else>
		url : '../rs/crud/${firstLower(entity.name)}s/all',
		</#if>
		
	});
	
	var ${entity.name}sCollection = Backbone.PageableCollection.extend({

		model : ${entity.name}Model,

		url : 'rs/crud/${firstLower(entity.name)}s',

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

	var ${entity.name}PageClientCollection = ${entity.name}sCollection.extend({
		mode : 'client',
		state : {
			pageSize : 10,
		},
	})
	
	return {
		Model : ${entity.name}Model,
		Collection : ${entity.name}Collection,
	  	PageCollection : ${entity.name}sCollection,
	  	PageClientCollection : ${entity.name}PageClientCollection, 
	};
});
