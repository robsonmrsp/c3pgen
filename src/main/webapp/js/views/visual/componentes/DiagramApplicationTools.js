define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');

	var DiagramApplicationToolsTemplate = require('text!views/visual/componentes/tpl/DiagramApplicationToolsTemplate.html');

	var DiagramApplicationTools = Marionette.LayoutView.extend({
		template : _.template(DiagramApplicationToolsTemplate),

		events : {
			'click ."btnImportApplication"' : 'importApplication',

		},

		regions : {

		},

		ui : {

			modalScreen : '.modal',
		},

		initialize : function(opt) {
			var that = this;

			this.on('show', function() {

			});
		},

		importApplication : function() {
			// testa o que for

		},

		hidePage : function() {
			this.ui.modalScreen.modal('hide');
		},

		showPage : function() {
			this.clearModal();

			this.ui.modalScreen.modal({
				backdrop : 'static'
			})

		},

		clearModal : function() {

		},
	});

	return DiagramApplicationTools;
});
