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
			'click #clickAki' : 'addAttribute',
		},
		ui : {},

		_lastPosition : function() {

			if (lastPositionX < (window.innerWidth - 160)) {
				lastPositionX += 160;
			} else {
				lastPositionX = 200;
			}
			return lastPositionX
		},

		addEntity : function() {
			entity = new VisualEntity({
				position : {
					x : this._lastPosition(),
					y : 200
				},

				size : {
					width : 120,
					height : 100
				},
				name : 'NO_NAME',
			});

			entities.push(entity)

			this.graph.addCell(entity);
		},

		initialize : function() {
			var that = this;
			var inspetorView = new InspetorEntidadesView({
				model : new EntityModel(),
			});

			this.on('show', function() {
				this.inspectorRegion.show(inspetorView);
				this.graph = new Joint.dia.Graph();
				this.paper = new Joint.dia.Paper({
					el : $('#paper'),
					height : window.innerHeight,
					width : window.innerWidth,
					gridSize : 1,
					model : that.graph
				});
				this.paper.on('cell:pointerclick', function(cellView, evt, x, y) {
					console.log(cellView, evt, x, y)
				});
			});
		},
	});

	return PageVisual;
});
