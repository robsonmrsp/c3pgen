define([ 'adapters/jquery-adapter', 'adapters/underscore-adapter', 'adapters/backbone-adapter' ], function($, _, BB) {

	var BaseModel = BB.Model.extend({
		initialize : function() {

		},

		get : function(attr) {
			var value = BB.Model.prototype.get.call(this, attr);
			return _.isFunction(value) ? value.call(this) : value;
		},
		toJSON : function() {
			var data = {};
			var json = BB.Model.prototype.toJSON.call(this);
			_.each(json, function(value, key) {
				data[key] = this.get(key);
			}, this);
			return data;
		}
	});

	return BaseModel;
});
