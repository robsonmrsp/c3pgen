define(function(require) {
	var $ = require('adapters/jquery-adapter');
	// carrega o angular
	var angular = require('angular');
	// carrega o Router
	require('Router');
	var app = angular.module('AngApp', [ 'Router', 'chieffancypants.loadingBar', 'ngAnimate' ]);

	app.initialize = function() {
		angular.bootstrap(document, [ 'AngApp' ]);
	};
	return app;

})
