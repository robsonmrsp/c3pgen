define(function(require) {
	var $ = require('jquery');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Router = require('MobileRouter');

	var initialize = function() {
		$(window.document).on("mobileinit",

		// Set up the "mobileinit" handler before requiring jQuery Mobile's
		// module
		function() {

			// Prevents all anchor click handling including the addition of
			// active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash
			// changes
			$.mobile.hashListeningEnabled = false;

			
		})

		var router = new Router();
	};

	return {
		initialize : initialize
	};
})
