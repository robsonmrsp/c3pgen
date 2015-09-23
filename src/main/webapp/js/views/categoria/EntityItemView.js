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

	var EntityItemViewTemplate = require('text!views/categoria/tpl/EntityItemViewTemplate.html');

	var AttributesCollectionView = require('views/categoria/AttributesCollectionView');
	var RelationshipsCollectionView = require('views/categoria/RelationshipsCollectionView');

	var EntidadeItem = Marionette.LayoutView.extend({
		template : _.template(EntityItemViewTemplate),
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
			this.attributesCollection.add(new AttributeModel());
		},

		addRelationship : function() {
			this.ui.panelBody.show();
			this.relationshipsCollection.add(new RelationshipModel());
		},

		initialize : function() {
			var that = this;

			// Configuração do draggable
			this.$el.draggable({
				handle : '.panel-heading',
				containment : ".drag-entities",
				scroll : false,
				stop : function() {
					var offset = $(this).offset();
					var xPos = offset.left;
					var yPos = offset.top;
					that.model.set('posX', xPos);
					that.model.set('posY', yPos);
					console.log(xPos, yPos);
				}
			});

			this.attributesCollection = new AttributeCollection(this.model.get('attributes'));
			this.model.set('attributes', this.attributesCollection);

			this.attributesCollectionView = new AttributesCollectionView({
				collection : this.attributesCollection,
			});

			// configuração dos relacionamentos
			this.relationshipsCollection = new RelationshipCollection(this.model.get('relationships'));
			this.model.set('relationships', this.relationshipsCollection);

			this.relationshipsCollectionView = new RelationshipsCollectionView({
				collection : this.relationshipsCollection,
			});

			this.on('show', function() {

				this.$el.offset({
					top : this.model.get('posY') || 100,
					left : this.model.get('posX') || 100
				})
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
					that.changeEntity();
				})

				this.ui.addRelation.tooltip();
				this.ui.addAttribute.tooltip();
				this.ui.remEntity.tooltip();
				this.ui.showHideEntity.tooltip();

				this.attributesRegion.show(this.attributesCollectionView);
				this.relationshipsRegion.show(this.relationshipsCollectionView);

				// abrindo com os atributos escondidos.
				this.hideShowEnt();
			});
		},

		changeEntity : function() {
			this.model.set(this.getModel());
		},

		deleteAtribute : function() {
			this.model.destroy();
		},

		getModel : function() {
			return {
				id : this.ui.inputId.val(),
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
