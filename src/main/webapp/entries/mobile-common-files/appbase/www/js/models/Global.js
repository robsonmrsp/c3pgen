define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('backbone');
	var LocalStorage = require('localStorage');
	var Utils = require('utilities/Utils');
	var btoa = window.btoa;

	var encode = function(credentials) {
		return btoa(unescape(encodeURIComponent([ credentials.username, credentials.password ].join(':'))));
	};

	var Global = Backbone.Model.extend({
		localStorage : new LocalStorage("TABLE_GLOBAL"),

		token : function() {
			var that = this;
			return encode({
				'username' : that.get('username'),
				'password' : that.get('password')
			});
		},

		defaults : {
			id : 1,
			tokenCredentials : '',
			username : '',
			password : '',
			url : '',
		},
		
		setCredentials : function(opt) {

			var token = encode({
				'username' : opt.username,
				'password' : opt.password
			});

			this.set('tokenCredentials', token);
			this.set('username', opt.username);
			this.set('url', opt.url);

			this.save();
		},
		
		getTokenCredentials : function() {
			this.fetch();
			return this.get('tokenCredentials');
		},
		getRemoteUrl : function() {
			this.fetch();
			return this.get('url');
		},		
	});

	return Global;
});
