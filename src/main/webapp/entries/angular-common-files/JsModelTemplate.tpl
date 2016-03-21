/* generated: ${.now} */
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

	var ${entity.name}Model = BaseModel.extend({

		urlRoot : 'rs/crud/${firstLower(entity.name)}s',

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
	return ${entity.name}Model;
});