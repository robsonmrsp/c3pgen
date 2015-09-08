/* generated: 22/09/2014 11:14:50 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var GeneralCell = Backgrid.Cell.extend({
		editPath : '',
		deletePath : '',
		buttons : [],
		className : "td-actions",
		editor : Backgrid.CellEditor,

		events : {

		},
		onEdit : function(e) {
			this.editModel(this.model)
		},
		onDelete : function(e) {
			this.deleteModel(this.model)
		},

		/**
		 * Tipos de botão : default primary success info warning danger
		 */
		render : function() {
			var that = this;
			this.$el.empty();

			_.each(this.buttons, function(button) {
				var vetor = [];
				button.type = button.type || 'default';
				vetor.push("<a id='" + button.id + "' href='javascript:void(-1)' class='btn btn-xs button_cell btn-" + button.type + "'  data-toggle='tooltip' data-placement='top' title='' data-original-title='" + button.hint + "' >");
				vetor.push("	<i class='fa " + button.icon + " fa-lg'></i>");
				vetor.push("</a>");

				that.$el.append(vetor.join(' '));

				that.events["click #" + button.id] = function() {
					button.onClick.call(that.context, that.model);
				};
			})
			this.delegateEvents();
			this.$el.ready(function() {
				that.$el.find('a').tooltip();
			})
			return this;
		}
	});
	return GeneralCell;
});
