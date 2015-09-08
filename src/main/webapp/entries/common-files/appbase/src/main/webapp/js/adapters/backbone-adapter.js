define([ 'backbone', 'backbonePageable', 'backboneLocalstorage', 'backboneWebSocket', 'utilities/utils', 'backboneSelectAll' ], function(Back, PageableCollection, Store, WebSocket, util, SelectAll) {
	Back.PageableCollection = PageableCollection;

	defaultSync = Back.sync

	// TODO CENTRALIZAR os erros de server nesse function
	Back.sync = function(method, model, options) {
		var _success = options.success
		var _error = options.error

		// Ver tambem Router.js
		util.NProgress.start(true);
		options.success = function(model, data, options) {
			_success(model, data, options);
		}
		options.error = function(xhr, data, options) {
			_error(xhr, data, options);
			util.handleError(xhr, data, options);
			util.NProgress.done(false, true);
		}
		options.complete = function(model, data, options) {
			util.NProgress.done(false, true);
		}

		return defaultSync(method, model, options);

	}
	return Back;
});
