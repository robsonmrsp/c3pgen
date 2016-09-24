/* generated: 18/03/2015 12:38:56 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('jquery');
	var Backbone = require('backbone');
	var LocalStorage = require('localStorage');
	var BaseCollection = require('collections/BaseCollection');
	var EmbalagemModel = require('models/EmbalagemModel');

	var EmbalagemCollection = BaseCollection.extend({

		model : EmbalagemModel,
	
		initialize : function() {
			BaseCollection.prototype.initialize.apply(this, arguments)
			this.url = GLOBAL.getRemoteUrl() + '/rs/crud/embalagems/all'
		},

		//localStorage : new LocalStorage("table_embalagem"),
	});

	return EmbalagemCollection;
});