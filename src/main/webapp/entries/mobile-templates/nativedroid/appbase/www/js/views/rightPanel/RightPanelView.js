define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Waves = require('waves');
	var RightPanelViewTemplate = require('text!views/rightPanel/tpl/RightPanelViewTemplate.html');

	var RightPanelView = Marionette.ItemView.extend({
		template : _.template(RightPanelViewTemplate),

		initialize : function() {
			this.on('show', function() {
				this.$el.enhanceWithin();
			})
		}
	});

	return RightPanelView;
});
