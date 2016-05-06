/* generated: 30/08/2015 14:17:03 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var BaseModel = require('models/BaseModel');
	AttributeModel = require('models/AttributeModel');

	AttributeCollection = require('collections/AttributeCollection');

	RelationshipModel = require('models/RelationshipModel');
	RelationshipCollection = require('collections/RelationshipCollection');
	// End of "Import´s definition"

	// #####################################################################################################
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨ MAIN BODY
	// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
	// #####################################################################################################

	var EntityModel = Backbone.RelationalModel.extend({

		urlRoot : 'rs/crud/entitys',

		relations : [ {
			type : Backbone.HasMany,
			key : 'attributes',
			relatedModel : function() {
				return AttributeModel;
			},
			collectionType : function() {
				return AttributeCollection
			},
			reverseRelation : {
				key : 'entity'

			}
		}, {
			type : Backbone.HasMany,
			key : 'relationships',
			relatedModel : function() {
				return RelationshipModel;
			},
			collectionType : function() {
				return RelationshipCollection
			},
			reverseRelation : {
				key : 'entity'
			}
		}, ],

		defaults : {
			id : null,
			name : 'NO_NAME',
			displayName : '',
			tableName : '',
			hasOwner : '',
			hasMobile : '',
			notes : '',
			application : null,
			attributes : null,
			relationships : null,

		}
	});
	return EntityModel;
});
