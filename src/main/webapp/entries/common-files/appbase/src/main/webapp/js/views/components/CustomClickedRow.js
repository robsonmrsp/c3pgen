define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Utils = require('utilities/utils');

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
