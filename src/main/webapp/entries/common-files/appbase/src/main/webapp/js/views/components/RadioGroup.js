define([ 'utilities/utils', 'adapters/underscore-adapter', 'adapters/jquery-adapter', 'adapters/backbone-adapter', 'marionette' ],//
function(util, _, $, Backbone, Marionette) {
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