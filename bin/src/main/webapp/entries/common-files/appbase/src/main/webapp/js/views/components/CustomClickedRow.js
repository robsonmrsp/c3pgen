define([ 'adapters/backgrid-adapter' ], function(Backgrid) {

	var ModelRow = Backgrid.Row.extend({
		className : 'custom-row-click',
		render : function() {
			ModelRow.__super__.render.apply(this, arguments);
			this.$el.data('model', this.model);
			return this;
		}
	});
	
	return ModelRow;
});
