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

		'selectize' : '../vendor/selectize/js/standalone/selectize',
		'jqueryForm' : '../vendor/jquery.form/jquery.form',
		'jqueryChosen' : '../vendor/chosen_v1.6.2/chosen.jquery',
		'jqueryInputMask' : '../vendor/Inputmask-3.3.3/dist/jquery.inputmask.bundle',

		'nifty' : '../vendor/theme/demo/js/nifty',
		'metisMenu' : '../vendor/metisMenu/dist/metisMenu',

		'typeahead' : '../vendor/typeahead/typeahead.jquery',
		'bloodhound' : '../vendor/typeahead/bloodhound',
		'sweetAlert' : '../vendor/sweetalert-1.1.3/dist/sweetalert-dev',
		'tagsinput' : '../vendor/bootstrap-tagsinput-0.8.0/dist/bootstrap-tagsinput',
		'nestable' : '../vendor/Nestable-master/jquery.nestable',

		'bootstrapSwitch' : '../vendor/bootstrap-switch-3.3.4/dist/js/bootstrap-switch',
		'summernote' : '../vendor/summernote-0.8.7/dist/summernote',
		'ionsound' : '../vendor/ion.sound-3.0.7/ion.sound',
		'Collections' : '../vendor/collections-5.0.7/collections.min',
		'Noty' : '../vendor/noty-3.1.3/lib/noty',

		// testes
		'jasmine' : '../vendor/tests/jasmine-2.8.0/lib/jasmine-core/jasmine',
		'jasmine-html' : '../vendor/tests/jasmine-2.8.0/lib/jasmine-core/jasmine-html',
		'jasmineBoot' : '../vendor/tests/jasmine-2.8.0/lib/jasmine-core/boot/boot'

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

		'selectize' : [ 'jquery' ],
		'jqueryForm' : [ 'jquery' ],
		'jqueryChosen' : [ 'jquery' ],
		'jqueryInputMask' : [ 'jquery' ],
		'jqueryFormValidator' : [ 'jquery' ],
		'sweetAlert' : [ 'jquery' ],

		'metisMenu' : [ 'jquery' ],
		'nifty' : [ 'jquery' ],
		'tagsinput' : [ 'jquery' ],
		'ionsound' : [ 'jquery' ],
		'bootstrapSwitch' : [ 'jquery' ],
		'summernote' : [ 'jquery' ],
		'nestable' : [ 'jquery' ],

		'jasmine-html' : {
			deps : [ 'jasmine' ]
		},

		'jasmineBoot' : {
			deps : [ 'jasmine', 'jasmine-html' ]
		}
	},
	wrapShim : true,
});

require([ 'App', 'jasmineBoot' ], function(App, jasmineBoot) {
	App.initialize();
	var text = [], line1 = " | |__| |____) |  __/ |_| |_| | |_) |    / / / / ", line2 = "  \\____/|_____/ \\___|\\__|\\__,_| .__/    / / / /  ", line3 = "\n", line4 = "      | | (___   ___| |_ _   _ _ __      \\ \\ \\ \\ ";
	text.push(line3), text.push("       _  _____      _                  ______   "), text.push(line3), text.push("      | |/ ____|    | |                 \\ \\ \\ \\  "), text.push(line3), text.push(line4), text.push(line3), text
			.push("  _   | |\\___ \\ / _ \\ __| | | | '_ \\      > > > >"), text.push(line3), text.push(line1), text.push(line3), text.push(line2), text.push(line3), text.push("============================= | |======/_/_/_/=="), text.push(line3), text
			.push(" :: Build with JSetupGen ::   |_|          (" + App.JSETUP_GEN_VERSION + ")"), text.push(line3);
	console.log(text.join(''))

	// /
	var specs = [];
	specs.push('spec/router/RouterSpec');

	require(specs, function() {
		window.onload();
	});

});
