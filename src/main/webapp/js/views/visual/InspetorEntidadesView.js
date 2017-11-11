/* generated: 18/08/2015 15:38:44 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');

	var util = require('utilities/utils');

	var AttributeModel = require('models/AttributeModel');
	var ApplicationRelationshipModel = require('models/ApplicationRelationshipModel');
	var AttributeCollection = require('collections/AttributeCollection');
	var RelationshipCollection = require('collections/RelationshipCollection');

	var InspetorEntidadesViewTemplate = require('text!views/visual/tpl/InspetorEntidadesViewTemplate.html');

	var AttributesCollectionView = require('views/categoria/AttributesCollectionView');
	var RelationshipsCollectionView = require('views/categoria/RelationshipsCollectionView');

	var EntidadeItem = Marionette.LayoutView.extend({
		template : _.template(InspetorEntidadesViewTemplate),
		className : ' inspetor-entidades-view',

		regions : {
			attributesRegion : '.attributes',
			relationshipsRegion : '.relationships',
		},

		events : {
			'click .add-attribute' : 'addAttribute',
			'click .rem-entity' : 'deleteEntidade',
			'click .show-hide-ent' : 'hideShowEnt',
			'click .icon-expand-entity' : 'expandEntity',
			'click checkbox' : 'changeEntity'
		},

		ui : {
			inputId : '#inputId',
			inputEntityName : '.inputEntityName',
			iconExpandEntity : '.icon-expand-entity',
			inputDisplayName : '.inputDisplayName',
			inputTableName : '.inputTableName',
			inputPk : '.inputPk',
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

		initialize : function() {
			var that = this;

			// // Configuração do draggable
			// this.$el.draggable({
			// handle : 'h5',
			// containment : ".drag-entities",
			// scroll : false,
			// stop : function() {
			// // var offset = $(this).offset();
			// }
			// });

			this.attributesCollection = new AttributeCollection(this.model.get('attributes'));

			this.attributesCollection.on('change', this.updateViewEntity, this);
			this.attributesCollection.on('destroy', this.updateViewEntity, this);

			this.attributesCollectionView = new AttributesCollectionView({
				collection : this.attributesCollection,
			});

			this.relationshipsCollection = new RelationshipCollection(this.model.get('relationships'));
			this.relationshipsCollection.on('change', this.updateViewEntity, this);
			this.relationshipsCollection.on('destroy', this.updateViewEntity, this);

			this.relationshipsCollectionView = new RelationshipsCollectionView({
				collection : this.relationshipsCollection,
			});

			this.on('show', function() {

				var that = this;
				this.ui.inputEntityName.editable();
				this.ui.inputDisplayName.editable();
				this.ui.inputTableName.editable();
				this.ui.inputPk.editable();

				this.ui.inputEntityName.on('hidden', function() {
					if (!that.entity || !that.entity.get('id')) {
						util.refreshEditable(that.ui.inputDisplayName, util.toFrase(that.ui.inputEntityName.text()));
						util.refreshEditable(that.ui.inputTableName, util.toUnderscore(that.ui.inputEntityName.text(), true));
						util.refreshEditable(that.ui.inputPk, 'ID_' + util.toUnderscore(that.ui.inputEntityName.text(), true));
					}
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

		updateViewEntity : function(model, collection) {

			// var relationships = this.entity.get('relationships');
			// mudou o nome
			if (model) {
				if (model.previousAttributes().name) {
					var oldName = model.previousAttributes().name;// "minhaLista"
					var newName = model.get('name');// minhaListaFilme
					// Entidade destino;
					var targetEntity = util.getBackViewByNameEntity(model.get('model')) && util.getBackViewByNameEntity(model.get('model')).model;

					if (targetEntity) {
						var relationships = targetEntity.get('relationships');
						_.each(relationships, function(relation) {
							if (relation.targetName == oldName) {
								var type = model.get('type');
								relation.targetName = newName;
								relation.ownerName = newName;
								if (type === 'none') {
									relation.ownerName = null;
								}
							}
						})
						targetEntity.set('relationships', relationships);
						targetEntity.set('notes', new Date());
					}

				}
				model.set('ownerName', '');
			}

			// var view = util.getBackViewByNameEntity
			this.entity.set(this.getModel())
			this.entity.set('attributes', this.attributesCollection.toJSON());
			this.entity.set('relationships', this.relationshipsCollection.toJSON());
			// this.visualEntity.updateHtmlEntity(this.entity);
		},

		deleteAtribute : function() {
			this.model.destroy();
		},

		setVisualEntity : function(visualEntity) {
			var that = this;

			this.visualEntity && this.visualEntity.$el.removeClass('selected');

			this.visualEntity = visualEntity;

			this.visualEntity.$el.addClass('selected');

			this.entity = visualEntity.model;

			this.visualEntity.getGraphEntity().on('change:position', function(_cellView, position, c, d) {
				// var _entity = _cellView.get('entity');
				that.entity.set('posX', position.x);
				that.entity.set('posY', position.y);
			})

			this.attributesCollection.reset(this.entity.get('attributes'));
			this.relationshipsCollection.reset(this.entity.get('relationships'));

			this.ui.inputId.val(this.entity.get('id'));
			this.ui.inputEntityName.text(this.entity.get('name'));
			this.ui.inputDisplayName.text(this.entity.get('displayName'));
			this.ui.inputTableName.text(this.entity.get('tableName'));
			this.ui.inputPk.text(this.entity.get('pk'));
			this.ui.inputHasMobile.prop('checked', this.entity.get('hasMobile'));

			util.refreshEditableVisual(this.ui.inputEntityName);
			util.refreshEditableVisual(this.ui.inputDisplayName);
			util.refreshEditableVisual(this.ui.inputTableName);
			util.refreshEditableVisual(this.ui.inputPk);
			util.refreshEditableVisual(this.ui.inputHasMobile);

			// this.visualEntity.updateEntityPosition();
		},

		getModel : function() {
			return {
				id : this.ui.inputId.val() || null,
				name : this.ui.inputEntityName.text(),
				displayName : this.ui.inputDisplayName.text(),
				tableName : this.ui.inputTableName.text(),
				pk : this.ui.inputPk.text(),
				hasMobile : this.ui.inputHasMobile.is(':checked'),
			};
		},

		hideShowEnt : function() {
			var that = this;
			this.ui.panelBody.slideToggle("fast", function() {
				if (that.ui.panelBody.is(':visible')) {
					that.ui.iconExpandEntity.removeClass('fa-chevron-down').addClass('fa-chevron-up')
				} else {
					that.ui.iconExpandEntity.removeClass('fa-chevron-up').addClass('fa-chevron-down')
				}
			});
		},

	});

	return EntidadeItem;
});
