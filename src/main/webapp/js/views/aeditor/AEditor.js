/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var AEditorTemplate = require('text!views/aeditor/tpl/AEditorTemplate.html');

	var AEditor = Marionette.LayoutView.extend({
		template : _.template(AEditorTemplate),

		regions : {},

		events : {},

		ui : {},

		initialize : function() {
			var that = this;
			this.on('show', function() {

			});
		},

	});

	return AEditor;
});
