/* generated: 30/08/2015 20:23:11 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var EntityCollection = require('collections/EntityCollection');
	var EntityModel = require('models/EntityModel');

	var ApplicationModel = Backbone.RelationalModel.extend({

		urlRoot : 'rs/crud/applications',

		relations : [ {
			type : Backbone.HasMany,
			key : 'entities',
			relatedModel : function() {
				return EntityModel;
			},
			collectionType : function() {
				return EntityCollection
			},
			reverseRelation : {
				key : 'application'
			}
		} ],

		defaults : {
			id : null,
			name : '',
			skin : null,
			description : '',
			rootPackage : '',
			entities : null,
		},
	});
	return ApplicationModel;
});
