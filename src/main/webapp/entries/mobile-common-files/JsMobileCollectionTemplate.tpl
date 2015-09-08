/* generated: 18/03/2015 12:38:56 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('jquery');
	var Backbone = require('backbone');
	var LocalStorage = require('localStorage');
	var Global = require('models/Global');
	var BaseCollection = require('collections/BaseCollection');
	var ${entity.name}Model = require('models/${entity.name}Model');

	var ${entity.name}Collection = BaseCollection.extend({

		model : ${entity.name}Model,
		
		url : function(){
			return this.global.get('url') +  '/rs/crud/${firstLower(entity.name)}s/all'
		},
	
		localStorage : new LocalStorage("table_${firstLower(entity.name)}"),
	});

	return ${entity.name}Collection;
});