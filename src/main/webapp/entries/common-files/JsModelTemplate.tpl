/* generated: ${.now} */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var JSetup = require('views/components/JSetup');	
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY  ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

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
	return ${entity.name}Model;
});
