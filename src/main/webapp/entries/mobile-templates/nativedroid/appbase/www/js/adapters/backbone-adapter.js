define([ 'backbone' ], function(Back) {

	defaultSync = Back.sync

	// TODO CENTRALIZAR os erros de server nesse function
	Back.sync = function(method, model, options) {
		var _success = options.success
		var _error = options.error

		// Ver tambem Router.js

		options.success = function(model, data, options) {
			_success(model, data, options);
		}
		options.error = function(xhr, data, options) {
			_error(xhr, data, options);
		}
		options.complete = function(model, data, options) {

		}

		return defaultSync(method, model, options);

	}
	return Back;
});
