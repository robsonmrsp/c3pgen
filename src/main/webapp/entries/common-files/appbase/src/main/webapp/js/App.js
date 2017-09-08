define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Router = require('Router');
	var AppScripts = require('AppScripts');
	var CorsApp = require('CorsApp');

	var initialize = function() {
		var router = new Router();
		CorsApp.initCorsSuportWithCredentials();
		AppScripts.initialize();
		router.start();
	};

	return {
		initialize : initialize,
		JSETUP_GEN_VERSION : 'v0.95',
	};
})
