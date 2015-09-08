define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Waves = require('waves');
	var BottomPanelViewTemplate = require('text!views/bottomPanel/tpl/BottomPanelViewTemplate.html');

	var BottomPanelView = Marionette.ItemView.extend({
		template : _.template(BottomPanelViewTemplate),

		initialize : function() {

			this.on('show', function() {

			})
		}
	});

	return BottomPanelView;
});
