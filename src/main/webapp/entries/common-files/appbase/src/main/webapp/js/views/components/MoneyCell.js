define([ 'adapters/backgrid-adapter', 'utilities/utils' ], function(Backgrid, Utils) {

	var MoneyCell = Backgrid.Cell.extend({

		className : "custom-number-cel",

		render : function() {

			this.$el.empty();

			var model = this.model;
			var theColValue = model.get(this.column.get("name"));
			var theFormattedColValue = this.formatter.fromRaw(theColValue, model)

			if (theFormattedColValue == theColValue) {
				theFormattedColValue = this.toMoney(theColValue);
			}

			this.$el.text(theFormattedColValue);
			this.delegateEvents();
			return this;
		},

		toMoney : function(_valor) {
			return Utils.getCurrencySymbol() + " " + Utils.formatNumeric(_valor, 2);
		}
	});
	return MoneyCell;
});