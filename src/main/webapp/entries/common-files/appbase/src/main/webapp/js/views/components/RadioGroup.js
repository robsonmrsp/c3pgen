define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Utils = require('utilities/utils');

	var RadioGroup = Backbone.View.extend({
		initialize : function(options) {
			this.container = options.container;
			this.radioboxes = this.container.find("input[type=radio]")
		},

		getValue : function() {
			var that = this;
			var radioValue = null;
			_.each(that.radioboxes, function(radiobox) {
				var $radiobox = $(radiobox);
				if ($radiobox.is(':checked')) {
					radioValue = $radiobox.val();
				}
			})
			return radioValue;
		},

		setValue : function(val) {
			var that = this;
			that.clear();
			_.each(that.radioboxes, function(radiobox) {
				var $radiobox = $(radiobox);
				// TODO verificar uma forma mais elegante para fazer isso
				val = '' + val;
				if ($radiobox.val() == val) {
					$radiobox.prop('checked', true);
				}
			});
		},

		clear : function() {
			_.each(this.radioboxes, function(radiobox) {
				var $radiobox = $(radiobox);
				$radiobox.prop('checked', false);
			})
		}
	});
	return RadioGroup;
});