define(function(require) {

	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	var Global = require('models/Global');

	var RemoteBaseModel = BaseModel.extend({
		initialize : function() {
			this.global = new Global();
		},

		token : function() {
			var that = this;
			return function() {
				var base = that.global.get('tokenCredentials');
				return that.get('token') || base;
			}();
		},
	});
	return RemoteBaseModel;
});
