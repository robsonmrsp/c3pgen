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

	var PageVisualTemplate = require('text!views/visual/tpl/PageVisualTemplate.html');

	var PageVisual = Marionette.LayoutView.extend({
		template : _.template(PageVisualTemplate),

		regions : {},

		events : {},

		ui : {},

		initialize : function() {
			var that = this;

			this.bloodgroup = new Joint.shapes.uml.Class({
				position : {
					x : 20,
					y : 190
				},
				size : {
					width : 200,
					height : 120
				},
				name : 'BloodGroup',
				attributes : [ 'bloodGroup: String' ],
				methods : [ '+ isCompatible(bG: String): Boolean' ],
				attrs : {
					'.uml-class-name-rect' : {
						fill : '#ff8450',
						stroke : '#fff',
						'stroke-width' : 0.5,
					},
					'.uml-class-attrs-rect, .uml-class-methods-rect' : {
						fill : '#fe976a',
						stroke : '#fff',
						'stroke-width' : 0.5
					},
					'.uml-class-attrs-text' : {
						ref : '.uml-class-attrs-rect',
						'ref-y' : 0.5,
						'y-alignment' : 'middle'
					},
					'.uml-class-methods-text' : {
						ref : '.uml-class-methods-rect',
						'ref-y' : 0.5,
						'y-alignment' : 'middle'
					}
				}
			});

			this.on('show', function() {
				this.graph = new Joint.dia.Graph();
				this.paper = new Joint.dia.Paper({
					el : $('#paper'),
					width : 800,
					height : 600,
					gridSize : 1,
					model : that.graph
				});
				this.graph.addCell(this.bloodgroup);
			});
		},
	});

	return PageVisual;
});
