/* generated: 30/08/2015 20:23:12 */
define(function(require) {
	// Start "Import´s Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Col = require('adapters/col-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var Marionette = require('marionette');
	var Backgrid = require('adapters/backgrid-adapter');
	var util = require('utilities/utils');
	var Joint = require('joint');
	var AttributeModel = require('models/AttributeModel');
	var EntityModel = require('models/EntityModel');
	var ApplicationModel = require('models/ApplicationModel');

	var PageVisualTemplate = require('text!views/visual/tpl/PageVisualTemplate.html');
	var VisualEntity = require('views/visual/models/HtmlEntity');
	var VisualRelationship = require('views/visual/models/VisualRelationship');
	var InspetorEntidadesView = require('views/visual/InspetorEntidadesView');
	var EntityCollection = require('collections/EntityCollection');
	var AttributeCollection = require('collections/AttributeCollection');

	var lastPositionX = 200;
	var visualEntities = new Col.Map();

	window.visualEntities = visualEntities;
	var PageVisual = Marionette.LayoutView.extend({
		template : _.template(PageVisualTemplate),

		regions : {
			inspectorRegion : '.inspector'
		},
		events : {
			'click #addEntity' : 'addEntity',
			'click #addRelation' : 'addRelation',
			'click #saveApp' : 'saveApplication',
		},
		ui : {},

		saveApplication : function() {
			this.application = this.model;
			var entidadesCollection = new EntityCollection();

			_.each(visualEntities.values(), function(visual) {

				var entityModel = new EntityModel(visual.entity.attributes);

				entityModel.set('attributes', visual.getAttributes())
				entityModel.set('relationships', visual.getRelationships())

				entidadesCollection.add(entityModel);
			});

			this.application.set('entities', entidadesCollection);

			this.application.save({}, {

				success : function(_model, _resp, _options) {
					console.log("Applicação salva com sucesso!");
				},
				error : function(_model, _resp, _options) {
					util.showMessage('error', 'Problema ao salvar registro: ' + util.getJson(_resp.responseText).legalMessage || '');
					util.logError(_resp);
				}
			})

			console.log(JSON.stringify(this.application));
		},

		_lastPosition : function() {

			if (lastPositionX < (window.innerWidth - 160)) {
				lastPositionX += 160;
			} else {
				lastPositionX = 200;
			}
			return lastPositionX
		},

		addRelation : function() {
			var that = this;
			var relation = new VisualRelationship();

			that.graph.addCell(relation);
			relation.on('change:source', function(_that, source, c) {
				if (source.id) {
					_that.setSourceEntity(visualEntities.get(source.id))
				}
			});
			relation.on('change:target', function(_that, target, c) {
				if (target.id) {
					_that.setTargetEntity(visualEntities.get(target.id))
				}
			});

		},

		/**
		 * Deve receber um EntityModel
		 */
		addEntity : function(_entity) {
			var that = this;
			var visualEntity = new VisualEntity({
				position : {
					x : (_entity && _entity.get && _entity.get('posX')) || this._lastPosition(),
					y : (_entity && _entity.get && _entity.get('posY')) || 200
				},

				size : {
					width : 120,
					height : 100
				},
				entity : that._getEntityModel(_entity),
			});
			// visualEntities.put(visualEntity.id, visualEntity)
			// that.inspetorView.setVisualEntity(visualEntity)
			that.graph.addCell(visualEntity);
		},
		_getEntityModel : function(_entity) {
			if (_entity && _entity.get) {

				_entity.set('attributes', new AttributeCollection(_entity.get('attributes')));

				return _entity;
			} else {
				return new EntityModel({
					name : 'NO_NAME_' + lastPositionX,
				})
			}
		},

		initialize : function() {
			var that = this;
			var entities = new EntityCollection(this.model.get('entities'));
			this.inspetorView = new InspetorEntidadesView({
				model : new EntityModel({
					name : '',
				}),
			});

			this.on('show', function() {
				this.inspectorRegion.show(this.inspetorView);
				this.graph = new Joint.dia.Graph();
				this.paper = new Joint.dia.Paper({
					el : $('#paper'),
					height : window.innerHeight,
					width : window.innerWidth,
					gridSize : 1,
					model : that.graph
				});
				this.paper.on('cell:pointerup', function(_cellView, evt, x, y) {
					if (_cellView.model.get('type') == 'uml.Class') {
						that.inspetorView.setVisualEntity(_cellView.model);
					}
				});
				// somente para garantir que tudo estará setando antes de
				// adicionar as entidades ao painter
				entities.each(function(ent) {
					that.addEntity(ent);
				});
			});
		},
	});

	return PageVisual;

});
