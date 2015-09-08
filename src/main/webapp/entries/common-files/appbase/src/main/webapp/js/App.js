define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Router = require('Router');
	var AppScripts = require('AppScripts');
	var CorsApp = require('CorsApp');
	var AuthUtil = require('utilities/AuthUtil');

	var initialize = function() {
		var router = new Router();
		CorsApp.initCorsSuportWithCredentials(_, Backbone);
		AppScripts.initialize();

		AuthUtil.load(function() {
			console.log('inicializando Router...');
			router.start();
		})
	};

	return {
		initialize : initialize
	};
})
