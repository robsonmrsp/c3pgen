define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Utils = require('utilities/utils');

	var BooleanBadgeCell = Backgrid.Cell.extend({

		className : "text-center",

		render : function() {

			this.$el.empty();

			var model = this.model;
			var theColValue = model.get(this.column.get("name"));
			var theFormattedColValue = this.formatter.fromRaw(theColValue, model)

			if (theFormattedColValue == theColValue) {
				theFormattedColValue = this.formatText((theColValue || '').toString());
			}

			this.$el.append(theFormattedColValue);
			this.delegateEvents();
			return this;
		},

		formatText : function(_valor) {
			var classSpan = "label-default";
			if (_valor.toUpperCase() == "TRUE" || _valor.toUpperCase() == "1") {
				classSpan = "label-info";
				_valor = "SIM";
			} else {
				classSpan = "label-danger";
				_valor = "NÃO";
			}
			// return "<span class='label " + classSpan + " '>" + _valor +
			// "</span>";
			return "<div class='label label-table " + classSpan + "'>" + _valor + "</div>";
		}
	});
	return BooleanBadgeCell;
});
