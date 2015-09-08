require.config({
	urlArgs : "bust=" + new Date().getTime(),
	paths : {
		'jquery' : '../vendor/jquery/jquery-1.10.2',
		'jqueryUI' : '../vendor/jquery.ui/jquery-ui-1.10.4.custom.min',
		'jqueryMaskInput' : '../vendor/jquery.maskedinput/jquery.maskedinput-1.3.1',
		'jqueryScrollTo' : '../vendor/jquery.scrollTo/jquery.scrollTo',
		'jqueryValidatorEngine' : '../vendor/jquery.validationEngine/jquery.validationEngine-2.6.2',
		'jqueryValidatorEnginePtBr' : '../vendor/jquery.validationEngine/jquery.validationEngine-pt_BR',
		'jqueryNumeric' : '../vendor/jquery.numeric/jquery.numeric-1.3.1',
		'nprogress' : '../vendor/nprogressbar/nprogress',
		'spin' : '../vendor/spin/spin',
		'morris' : '../vendor/morris/morris',
		'raphael' : '../vendor/raphael/raphael',
		'underscore' : '../vendor/underscore/underscore-1.5.1',
		'backbone' : '../vendor/backbone/backbone-1.1.2',
		'backgrid' : '../vendor/backgrid/backgrid-0.3.5',
		'backboneLocalstorage' : '../vendor/backbone.localStorage/backbone.localStorage',
		'backgridMomentCell' : '../vendor/backgrid/extensions/backgrid-moment-cell',
		'backboneSelectAll' : '../vendor/backgrid/extensions/backgrid-select-all',

		'backboneWebSocket' : '../vendor/backbone.websocket/backbone.websocket',
		'backbonePageable' : '../vendor/backgrid/extensions/backbone-pageable1.4.8',
		'backbonePaginator' : '../vendor/backgrid/extensions/backgrid-paginator',
		'marionette' : '../vendor/backbone.marionette/backbone.marionette-2.2.0',
		'multiselect' : '../vendor/bootstrap.multiselect/bootstrap-multiselect',
		'bootstrap' : '../vendor/bootstrap/js/bootstrap',
		'bootbox' : '../vendor/bootbox/bootbox',
		'datetimepicker' : '../vendor/bootstrap.datetimepicker/bootstrap-datetimepicker',
		'datetimepicker_lang_pt_BR' : '../vendor/bootstrap.datetimepicker/bootstrap-datetimepicker.pt-BR',
		'text' : '../vendor/require/text-2.0.3',
		'async' : '../vendor/require/async-0.1.1',
		'moment' : '../vendor/moment/moment-2.7',
		'list' : '../vendor/jscf/list',
		'map' : '../vendor/jscf/map',
		'set' : '../vendor/jscf/set',

		'ace' : '../vendor/theme/ace',
		'aceSettings' : '../vendor/theme/ace.settings',
		'aceSidebar' : '../vendor/theme/ace.sidebar',
		'jqueryGritter' : '../vendor/jquery.gritter-1.7.4/js/jquery.gritter',
		'selectize' : '../vendor/selectize/js/standalone/selectize',
	},
	shim : {
		'underscore' : {
			exports : '_'
		},
		'jquery' : {
			exports : '$'
		},
		'backgrid' : {
			deps : [ 'backbone' ],
			exports : 'Backgrid'
		},

		'moment' : {
			exports : 'moment'
		},
		'raphael' : {
			exports : 'raphael'
		},
		'backboneWebSocket' : {
			deps : [ 'backbone', 'underscore' ],
			exports : 'WebSocket'
		},
		'backboneLocalstorage' : {
			deps : [ 'backbone' ],
			exports : 'Store'
		},
		'backbonePageable' : {
			deps : [ 'backbone' ],
			exports : 'PageableCollection'
		},

		'backboneSelectAll' : {
			deps : [ 'backgrid' ],
		},

		'morris' : {
			deps : [ 'raphael', 'jquery' ],
			exports : 'Morris'
		},
		'backbonePaginator' : {
			deps : [ 'backbone', 'backgrid', 'backbonePageable' ],
		},
		'bootstrap' : [ 'jquery' ],
		'bootbox' : [ 'jquery' ],
		'jqueryMaskInput' : [ 'jquery' ],
		'jqueryScrollTo' : [ 'jquery' ],
		'nprogres' : {
			deps : [ 'jquery' ],
			exports : 'Nprogress'
		},
		'marionette' : {
			deps : [ 'jquery', 'underscore', 'backbone' ],
			exports : 'Marionette'
		},
		'jqueryUI' : [ 'jquery' ],
		'datetimepicker' : [ 'jquery' ],
		'datetimepicker_lang_pt_BR' : {
			deps : [ 'jquery', 'moment' ],
			exports : 'datetimepicker_lang_pt_BR'
		},
		'jqueryNumeric' : [ 'jquery' ],

		'multiselect' : [ 'jquery' ],
		'list' : {
			exports : 'List'
		},
		'map' : {
			exports : 'Map'
		},
		'set' : {
			exports : 'Set'
		},
		'jqueryValidatorEngine' : [ 'jquery' ],
		'jqueryValidatorEnginePtBr' : [ 'jquery' ],

		'ace' : {
			deps : [ 'jquery', ],
		},
		'aceSettings' : {
			deps : [ 'jquery', 'ace' ],
		},
		'aceSidebar' : {
			deps : [ 'jquery', 'aceSettings', 'ace' ],
		},

		'jqueryGritter' : [ 'jquery' ],
		'selectize' : [ 'jquery' ],
	},
	wrapShim : true,
});

require([ 'App' ], function(App) {
	App.initialize();
});
