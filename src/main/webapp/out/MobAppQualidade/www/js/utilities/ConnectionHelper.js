define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var LocalStorage = require('localStorage');
	var Map = require('map');
	var BaseModel = require('models/BaseModel');
	var FilmeCollection = require('collections/FilmeCollection');

	var ConnectionHelper = {

	}
	window.ConnectionHelper = ConnectionHelper;
	
	return ConnectionHelper;
});
