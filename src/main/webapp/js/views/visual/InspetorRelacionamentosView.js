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

	var RelationshipModel = require('models/RelationshipModel');
	var AttributeCollection = require('collections/AttributeCollection');

	var InspetorEntidadesViewTemplate = require('text!views/visual/tpl/InspetorRelacionamentosViewTemplate.html');

	var RelationshipItemView = require('views/visual/componentes/RelationshipItemView');

	var EntidadeItem = Marionette.LayoutView.extend({
		template : _.template(InspetorEntidadesViewTemplate),
		className : ' drag-item hpanel',

		regions : {
			sourceRegion : '.source-container',
			targetRegion : '.target-container',
		},

		events : {},

		ui : {

		},

		initialize : function() {
			var that = this;
			this.$el.draggable({
				handle : 'h5',
				containment : ".drag-entities",
				scroll : false,
				stop : function() {

				}
			});
			this.sourceView = new RelationshipItemView({
				model : new RelationshipModel()
			});
			this.targetView = new RelationshipItemView({
				model : new RelationshipModel()
			});
			this.on('show', function() {
				this.sourceRegion.show(this.sourceView);
				this.targetRegion.show(this.targetView);

			});
		},
	});

	return EntidadeItem;
});
// categoria/RelationshipItemView.js
