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
	var VisualEntity = require('views/visual/models/VisualEntity');
	var VisualRelationship = require('views/visual/models/VisualRelationship');
	var InspetorEntidadesView = require('views/visual/InspetorEntidadesView');
	var EntityCollection = require('collections/EntityCollection');

	var lastPositionX = 200;
	var visualEntities = [];
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

			_.each(visualEntities, function(visual) {

				var entityModel = new EntityModel(visual.entity.attributes);

				entityModel.set('attributes', visual.getAttributes())
				entityModel.set('relationships', visual.getRelationships())

				entidadesCollection.add(entityModel);
			});

			this.application.set('entities', entidadesCollection);

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
				entity : (_entity && _entity.get) || new EntityModel({
					name : 'NO_NAME_' + lastPositionX,
				}),
			});
			visualEntities.push(visualEntity)
			that.inspetorView.setVisualEntity(visualEntity)
			that.graph.addCell(visualEntity);
		},

		initialize : function() {
			var that = this;

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
			});
		},
	});

	return PageVisual;
});
