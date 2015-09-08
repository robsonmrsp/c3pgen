define([ 'adapters/backgrid-adapter' ], function(Backgrid) {
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