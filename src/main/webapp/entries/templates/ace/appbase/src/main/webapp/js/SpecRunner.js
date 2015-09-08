require.config({
	baseUrl : "./js/",
	// urlArgs : 'cb=' + Math.random(),
	paths : {
		'jquery' : 'lib/jquery/jquery-1.10.2',
		'jqueryUI' : 'lib/jquery/jquery-ui-1.10.4.custom.min',
		'jqueryMaskInput' : 'lib/jquery/jquery.maskedinput-1.3.1',
		'jqueryScrollTo' : 'lib/jquery/jquery.scrollTo',
		'jqueryValidatorEngine' : 'lib/jquery/jquery.validationEngine-2.6.2',
		'jqueryValidatorEnginePtBr' : 'lib/jquery/jquery.validationEngine-pt_BR',
		'jqueryNumeric' : 'lib/jquery/jquery.numeric-1.3.1',
		'spin' : 'lib/jquery/spin',
		'morris' : 'lib/chart/morris/morris',
		'raphael' : 'lib/raphael/raphael',
		'multiselect' : 'lib/jquery/bootstrap-multiselect',

		'underscore' : 'lib/underscore/underscore-1.5.1',
		'backbone' : 'lib/backbone/backbone-1.1.2',
		'backgrid' : 'lib/backbone/backgrid/backgrid-0.3.5',

		'backboneLocalstorage' : 'lib/backbone/backbone.localStorage',
		'backgridMomentCell' : 'lib/backbone/backgrid/extensions/backgrid-moment-cell',
		'backboneWebSocket' : 'lib/backbone/backbone.websocket',
		'backbonePageable' : 'lib/backbone/backgrid/extensions/backbone-pageable1.4.8',
		'backbonePaginator' : 'lib/backbone/backgrid/extensions/backgrid-paginator',
		'marionette' : 'lib/backbone/marionette/backbone.marionette-1.8.6',

		'bootstrap' : 'lib/bootstrap/bootstrap-3.1.1',
		'bootbox' : 'lib/bootstrap/bootbox',

		'datetimepicker' : 'lib/bootstrap/bootstrap-datetimepicker',
		'datetimepicker_lang_pt_BR' : 'lib/bootstrap/bootstrap-datetimepicker.pt-BR',

		'text' : 'lib/require/text-2.0.3',
		'async' : 'lib/require/async-0.1.1',

		'moment' : 'lib/moment/moment-2.7',
		'list' : 'lib/jscf/list',
		'map' : 'lib/jscf/map',
		'set' : 'lib/jscf/set',
		'highlight' : 'lib/highlight/highlight.pack',

		// Somente para os testes
		'boot' : 'lib/jasmine-2.0.1/boot',
		'jasmine' : 'lib/jasmine-2.0.1/jasmine',
		'jasmine-html' : 'lib/jasmine-2.0.1/jasmine-html',

	// 'spec' : 'jstest/spec/',

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

		// Para os testes
		'jasmine' : {
			exports : 'jasmine'
		},

		'jasmine-html' : {
			deps : [ 'jasmine' ],
			exports : 'jasmineHtml'
		},
		'boot' : {
			deps : [ 'jasmine', 'jasmine-html' ],
			exports : 'window.jasmineRequire',
		},
	},
	wrapShim : true,
});

require([ 'boot' ], function() {
	var specs = [];
	specs.push('spec/models/TodoSpec');

	require(specs, function() {
		window.onload();
	});
});
