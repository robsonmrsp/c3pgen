/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');

	var RelationshipModel = require('models/RelationshipModel');
	var RelationshipCollection = require('collections/RelationshipCollection');

	var AttributeModel = require('models/AttributeModel');
	var AttributeCollection = require('collections/AttributeCollection');

	var InspetorEntidadesViewTemplate = require('text!views/visual/tpl/InspetorRelacionamentosViewTemplate.html');

	var AttributesCollectionView = require('views/categoria/AttributesCollectionView');

	var RelationshipsCollectionView = require('views/categoria/RelationshipsCollectionView');

	var EntidadeItem = Marionette.LayoutView.extend({
		template : _.template(InspetorEntidadesViewTemplate),
		className : ' drag-item hpanel',

		regions : {
			attributesRegion : '.attributes',
			relationshipsRegion : '.relationships',
		},

		events : {},

		ui : {

		},

		initialize : function() {
			var that = this;

			// // Configuração do draggable
			this.$el.draggable({
				handle : 'h5',
				containment : ".drag-entities",
				scroll : false,
				stop : function() {

				}
			});

			this.on('show', function() {

			});
		},
	});

	return EntidadeItem;
});
