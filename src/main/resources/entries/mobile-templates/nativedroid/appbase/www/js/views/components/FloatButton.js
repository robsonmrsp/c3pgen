define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Waves = require('waves');
	var FloatButtonTemplate = require('text!views/components/tpl/FloatButtonTemplate.html');

	var FloatButton = Marionette.ItemView.extend({
		template : _.template(FloatButtonTemplate),
		events : {
			'click ' : '_onClick',
		},
		initialize : function(opt) {
			this.onClick = opt.onClick;
			this.on('show', function() {
				Waves.attach('.float-button-add-new', [ 'waves-button', 'waves-float' ]);
				Waves.init();
			})
		}, 
		_onClick : function() {
			this.onClick();
		},
	})
	return FloatButton;
})