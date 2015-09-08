define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Waves = require('waves');

	var CustomRegion = Marionette.Region.extend({
		el : ".main-content",
		initialize : function(options) {
			this.on('show', function() {
				// faz a magia do jquerymobile
				this.$el.enhanceWithin();
			})
		},
	});

	return CustomRegion;
})