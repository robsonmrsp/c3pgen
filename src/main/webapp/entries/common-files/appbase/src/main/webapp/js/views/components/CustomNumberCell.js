define([ 'adapters/backgrid-adapter', 'utilities/utils' ], function(Backgrid, Utils) {

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