define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Utils = require('utilities/utils');

	var RadioButtonCell = Backgrid.Cell.extend({
		editPath : '',
		deletePath : '',
		className : "td-radio-button",
		editor : Backgrid.CellEditor,

		events : {
			'click .bt-edit' : 'onEdit',
			'click .bt-delete' : 'onDelete',
		},
		onEdit : function(e) {
			this.editModel(this.model)
		},
		onDelete : function(e) {
			this.deleteModel(this.model)
		},

		render : function() {
			var vetor = [];
			this.$el.empty();
			this.$el.append("<input type=\"radio\" name=\"check\">");
			this.delegateEvents();
			return this;
		}
	});
	return RadioButtonCell;
});