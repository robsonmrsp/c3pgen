/* generated: 22/09/2014 11:14:50 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var Counter = Marionette.ItemView.extend({
		initialize : function(options) {
			var collection = this.collection;
			this.listenTo(collection, "add", this.render);
			this.listenTo(collection, "remove", this.render);
			this.listenTo(collection, "reset", this.render);

		},

		render : function() {
			this.$el.empty();
			var anchor = document.createElement("span");
			var state = this.collection.state;
			if (this.collection.size() == 0) {
				anchor.innerHTML = 'Nenhum registro.';
			} else if (this.collection && this.collection instanceof Backbone.PageableCollection) {
				// this.el.html("testando");
				var a = ((state.currentPage - 1) * state.pageSize) + 1;
				var b = state.currentPage * state.pageSize;
				var c = state.totalRecords;
				if (b > c)
					b = c;
				anchor.innerHTML = 'Mostrando ' + a + ' a ' + b + ' de ' + c + ' Registros';
			}
			// TODO fazer a internacionalização
			this.el.appendChild(anchor);
			this.delegateEvents();

			return this;
		},
	});

	return Counter;
})
