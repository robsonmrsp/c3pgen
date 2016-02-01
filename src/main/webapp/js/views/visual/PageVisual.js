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

	var PageVisualTemplate = require('text!views/visual/tpl/PageVisualTemplate.html');
	var VisualEntity = require('views/visual/models/VisualEntity');
	var VisualRelationship = require('views/visual/models/VisualRelationship');
	var InspetorEntidadesView = require('views/visual/InspetorEntidadesView');

	var lastPositionX = 200;
	var entities = [];
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
			console.log(entities);
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

			entities.push(visualEntity)

			visualEntity.setOnSelect(function(entity) {

			});
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
				// Here is the real deal. Listen on cell:pointerup and link to
				// an element found below.
				this.paper.on('cell:pointerup', function(cellView, evt, x, y) {

					// Find the first element below that is not a link nor the
					// dragged element itself.
					var elementBelow = that.graph.get('cells').find(function(cell) {
						if (cell instanceof Joint.dia.Link)
							return false; // Not interested in links.
						if (cell.id === cellView.model.id)
							return false; // The same element as the dropped
						// one.
						if (cell.getBBox().containsPoint({
							x : x,
							y : y
						})) {
							return true;
						}
						return false;
					});

					// If the two elements are connected already, don't
					// connect them again (this is application specific though).
					if (elementBelow && !_.contains(that.graph.getNeighbors(elementBelow), cellView.model)) {

						console.log('cellView ', cellView); // elemento que está
						// sendo arrastado,
						// no nosso caso as
						// setas do
						// relacionamento
						console.log('elementBelow ', elementBelow);

					}
				});
				this.paper.on('cell:pointerclick', function(_cellView, evt, x, y) {
					if (_cellView.model.get('type') == 'uml.Class') {

						that.inspetorView.setVisualEntity(_cellView.model);

					}
				});
			});
		},
	});

	return PageVisual;
});
