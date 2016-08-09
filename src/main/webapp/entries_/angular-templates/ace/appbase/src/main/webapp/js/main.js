require.config({
	// urlArgs : "bust=" + new Date().getTime(),
	paths : {
		'angular' : '../vendor/angular/angular',
		'angular-route' : '../vendor/angular/angular-route',
		'angular-animate' : '../vendor/angular/angular-animate',
		'angular-bar' : '../vendor/angular-loading-bar-0.8.0/src/loading-bar',
		'smart-table' : '../vendor/smart-Table-2.1.4/dist/smart-table',
		'jquery' : '../vendor/jquery/jquery-1.10.2',
		'text' : '../vendor/require/text-2.0.3',
		'jqueryValidatorEngine' : '../vendor/jquery.validationEngine/jquery.validationEngine-2.6.2',
		'jqueryValidatorEnginePtBr' : '../vendor/jquery.validationEngine/jquery.validationEngine-pt_BR',

		'datetimepicker' : '../vendor/bootstrap.datetimepicker/bootstrap-datetimepicker',
		'datetimepicker_lang_pt_BR' : '../vendor/bootstrap.datetimepicker/bootstrap-datetimepicker.pt-BR',
		'moment' : '../vendor/moment/moment-2.7',
		'bootstrap' : '../vendor/bootstrap/js/bootstrap',
		'ace' : '../vendor/theme/ace',
		'aceSettings' : '../vendor/theme/ace.settings',
		'aceSidebar' : '../vendor/theme/ace.sidebar',
		'jqueryUI' : '../vendor/jquery.ui/jquery-ui-1.10.4.custom.min',
		'bootbox' : '../vendor/bootbox/bootbox',
	},
	shim : {
		'angular' : {
			deps : [ 'jquery' ],
			exports : 'angular',
		},

		'angular-route' : {
			deps : [ 'angular' ]
		},
		'angular-bar' : {
			deps : [ 'angular' ]
		},
		'angular-animate' : {
			deps : [ 'angular' ]
		},

		'smart-table' : {
			deps : [ 'angular' ]
		},

		'jqueryValidatorEngine' : [ 'jquery' ],

		'jqueryValidatorEnginePtBr' : [ 'jquery' ],

		'datetimepicker' : [ 'jquery' ],

		'datetimepicker_lang_pt_BR' : {
			deps : [ 'jquery', 'moment' ],
			exports : 'datetimepicker_lang_pt_BR'
		},

		'moment' : {
			exports : 'moment'
		},

		'bootstrap' : [ 'jquery' ],

		'ace' : {
			deps : [ 'jquery', ],
		},
		'aceSettings' : {
			deps : [ 'jquery', 'ace' ],
		},
		'aceSidebar' : {
			deps : [ 'jquery', 'aceSettings', 'ace' ],
		},

		'jqueryUI' : [ 'jquery' ],
		
		'bootbox' : [ 'jquery' ],
	},
	wrapShim : true,
});

require([ 'App' ], function(App) {
	console.log('app.js, services.js and controllers.js files loaded');
	App.initialize();
});
