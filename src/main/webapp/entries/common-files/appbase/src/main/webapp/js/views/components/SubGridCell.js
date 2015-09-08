/* generated: 22/09/2014 11:14:50 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var GeneralCell = Backgrid.Cell.extend({

		className : "td-subgrid",
		editor : Backgrid.CellEditor,
		events : {

		},
		render : function() {
			var that = this;

			this.$el.empty();

			this.grid = new Backgrid.Grid({
				className : ' table back-subgrid',
				columns : this.columns,
				collection : that._getCollection(),
			});

			that.$el.append(this.grid.render().$el);
			this.delegateEvents();
			return this;
		},
		_getCollection : function() {
			var that = this;
			var nome = this.column.get('name');

			var colle = this.model && this.model.get(nome);
			if (colle) {
				var returnColl = new Backbone.Collection(colle)
				returnColl.each(function(subgridItem) {
					subgridItem.set('masterItem', that.model.toJSON());
				})
				return returnColl;
			} else
				return new Backbone.Collection();
		}
	});
	return GeneralCell;
});
