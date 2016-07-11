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

	var ApplicationRelationshipModel = require('models/ApplicationRelationshipModel');

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

		events : {
			'click .btn-pronto' : 'saveRelation'
		},

		ui : {

		},

		saveRelation : function() {
			this.visualRelationship.refresh(this.sourceView.getModel(), this.targetView.getModel());
		},

		setVisual : function(visualRelationship) {

			this.visualRelationship = visualRelationship;

			this.applicationRelationshipModel = visualRelationship.get('applicationRelationshipModel');

			this.sourceRelationModel = visualRelationship.get('sourceRelationModel')

			this.targetRelationModel = visualRelationship.get('targetRelationModel')

			this.sourceView = new RelationshipItemView({
				model : this.sourceRelationModel
			});

			this.sourceRegion.show(this.sourceView);

			this.targetView = new RelationshipItemView({
				model : this.targetRelationModel
			});

			this.targetRegion.show(this.targetView);

			// var that = this;
			// this.visualEntity = visualEntity;
			//
			// this.entity = visualEntity.get('entity');
			//
			// this.ui.inputId.val(this.entity.get('id'));
			// this.ui.inputEntityName.text(this.entity.get('name'));
			// this.ui.inputDisplayName.text(this.entity.get('displayName'));
			// this.ui.inputTableName.text(this.entity.get('tableName'));
			// this.ui.inputHasMobile.prop('checked', this.entity.get('hasMobile'));
			//
			// util.refreshEditableVisual(this.ui.inputEntityName);
			// util.refreshEditableVisual(this.ui.inputDisplayName);
			// util.refreshEditableVisual(this.ui.inputTableName);
			// util.refreshEditableVisual(this.ui.inputHasMobile);
			// this.visualEntity.updateEntityPosition();

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
