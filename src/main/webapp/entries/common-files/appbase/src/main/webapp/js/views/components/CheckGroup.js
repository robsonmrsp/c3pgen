define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backgrid = require('adapters/backgrid-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Utils = require('utilities/utils');

	var Group = Backbone.View.extend({
		initialize : function(options) {
			this.container = options.container;
			this.checkboxes = this.container.find("input[type=checkbox]")
		},

		getValue : function() {
			var that = this;
			var checkValues = [];
			_.each(that.checkboxes, function(checkbox) {
				var $checkbox = $(checkbox);
				if ($checkbox.is(':checked')) {
					checkValues.push($checkbox.val());
				}
			})
			return checkValues;
		},

		setValue : function(models) {
			var that = this;
			that.clear();
			_.each(models, function(model) {
				_.each(that.checkboxes, function(checkbox) {
					var $checkbox = $(checkbox);
					if ($checkbox.val() == model) {
						$checkbox.prop('checked', true);
					}
				});
			});
		},
		clear : function() {
			_.each(this.checkboxes, function(checkbox) {
				var $checkbox = $(checkbox);
				$checkbox.prop('checked', false);
			})
		}

	});
	return Group;
});