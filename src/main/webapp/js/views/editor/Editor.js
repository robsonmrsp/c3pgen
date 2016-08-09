/* generated: 05/08/2016 15:59:17 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Yaml = require('Yaml');

	var TemplateEditor = require('text!views/editor/tpl/EditorTemplate.html');

	var download = require('download');
	var CodeMirror = require('codemirror');

	var FormModulos = Marionette.LayoutView.extend({
		template : _.template(TemplateEditor),

		regions : {

		},

		events : {

		},

		ui : {
			consoleError : '.consoleError'
		},

		initialize : function() {
			var that = this;
			this.on('show', function() {
				this.editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
					mode : 'text/x-yaml',
					lineNumbers : true,
					selectionPointer : true
				});
				this.editor.on('change', function(cMirror) {
					try {
						that.ui.consoleError.text('');
						var doc = Yaml.load(cMirror.getValue());
					} catch (e) {
						that.ui.consoleError.text(e);
					}
					console.log(doc);
				});
			});
		},

	});

	return FormModulos;
});