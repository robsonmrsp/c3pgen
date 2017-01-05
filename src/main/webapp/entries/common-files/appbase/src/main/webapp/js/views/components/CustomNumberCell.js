define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Utils = require('utilities/utils');

	var MoneyCell = Backgrid.Cell.extend({

		className : "custom-number-cel",

		render : function() {

			this.$el.empty();

			var model = this.model;
			var theColValue = model.get(this.column.get("name"));

			var theFormattedColValue = '';
			// No futuro haverá uma configuração global para o locale da
			// aplicação
			if (theColValue)
				theFormattedColValue = this.formatter.fromRaw(Utils.formatNumeric(theColValue, 2), model)

			this.$el.text(theFormattedColValue);
			this.delegateEvents();

			return this;
		},
	});
	return MoneyCell;
});