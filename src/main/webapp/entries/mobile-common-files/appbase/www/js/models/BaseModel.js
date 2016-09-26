define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('backbone');

	var BaseColl = Backbone.Model.extend({
		token : function() {
			return GLOBAL.getTokenCredentials();
		},
	});
	return BaseColl;
});
