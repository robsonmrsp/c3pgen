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

	var PageVisualTemplate = require('text!views/visual/tpl/PageVisualTemplate.html');
	var VisualEntity = require('views/visual/models/VisualEntity');

	var PageVisual = Marionette.LayoutView.extend({
		template : _.template(PageVisualTemplate),

		regions : {},

		events : {
			'click #clickAki' : 'addAttribute',
		},
		addAttribute : function() {
			this.address.addAttribute(new AttributeModel({
				name : 'nome',
				type : {
					className : 'String'
				}
			}));
		},

		ui : {},

		initialize : function() {
			var that = this;

			this.address = new VisualEntity({
				position : {
					x : 30,
					y : 90
				},
				size : {
					width : 160,
					height : 100
				},
				name : 'Pessoa',
			// attributes : [ 'houseNumber: Integer', 'streetName: String',
			// 'town: String', 'postcode: String' ],
			});
			this.address.addAttribute(new AttributeModel({
				name : 'nome',
				type : {
					className : 'String'
				}
			}));
			// this.address.addAttribute('aaa');
			// this.address.addAttribute('aaa');
			// this.address.addAttribute('aaa');
			// this.address.addAttribute('aaa');
			//
			this.on('show', function() {
				this.graph = new Joint.dia.Graph();
				this.paper = new Joint.dia.Paper({
					el : $('#paper'),
					width : 800,
					height : 600,
					gridSize : 1,
					model : that.graph
				});
				this.paper.on('cell:pointerclick', function(cellView, evt, x, y) {
					console.log(cellView, evt, x, y)
				});

				this.graph.addCell(this.address);
			});
		},
	});

	return PageVisual;
});
