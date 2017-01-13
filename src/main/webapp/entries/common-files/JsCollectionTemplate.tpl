/* generated: ${.now} */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var JSetup = require('views/components/JSetup');
	
	var ${entity.name}Model = require('models/${entity.name}Model');
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY  ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var ${entity.name}Collection = JSetup.BaseCollection.extend({
		model : ${entity.name}Model,
		
		<#if application.persistenceFramework == 'hibernate'>	
		url : 'rs/crud/${firstLower(entity.name)}s/all',
		<#else>
		url : '../rs/crud/${firstLower(entity.name)}s/all',
		</#if>
		
	});
	return ${entity.name}Collection;
});