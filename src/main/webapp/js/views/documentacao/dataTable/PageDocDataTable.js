define(function(require) {
	var util = require('utilities/utils');
	var _ = require('adapters/underscore-adapter');

	var Marionette = require('marionette');

	var PageDocDataTableTemplate = require('text!views/documentacao/dataTable/tpl/PageDocDataTableTemplate.html');

	var PageDocDataTable = Marionette.LayoutView.extend({

		template : _.template(PageDocDataTableTemplate),

		initialize : function() {
			var that = this;
			this.on('show', function() {
				Prism.highlightAll();
			})
		},
	});

	return PageDocDataTable;
});
