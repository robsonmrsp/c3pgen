/* generated: 18/03/2015 12:38:58 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var BaseCollection = Backbone.Collection.extend({

		filter : function(options) {
			var that = this;
			var oldUrl = this.url;
			var _success = options.success
			var _error = options.error

			options.success = function(model, data, options) {
				if (_success)
					_success(model, data, options);
			}
			options.error = function(model, data, options) {
				if (_error)
					_error(model, data, options);
			}
			options.complete = function(model, data, options) {
				that.url = oldUrl;
			}

			this.url = oldUrl.replace('all', 'filter');

			this.fetch(options);
		}
	});
	return BaseCollection;
});