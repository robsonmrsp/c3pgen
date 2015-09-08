define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Waves = require('waves');
	var FloatButtonSaveTemplate = require('text!views/components/tpl/FloatButtonSaveTemplate.html');

	var FloatButton = Marionette.ItemView.extend({
		template : _.template(FloatButtonSaveTemplate),
		events : {
			'click .fixed-action-btn' : '_activateManuButton',
			'mouseleave' : '_hideButtons',
			'click .save-button' : '_onClickSave',
			'click .cancel-button' : '_onClickCancel',
		},
		ui : {
			fixedActionButton : '.fixed-action-btn',
			miniButtons : 'ul .btn-floating',

		},
		initialize : function(opt) {
			this.on('show', function() {
				Waves.attach('.float-button-add-new', [ 'waves-button', 'waves-float' ]);
				Waves.init();// floadButtonSave
				// this._activateManuButton();
			});
		},
		setOnClickSave : function(f) {
			this.onClickSave = f;
		},
		setOnClickCancel : function(f) {
			this.onClickCancel = f;
		},
		_onClickSave : function() {
			this.onClickSave.call(this.context);
		},
		_onClickCancel : function() {
			this.onClickCancel.call(this.context);
		},
		_hideButtons : function() {
			var time = 0;
			this.ui.miniButtons.velocity("stop", true);
			this.ui.miniButtons.velocity({
				opacity : "0",
				scaleX : ".4",
				scaleY : ".4",
				translateY : "40px"
			}, {
				duration : 80
			});
		},
		_activateManuButton : function() {
			var that = this;
			$.fn.reverse = [].reverse;
			this.ui.miniButtons.velocity({
				scaleY : ".4",
				scaleX : ".4",
				translateY : "40px"
			}, {
				duration : 0
			});

			var time = 0;
			_.each(this.ui.miniButtons.reverse(), function(btn) {
				$(btn).velocity({
					opacity : "1",
					scaleX : "1",
					scaleY : "1",
					translateY : "0"
				}, {
					duration : 80,
					delay : time
				});
				time += 40;
			})
		},

	})
	return FloatButton;
})