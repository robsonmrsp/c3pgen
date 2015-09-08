/* generated: 18/03/2015 12:38:58 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Utils = require('utilities/Utils');
	var Global = require('models/Global');
	var Backbone = require('adapters/backbone-adapter');
	// End of "Import´s definition"

	var BaseCollection = Backbone.Collection.extend({
		initialize : function() {
			this.global = new Global();
			this.global.fetch();
		},
		// Somente deve ser chamado apos o sync pois se trata de uma acçao
		// destrutiva
		resetAndstore : function(models) {
			var that = this;
			var oldAllModels = this.getToSync();

			_.each(oldAllModels, function(mod) {
				var id = mod.id
				var syncOperation = (mod.get && mod.get('syncOperation')) || mod.syncOperation;
				if (that._isInvalidId(id) || syncOperation == 'DELETE') {
					that.localStorage.remove(mod)
				}
			}, this);

			// adiciona o que veio do server
			this.store(models);
		},

		_isInvalidId : function(id) {
			if (_.isNumber(id)) {
				return false
			}
			return true;
		},

		getToSync : function() {
			var that = this;
			if (this.localStorage) {
				return this.localStorage.findAll(true)
			}
			return null;
		},

		store : function(models) {
			var that = this;
			if (this.localStorage) {
				_.each(models || that.models, function(mod) {
					that.localStorage.create(mod)
				})
			}
		},
	});
	return BaseCollection;
});