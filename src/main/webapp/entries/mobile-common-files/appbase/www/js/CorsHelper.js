/**
 * Rsponsavel por permitir que um model ou collection possam fazer requests FORA DA ORIGEM
 */
define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('jquery');
	var Backbone = require('adapters/backbone-adapter');

	var BaseModel = require('models/BaseModel');

	var initCorsSuportWithCredentials = function() {
		// Overriding Backbone.js Sync to Allow Cross Origin Resource Sharing
		// (CORS)
		// withCredentials
		var btoa = window.btoa;
		var encode = function(credentials) {
			return btoa(unescape(encodeURIComponent([ credentials.username, credentials.password ].join(':'))));
		};

		// Add a public method so that anything else can also create the header
		Backbone.BasicAuth = {
			getHeader : function(token) {
				return {
					'Authorization' : 'Basic ' + token
				};
			}
		};

		// Store a copy of the original Backbone.sync
		var originalSync = Backbone.sync;

		Backbone.sync = function(method, model, options) {
			options = options || {};

			if (!options.crossDomain) {
				options.crossDomain = true;
			}
			if (!options.xhrFields) {
				options.xhrFields = {
					withCredentials : true
				};
			}
			// tokem padrão
			var token = encode({
				'username' : 'mr',	
				'password' : '123456'
			});

			if (model.token) {
				if (_.isFunction(model.token))
					token = model.token();
				else
					token = model.token;
			}

			var remoteUrl;
			var remoteUrlParts;

			if (token == null) {
				// Try URL-based.
				// Handle both string and function urls
				remoteURL = options.url || _.result(model, 'url');

				// Retrieve the auth credentials from the model url
				remoteUrlParts = remoteURL.match(/\/\/(.*):(.*)@/);
				if (remoteUrlParts && remoteUrlParts.length === 3) {
					credentials = {
						username : remoteUrlParts[1],
						password : remoteUrlParts[2]
					};
				}
			}

			// Add the token to the request headers if available
			if (token != null) {
				options.headers = options.headers || {};
				_.extend(options.headers, Backbone.BasicAuth.getHeader(token));
			}

			return originalSync.call(model, method, model, options);
		}
	}

	return {
		initCorsSuportWithCredentials : initCorsSuportWithCredentials,
	};
});
