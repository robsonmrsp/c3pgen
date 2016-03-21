/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');
	var AttributeCollection = require('collections/AttributeCollection');

	var DiagramEntityViewTemplate = require('text!views/visual/componentes/tpl/DiagramEntityViewTemplate.html');
	var DiagramAttributesCollectionView = require('views/visual/componentes/DiagramAttributesCollectionView');

	var DiagramEntityView = Marionette.LayoutView.extend({
		template : _.template(DiagramEntityViewTemplate),

		regions : {
			attributesRegion : '.entity-attributes',
		},

		events : {},

		ui : {},

		initialize : function() {
			var that = this;

			this.attributesCollection = new AttributeCollection(this.model.get('attributes'));

			this.attributesCollectionView = new DiagramAttributesCollectionView({
				collection : this.attributesCollection,
			});

			this.on('show', function() {

				this.attributesRegion.show(this.attributesCollectionView);

			});
		},
	});

	return DiagramEntityView;
});
