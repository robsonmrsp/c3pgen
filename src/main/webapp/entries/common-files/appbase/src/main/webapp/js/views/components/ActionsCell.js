define([ 'adapters/backgrid-adapter' ], function(Backgrid) {
	var ActionsCell = Backgrid.Cell.extend({
		editPath : '',
		deletePath : '',
		className : "td-actions",
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

			vetor.push("<a href='#" + this.editPath(this.model) + "' class='bt-edit btn btn-xs btn-primary' data-toggle='tooltip' data-placement='left' title='' data-original-title='Editar'>");
			vetor.push("	<i class='fa fa-pencil '></i>");
			vetor.push("</a> ");
			vetor.push("<a href='javascript:void(-1)' class='bt-delete btn btn-xs btn-danger' data-toggle='tooltip' data-placement='left' title='' data-original-title='Deletar'>");
			vetor.push("	<i class='fa fa-trash-o '></i>");
			vetor.push("</a>");

			this.$el.empty();
			this.$el.append(vetor.join(' '));
			this.delegateEvents();	
			$('.ui-tooltip').tooltip();
			return this;
		}
	});
	return ActionsCell;
});