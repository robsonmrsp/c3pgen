require.config({
	// urlArgs : "bust=" + new Date().getTime(),
	paths : {
		'jquery' : '../vendor/jquery/jquery-1.10.2',
		'jqueryUI' : '../vendor/jquery.ui/jquery-ui-1.10.4.custom.min',

		'jqueryScrollTo' : '../vendor/jquery.scrollTo/jquery.scrollTo',

		'jqueryFormValidator' : '../vendor/jQuery-Form-Validator-2.3.54/form-validator/jquery.form-validator',

		'nprogress' : '../vendor/nprogressbar/nprogress',
		'spin' : '../vendor/spin/spin',

		'underscore' : '../vendor/underscore/underscore-1.5.1',
		'backbone' : '../vendor/backbone/backbone-1.1.2',
		'backgrid' : '../vendor/backgrid/backgrid-0.3.5',
		'backboneLocalstorage' : '../vendor/backbone.localStorage/backbone.localStorage',
		'backgridMomentCell' : '../vendor/backgrid/extensions/backgrid-moment-cell',
		'backgridColumnManager' : '../vendor/Backgrid.ColumnManager/lib/Backgrid.ColumnManager',
		'backboneSelectAll' : '../vendor/backgrid/extensions/backgrid-select-all',

		'backboneWebSocket' : '../vendor/backbone.websocket/backbone.websocket',
		'backbonePageable' : '../vendor/backgrid/extensions/backbone-pageable1.4.8',
		'backbonePaginator' : '../vendor/backgrid/extensions/backgrid-paginator',
		'marionette' : '../vendor/backbone.marionette/backbone.marionette-2.2.0',
		'multiselect' : '../vendor/bootstrap.multiselect/bootstrap-multiselect',
		'bootstrap' : '../vendor/bootstrap/js/bootstrap',

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
		'jqueryForm' : '../vendor/jquery.form/jquery.form',
		'jqueryChosen' : '../vendor/chosen_v1.6.2/chosen.jquery',
		'jqueryInputMask' : '../vendor/Inputmask-3.3.3/dist/jquery.inputmask.bundle',

		'typeahead' : '../vendor/typeahead/typeahead.jquery',
		'bloodhound' : '../vendor/typeahead/bloodhound',
		'sweetAlert' : '../vendor/sweetalert-1.1.3/dist/sweetalert-dev',
	},
	shim : {

		'typeahead' : {
			deps : [ 'jquery' ],
		},

		'bloodhound' : {
			deps : [ "jquery" ],
			exports : "Bloodhound"
		},

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

		'backbonePaginator' : {
			deps : [ 'backbone', 'backgrid', 'backbonePageable' ],
		},
		'bootstrap' : [ 'jquery' ],
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
		'jqueryForm' : [ 'jquery' ],
		'jqueryChosen' : [ 'jquery' ],
		'jqueryInputMask' : [ 'jquery' ],
		'jqueryFormValidator' : [ 'jquery' ],
		'sweetAlert' : [ 'jquery' ],
	},
	wrapShim : true,
});

require([ 'App' ], function(App) {

	App.initialize();
	var text = [], line1 = " | |__| |____) |  __/ |_| |_| | |_) |    / / / / ", line2 = "  \\____/|_____/ \\___|\\__|\\__,_| .__/    / / / /  ", line3 = "\n", line4 = "      | | (___   ___| |_ _   _ _ __      \\ \\ \\ \\ ";
	text.push(line3), text.push("       _  _____      _                  ______   "), text.push(line3), text.push("      | |/ ____|    | |                 \\ \\ \\ \\  "), text.push(line3), text.push(line4), text.push(line3), text
			.push("  _   | |\\___ \\ / _ \\ __| | | | '_ \\      > > > >"), text.push(line3), text.push(line1), text.push(line3), text.push(line2), text.push(line3), text.push("============================= | |======/_/_/_/=="), text.push(line3), text
			.push(" :: Build with JSetupGen ::   |_|          (" + App.JSETUP_GEN_VERSION + ")"), text.push(line3);
	console.log(text.join(''))
});
