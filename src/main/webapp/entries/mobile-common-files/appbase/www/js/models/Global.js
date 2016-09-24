define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('backbone');
	var LocalStorage = require('localStorage');
	var Utils = require('utilities/Utils');

	var Global = Backbone.Model.extend({
		localStorage : new LocalStorage("TABLE_GLOBAL"),
		defaults : {
			// comente deve haver um id, para que o não seja gerado mais de um
			// Registro global da aplicação.
			id : 1,
			tokenCredentials : '',
			username : '',
			password : '',
			url : '',
		},
		setCredentials : function(opt) {
			this.set('tokenCredentials', Utils.encodeCredenciais(opt.username, opt.password));
			this.set('username', opt.username);
			this.set('password', opt.password);
			this.set('url', opt.url);
			this.save();
		}

	});

	return Global;
});
