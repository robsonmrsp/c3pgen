define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Waves = require('waves');
	var LeftPanelViewTemplate = require('text!views/leftPanel/tpl/LeftPanelViewTemplate.html');

	var LeftPanelView = Marionette.ItemView.extend({
		template : _.template(LeftPanelViewTemplate),

		initialize : function() {
			this.on('show', function() {
				this.$el.enhanceWithin();
				Waves.attach('#itemMenuFilmes', [ 'waves-block' ]);
				Waves.attach('#itemMenuMinhaConta', [ 'waves-block' ]);
				Waves.attach('#itemMenuConfig', [ 'waves-block' ]);
				Waves.init();
			})
		}
	});

	return LeftPanelView;
});
