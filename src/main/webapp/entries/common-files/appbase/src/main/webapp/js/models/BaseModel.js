define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');

	var BaseModel = Backbone.Model.extend({
		initialize : function() {

		},

		get : function(attr) {
			var value = Backbone.Model.prototype.get.call(this, attr);
			return _.isFunction(value) ? value.call(this) : value;
		},
		
		toJSON : function() {
			var data = {};
			var json = Backbone.Model.prototype.toJSON.call(this);
			_.each(json, function(value, key) {
				data[key] = this.get(key);
			}, this);
			return data;
		}
	});

	return BaseModel;
});
