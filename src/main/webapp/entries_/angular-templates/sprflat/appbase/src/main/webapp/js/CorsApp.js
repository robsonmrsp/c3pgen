define([ 'adapters/jquery-adapter' ], function($) {

	var initCorsSuportWithCredentials = function(_, Backbone) {
		// Overriding Backbone.js Sync to Allow Cross Origin Resource Sharing
		// (CORS)
		// withCredentials
		var btoa = window.btoa;
		var encode = function(credentials) {
			return btoa(unescape(encodeURIComponent([ credentials.username, credentials.password ].join(':'))));
		};

		// Add a public method so that anything else can also create the header
		Backbone.BasicAuth = {
			getHeader : function(credentials) {
				return {
					'Authorization' : 'Basic ' + encode(credentials)
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

			// Basic Auth supports two modes: URL-based and function-based.
			var credentials;
			var remoteUrl;
			var remoteUrlParts;

			if (model.credentials) {
				// Try function-based.
				credentials = _.result(model, 'credentials');
			}

			if (credentials == null) {
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
			if (credentials != null) {
				options.headers = options.headers || {};
				_.extend(options.headers, Backbone.BasicAuth.getHeader(credentials));
			}

			return originalSync.call(model, method, model, options);
		}
	};

	return {
		initCorsSuportWithCredentials : initCorsSuportWithCredentials,
	};
});
