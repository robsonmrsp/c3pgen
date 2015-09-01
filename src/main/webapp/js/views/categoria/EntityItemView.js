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
		className : 'col-xs-12 col-sm-3 ',

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
			editable : '.editable-click',
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
			this.attributesCollection.add(new AttributeModel());
		},

		addRelationship : function() {
			this.relationshipsCollection.add(new RelationshipModel());
		},

		initialize : function() {
			var that = this;
			// configuração dos Atributos.
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
				this.ui.editable.editable({
					emptytext : '[[ -- ]]'
				});

				this.ui.editable.on('hidden', function() {
					that.changeEntity();
				})

				this.ui.addRelation.tooltip();
				this.ui.addAttribute.tooltip();
				this.ui.remEntity.tooltip();
				this.ui.showHideEntity.tooltip();

				this.attributesRegion.show(this.attributesCollectionView);
				this.relationshipsRegion.show(this.relationshipsCollectionView);
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
