require.config({
	// urlArgs : "bust=" + new Date().getTime(),
	paths : {
		'jquery' : '../vendor/jquery/jquery-1.11.3',
		'jquerymobile' : '../vendor/jquery/jquery.mobile-1.4.5',
		'jqueryui' : '../vendor/jquery-ui/jquery-ui',
		'underscore' : '../vendor/underscore/underscore-1.5.1',
		'backbone' : '../vendor/backbone/backbone-1.1.2',
		'marionette' : '../vendor/backbone.marionette/backbone.marionette-2.2.0',
		'localStorage' : '../vendor/backbone.localStorage/backbone.localStorage',
		'text' : '../vendor/require/text-2.0.3',
		'async' : '../vendor/require/async-0.1.1',
		'moment' : '../vendor/moment/moment-2.7',
		'list' : '../vendor/jscf/list',
		'map' : '../vendor/jscf/map',
		'set' : '../vendor/jscf/set',
		'waves' : '../vendor/waves/waves',

		'waves' : '../vendor/waves/waves',
		'wow' : '../vendor/wow/wow',
		'nativedroid2' : '../vendor/theme/nativedroid2',
		"velocity" : "../vendor/velocity-1.2.2/velocity",
		"simpleAlerts" : "../vendor/jquery/jquery.simplealerts",

	},
	shim : {
		"velocity" : {
			deps : [ "jquery" ]
		},

		'jquery' : {
			exports : '$'
		},
		'underscore' : {
			exports : '_'
		},
		'moment' : {
			exports : 'moment'
		},
		'marionette' : {
			deps : [ 'jquery', 'underscore', 'backbone' ],
			exports : 'Marionette'
		},
		'list' : {
			exports : 'List'
		},
		'map' : {
			exports : 'Map'
		},
		'set' : {
			exports : 'Set'
		},
		'jqueryui' : [ 'jquery' ],

		'wow' : [ 'jquery' ],

		'simpleAlerts' : [ 'jquery' ],

	},
	wrapShim : true,
});

require([ "adapters/jquery-adapter", "backbone", "MobileRouter", 'CorsHelper' ], function($, Backbone, MobileRouter, CorsHelper) {
	$(document).on("mobileinit", function() {
		$.mobile.linkBindingEnabled = false;
		$.mobile.hashListeningEnabled = false;

	})
	CorsHelper.initCorsSuportWithCredentials();
	// deve ser chamado depois, pois do contrário o evento "mobileinit" só será
	// assinado DEPOIS de lancado, o que nao adiantará mais.
	require([ "jquerymobile", 'nativedroid2', 'waves', 'AppScripts', 'simpleAlerts' ], function() {
		this.router = new MobileRouter();
	});
});
