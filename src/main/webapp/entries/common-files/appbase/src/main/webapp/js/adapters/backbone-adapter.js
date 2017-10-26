define([ 'backbone', 'backbonePageable', 'utilities/utils', 'backboneSelectAll' ], function(Back, PageableCollection, util, SelectAll) {
	Back.PageableCollection = PageableCollection;

	defaultSync = Back.sync

	// Evitando multiplos posts
	Backbone.Model.prototype._save = Backbone.Model.prototype.save;
	Backbone.Model.prototype.save = function(attrs, options) {
		if (this.isNew() && this.request && this.request.readyState !== 4) {
			var that = this, args = arguments;

			if (_.isEmpty(attrs))
				attrs = this.toJSON();
			$.when(this.request).always(function() {
				Backbone.Model.prototype._save.apply(that, args);
			});
		} else {
			this.request = Backbone.Model.prototype._save.apply(this, arguments);
			return this.request;
		}
	};

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
