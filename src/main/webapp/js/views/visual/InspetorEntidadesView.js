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

	var InspetorEntidadesViewTemplate = require('text!views/visual/tpl/InspetorEntidadesViewTemplate.html');

	var AttributesCollectionView = require('views/categoria/AttributesCollectionView');

	var RelationshipsCollectionView = require('views/categoria/RelationshipsCollectionView');

	var EntidadeItem = Marionette.LayoutView.extend({
		template : _.template(InspetorEntidadesViewTemplate),
		className : ' drag-item',

		regions : {
			attributesRegion : '.attributes',
			relationshipsRegion : '.relationships',
		},

		events : {
			'click .add-attribute' : 'addAttribute',
			'click .add-relation' : 'addRelationship',
			'click .rem-entity' : 'deleteEntidade',
			'click .show-hide-ent' : 'hideShowEnt',
			'click checkbox' : 'changeEntity'
		},

		ui : {
			inputId : '#inputId',
			inputEntityName : '.inputEntityName',
			inputDisplayName : '.inputDisplayName',
			inputTableName : '.inputTableName',
			inputHasMobile : '.inputHasMobile',

			widgetEntMain : '.widget-entidade',
			showhide : '.show-hide-ent',
			editableFields : '.editable-click',
			addRelation : '.add-relation',
			addAttribute : '.add-attribute',
			remEntity : '.rem-entity',
			showHideEntity : '.show-hide-ent',
			panelBody : '.entity-content',
		},

		deleteEntidade : function() {
			this.model.destroy();
			this.$el.remove();
		},

		addAttribute : function() {
			this.ui.panelBody.show();
			var newAtribute = new AttributeModel();
			this.attributesCollection.add(newAtribute);
		},

		addRelationship : function() {
			this.ui.panelBody.show();
			var newRelationship = new RelationshipModel();
			newRelationship.set('entity', this.entity.toJSON());
			this.relationshipsCollection.add(newRelationship);
		},

		initialize : function() {
			var that = this;

			// // Configuração do draggable
			this.$el.draggable({
				handle : 'h5',
				containment : ".drag-entities",
				scroll : false,
				stop : function() {
					// var offset = $(this).offset();
				}
			});

			this.attributesCollection = new AttributeCollection(this.model.get('attributes'));
			this.attributesCollection.on('change', this.updateViewEntity, this);
			this.attributesCollection.on('destroy', this.updateViewEntity, this);

			this.attributesCollectionView = new AttributesCollectionView({
				collection : this.attributesCollection,
			});

			// this.model.set('attributes', this.model.get('attributes'));

			// configuração dos relacionamentos
			this.relationshipsCollection = new RelationshipCollection(this.model.get('relationships'));
			this.relationshipsCollection.on('change', this.updateViewEntityWithRelationships, this);

			this.relationshipsCollectionView = new RelationshipsCollectionView({
				collection : this.relationshipsCollection,
			});

			this.on('show', function() {

				var that = this;
				this.ui.inputEntityName.editable();
				this.ui.inputDisplayName.editable();
				this.ui.inputTableName.editable();

				this.ui.inputEntityName.on('hidden', function() {
					util.refreshEditable(that.ui.inputDisplayName, util.toFrase(that.ui.inputEntityName.text()));
					util.refreshEditable(that.ui.inputTableName, util.toUnderscore(that.ui.inputEntityName.text(), true));
				});

				this.ui.editableFields.on('shown', function(evt, editable) {
					var value = $(evt.target).text();
					if (value != editable.options.emptytext) {
						editable.input.$input.val($(evt.target).text() || $(evt.target).val());
					}
				});

				this.ui.editableFields.on('hidden', function() {
					that.updateViewEntity();
				})

				this.ui.addRelation.tooltip();
				this.ui.addAttribute.tooltip();
				this.ui.remEntity.tooltip();
				this.ui.showHideEntity.tooltip();

				this.attributesRegion.show(this.attributesCollectionView);
				this.relationshipsRegion.show(this.relationshipsCollectionView);

				// abrindo com os atributos escondidos.
				// this.hideShowEnt();
			});
		},

		updateViewEntityWithRelationships : function(/* relationship */model, collection) {
			this.entity.set(this.getModel())
			this.entity.set('relationships', this.relationshipsCollection.toJSON());

			this.visualEntity.updateHtmlEntity(this.entity);

			// nesse momento criar o novo relacionamento se necessário

			var source = util.getVEntityByName(model.get('entity').name);
			var targuet = util.getVEntityByName(model.get('model'));

			util.VENT.trigger('entity.add.rel', source, targuet, model);
		},

		updateViewEntity : function(model, collection) {

			this.entity.set(this.getModel())
			this.entity.set('attributes', this.attributesCollection.toJSON());
			this.visualEntity.updateHtmlEntity(this.entity);
		},

		changeEntity : function() {

			this.model.set(this.getModel());

			this.visualEntity.update(this.model);
		},

		deleteAtribute : function() {
			this.model.destroy();
		},

		setVisualEntity : function(visualEntity) {


			this.entity = visualEntity.entity;
			this.visualEntity = visualEntity;

			this.attributesCollection.reset(this.entity.get('attributes'));

			this.relationshipsCollection.reset(this.entity.get('relationships'));

			this.ui.inputId.val(this.entity.get('id'));
			this.ui.inputEntityName.text(this.entity.get('name'));
			this.ui.inputDisplayName.text(this.entity.get('displayName'));
			this.ui.inputTableName.text(this.entity.get('tableName'));
			this.ui.inputHasMobile.prop('checked', this.entity.get('hasMobile'));

			util.refreshEditableVisual(this.ui.inputEntityName);
			util.refreshEditableVisual(this.ui.inputDisplayName);
			util.refreshEditableVisual(this.ui.inputTableName);
			util.refreshEditableVisual(this.ui.inputHasMobile);

			this.visualEntity.updateEntityPosition();
		},

		getModel : function() {
			return {
				id : this.ui.inputId.val() || null,
				name : this.ui.inputEntityName.text(),
				displayName : this.ui.inputDisplayName.text(),
				tableName : this.ui.inputTableName.text(),
				hasMobile : this.ui.inputHasMobile.is(':checked'),
			};
		},

		hideShowEnt : function() {
			this.ui.panelBody.toggle();
			if (this.ui.panelBody.is(':visible')) {
				this.ui.showhide.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up')
			} else {
				this.ui.showhide.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down')
			}
		},

	});

	return EntidadeItem;
});
